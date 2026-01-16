import React, { useState, useMemo } from 'react'
import { supabase } from '../lib/supabaseClient'
import QuestionSection from './QuestionSection'
import ResultsSummary from './ResultsSummary'
import ContactForm from './ContactForm'
import SecurityMeasures from './SecurityMeasures'

/**
 * Huvudformulär med adaptivt/dynamiskt frågeformulär
 * Visar endast relevanta frågor baserat på användarens svar
 */
export default function QuestionnaireForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [assessment, setAssessment] = useState(null)
  const [surveyResponseId, setSurveyResponseId] = useState(null)
  const [showContactForm, setShowContactForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Hjälpfunktioner för att kontrollera verksamhetstyp
  const isPublicOrganization = (answers) => {
    return answers.q1 === 'ja' || answers.q2 === 'ja';
  };

  const isPrivateOrganization = (answers) => {
    return answers.q1 !== 'ja' && answers.q2 !== 'ja';
  };

  const hasSwedishSite = (answers) => {
    return answers.q3 === 'ja';
  };

  const isSmallCompany = (answers) => {
    const notNIS2 = !answers.q4 || answers.q4.length === 0;
    const notLarge = answers.q5 !== 'ja';
    return notNIS2 && notLarge;
  };

  // Definiera alla frågor med adaptiv logik (showIf conditions)
  const questions = [
    // DEL 1: Offentlig verksamhet
    {
      id: 'q1',
      section: 1,
      sectionTitle: "Del 1: Statlig, regional eller kommunal verksamhet",
      question: "Är din verksamhet en statlig myndighet som fattar viktiga beslut som påverkar människor eller företag över Sveriges gränser (t.ex. om man får resa, flytta varor eller pengar)?",
      helpText: "Statliga myndigheter med internationella beslut omfattas direkt av lagen.",
      showIf: () => true, // Visas alltid
      type: 'radio'
    },
    {
      id: 'q2',
      section: 1,
      sectionTitle: "Del 1: Statlig, regional eller kommunal verksamhet",
      question: "Är din verksamhet en region, en kommun eller ett kommunalförbund?",
      helpText: "Regionala och kommunala verksamheter omfattas direkt av lagen.",
      showIf: (answers) => !isPublicOrganization(answers) || answers.q1 !== 'ja',
      type: 'radio'
    },
    
    // DEL 2: Privat verksamhet - SVENSKT SÄTE FLYTTAT HIT (tidigare q6)
    {
      id: 'q3',
      section: 2,
      sectionTitle: "Del 2: Privat verksamhet",
      question: "Har din verksamhet sitt huvudsakliga säte eller etablering i Sverige?",
      helpText: "Privata verksamheter måste ha sitt huvudsakliga säte eller etablering i Sverige för att omfattas av lagen (1 kap. 4 § 2, 1 kap. 5 §, 1 kap. 7 §).",
      showIf: (answers) => isPrivateOrganization(answers),
      type: 'radio',
      earlyExit: {
        condition: (answer) => answer === 'nej',
        result: {
          result: 'omfattas_ej',
          message: 'Din verksamhet omfattas inte av Cybersäkerhetslagen.',
          details: 'Privata verksamheter måste ha sitt huvudsakliga säte eller etablering i Sverige för att omfattas av lagen (1 kap. 4 § 2, 1 kap. 5 §, 1 kap. 7 §).'
        }
      }
    },
    {
      id: 'q4',
      section: 2,
      sectionTitle: "Del 2: Privat verksamhet",
      question: "Omfattas er verksamhet av EU:s cybersäkerhetskrav (NIS 2-direktivet)?",
      helpText: "Välj den eller de branscher som stämmer för er verksamhet. Dessa branscher omfattas ofta av NIS 2-direktivet (EU 2022/2555) om ert företag är medelstort eller större.",
      showIf: (answers) => isPrivateOrganization(answers) && hasSwedishSite(answers),
      type: 'checkbox',
      options: [
        "Energi (el, gas, fjärrvärme/kyla, olja, vätgas)",
        "Transport (flyg, järnväg, sjöfart, vägtransporter)",
        "Bank och finans",
        "Hälso- och sjukvård",
        "Dricksvatten och avlopp",
        "Post och kurirtjänster",
        "Avfallshantering",
        "Tillverkning (medicinteknik, fordon, elektronik, maskiner, kemikalier, livsmedel)",
        "Digitala leverantörer (molntjänster, datacenter, sökmotorer)",
        "Forskning (universitet, forskningsorganisationer)"
      ]
    },
    {
      id: 'q5',
      section: 2,
      sectionTitle: "Del 2: Privat verksamhet",
      question: "Är din verksamhet ett medelstort eller större företag?",
      helpText: "Ett medelstort företag har färre än 250 anställda OCH antingen en årsomsättning på högst 50 miljoner euro ELLER en balansomslutning på högst 43 miljoner euro. Är ni större än så, eller motsvarar ni dessa gränser, svarar du \"Ja\".",
      showIf: (answers) => isPrivateOrganization(answers) && hasSwedishSite(answers),
      type: 'radio'
    },
    {
      id: 'q6',
      section: 2,
      sectionTitle: "Del 2: Privat verksamhet",
      question: "Är din verksamhet en privat utbildningsanordnare (t.ex. en privat högskola) som har tillstånd att utfärda examina?",
      helpText: "Privata utbildningsanordnare med rätt att utfärda examina omfattas av lagen.",
      showIf: (answers) => isPrivateOrganization(answers) && hasSwedishSite(answers) && isSmallCompany(answers),
      type: 'radio'
    },
    
    // DEL 3: Digitala tjänster
    {
      id: 'q7',
      section: 3,
      sectionTitle: "Del 3: Digitala tjänster och samhällsfunktion",
      question: "Tillhandahåller din verksamhet allmänna telenät (t.ex. bredbandsnät) eller tjänster för elektronisk kommunikation som är tillgängliga för allmänheten i Sverige (t.ex. telefonitjänster eller internetleverantörer)?",
      helpText: "Leverantörer av telenät och elektronisk kommunikation omfattas av lagen.",
      showIf: (answers) => isPrivateOrganization(answers) && hasSwedishSite(answers),
      type: 'radio'
    },
    {
      id: 'q8',
      section: 3,
      sectionTitle: "Del 3: Digitala tjänster och samhällsfunktion",
      question: "Erbjuder din verksamhet digitala tjänster? (Markera alla som stämmer)",
      helpText: "Digitala tjänster som molntjänster, datacenter och CDN omfattas av lagen.",
      showIf: (answers) => isPrivateOrganization(answers) && hasSwedishSite(answers),
      type: 'checkbox',
      options: [
        "Molntjänster (cloud services)",
        "Datacentraltjänster (datacenter services)",
        "Nätverk för leverans av innehåll (content delivery networks)",
        "Utlokaliserade driftstjänster (managed services)",
        "Utlokaliserade säkerhetstjänster (managed security services)",
        "Marknadsplatser online (online marketplaces)",
        "Sökmotorer (search engines)",
        "Plattformar för sociala nätverkstjänster",
        "Registreringsenhet för toppdomäner (t.ex. för .se-domäner)",
        "DNS-tjänster (domännamnssystemtjänster)",
        "Domännamnsregistreringstjänster"
      ]
    },
    {
      id: 'q9',
      section: 3,
      sectionTitle: "Del 3: Digitala tjänster och samhällsfunktion",
      question: "Är din verksamhet den enda leverantören i Sverige av en tjänst som är avgörande för att viktiga samhällsfunktioner eller ekonomisk verksamhet ska fungera?",
      helpText: "Verksamheter som är enda leverantörer av kritiska tjänster omfattas även om de är små.",
      showIf: (answers) => isPrivateOrganization(answers) && hasSwedishSite(answers) && isSmallCompany(answers),
      type: 'radio'
    },
    {
      id: 'q10',
      section: 3,
      sectionTitle: "Del 3: Digitala tjänster och samhällsfunktion",
      question: "Skulle ett avbrott i er tjänst allvarligt kunna påverka människors liv och hälsa, samhällets säkerhet, folkhälsan eller orsaka stora problem i digitala system?",
      helpText: "Verksamheter vars avbrott skulle ha allvarliga konsekvenser omfattas av lagen.",
      showIf: (answers) => isPrivateOrganization(answers) && hasSwedishSite(answers) && isSmallCompany(answers),
      type: 'radio'
    },
    {
      id: 'q11',
      section: 3,
      sectionTitle: "Del 3: Digitala tjänster och samhällsfunktion",
      question: "Är er verksamhet extra viktig på nationell eller regional nivå för en viss bransch eller tjänst, eller för andra branscher som är beroende av er?",
      helpText: "Verksamheter med särskild betydelse för samhället omfattas av lagen.",
      showIf: (answers) => isPrivateOrganization(answers) && hasSwedishSite(answers) && isSmallCompany(answers),
      type: 'radio'
    },
    {
      id: 'q12',
      section: 3,
      sectionTitle: "Del 3: Digitala tjänster och samhällsfunktion",
      question: "Tillhandahåller din verksamhet \"betrodda tjänster\" (t.ex. e-legitimation eller elektronisk underskrift)?",
      helpText: "Leverantörer av betrodda tjänster omfattas alltid av lagen, även om de skulle vara undantagna på annat sätt.",
      showIf: (answers) => isPrivateOrganization(answers) && hasSwedishSite(answers),
      type: 'radio'
    },
    
    // DEL 4: Undantag - Visa för alla som kan omfattas
    {
      id: 'q13',
      section: 4,
      sectionTitle: "Del 4: Undantag",
      question: "Bedriver din verksamhet huvudsakligen säkerhetskänslig verksamhet (som regleras av säkerhetsskyddslagen) eller brottsbekämpande verksamhet?",
      helpText: "Vissa verksamheter kan vara undantagna från lagen på grund av säkerhetsskänslig eller brottsbekämpande verksamhet.",
      showIf: (answers) => {
        // Visa om användaren INTE har fått early exit
        if (answers.q1 === 'ja' || answers.q2 === 'ja') return true;
        if (answers.q3 === 'ja') return true;
        return false;
      },
      type: 'radio'
    },
    {
      id: 'q14',
      section: 4,
      sectionTitle: "Del 4: Undantag",
      question: "Är din verksamhet enbart en privat aktör som sysslar med säkerhetskänslig verksamhet, eller som enbart levererar tjänster till statliga myndigheter som huvudsakligen bedriver säkerhetskänslig eller brottsbekämpande verksamhet?",
      helpText: "Privata aktörer som enbart arbetar med säkerhetskänslig verksamhet kan vara undantagna.",
      showIf: (answers) => answers.q13 !== undefined,
      type: 'radio'
    },
    {
      id: 'q15',
      section: 4,
      sectionTitle: "Del 4: Undantag",
      question: "Tillhandahåller din verksamhet \"betrodda tjänster\" (t.ex. e-legitimation), även om den annars skulle vara undantagen på grund av säkerhetskänslig eller brottsbekämpande verksamhet?",
      helpText: "Leverantörer av betrodda tjänster omfattas alltid, även om de annars skulle vara undantagna.",
      showIf: (answers) => answers.q13 !== undefined,
      type: 'radio'
    },
    {
      id: 'q16',
      section: 4,
      sectionTitle: "Del 4: Undantag",
      question: "Är din verksamhet någon av följande: Regeringen, Regeringskansliet, en svensk ambassad/konsulat, en kommitté/utredning, en myndighet som lyder under riksdagen, en domstol eller en nämnd som dömer i juridiska frågor?",
      helpText: "Vissa statliga organ är undantagna från lagen.",
      showIf: (answers) => answers.q13 !== undefined,
      type: 'radio'
    },
    {
      id: 'q17',
      section: 4,
      sectionTitle: "Del 4: Undantag",
      question: "Är din verksamhet en församling (fullmäktige) eller styrelse (direktion) i ett kommunalförbund, eller en kommun- eller regionfullmäktige?",
      helpText: "Vissa politiska församlingar är undantagna från lagen.",
      showIf: (answers) => answers.q13 !== undefined,
      type: 'radio'
    }
  ]

  // Filtrera frågor baserat på svar (adaptiv logik)
  const visibleQuestions = useMemo(() => {
    return questions.filter(q => q.showIf(answers));
  }, [answers]);

  // Kontrollera early exit condition
  const checkEarlyExit = (questionId, answer) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.earlyExit && question.earlyExit.condition(answer)) {
      setAssessment(question.earlyExit.result);
      setShowResults(true);
      return true;
    }
    return false;
  };

  // Hantera svarsändring
  const handleAnswerChange = (key, value) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    
    // Kontrollera early exit condition
    if (checkEarlyExit(key, value)) {
      return; // Stoppa här
    }
    
    // Automatiskt gå till nästa synlig fråga
    const nextIndex = currentQuestionIndex + 1;
    const updatedVisibleQuestions = questions.filter(q => q.showIf(newAnswers));
    
    if (nextIndex < updatedVisibleQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      window.scrollTo(0, 0);
    } else {
      // Alla frågor besvarade
      handleSubmit(newAnswers);
    }
  }

  // Validera om nuvarande fråga är besvarad
  const isCurrentQuestionAnswered = () => {
    if (currentQuestionIndex >= visibleQuestions.length) return false;
    const currentQuestion = visibleQuestions[currentQuestionIndex];
    const answer = answers[currentQuestion.id];
    
    if (currentQuestion.type === 'checkbox') {
      return true; // Checkbox är alltid valfri
    }
    return answer !== undefined && answer !== '';
  };

  // Nästa fråga
  const handleNext = () => {
    if (currentQuestionIndex < visibleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      window.scrollTo(0, 0);
    } else {
      // Sista frågan, skicka in formulär
      handleSubmit(answers);
    }
  };

  // Föregående fråga
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  /**
   * Kontrollerar om en privat verksamhet omfattas av kriterierna i Del 2 & 3
   * @param {Object} answers - Svar från formuläret
   * @returns {boolean} - True om privat verksamhet omfattas
   */
  const isPrivateOrganizationCovered = (answers) => {
    return answers.q3 === 'ja' && (
      (answers.q4 && answers.q4.length > 0) || 
      answers.q5 === 'ja' || 
      answers.q6 === 'ja' || 
      answers.q7 === 'ja' || 
      (answers.q8 && answers.q8.length > 0) ||
      answers.q9 === 'ja' || 
      answers.q10 === 'ja' || 
      answers.q11 === 'ja' || 
      answers.q12 === 'ja'
    );
  };

  /**
   * Bedömer om en verksamhet omfattas av Cybersäkerhetslagen (2025:1506)
   * 
   * Viktiga principer:
   * - Del 1 (statliga/kommunala verksamheter): Omfattas direkt
   * - Del 2 & 3 (privata verksamheter): KRÄVER svenskt säte (q3 = ja) enligt 1 kap. 4 § 2
   * - Del 4 (undantag): Kan göra att verksamheten inte omfattas trots att den annars skulle
   * - Hanterar saknade svar (undefined) på grund av adaptiv logik
   * 
   * @param {Object} answers - Svar från formuläret
   * @returns {Object} Bedömningsresultat med result, message, details
   */
  const assessCoverage = (answers) => {
    // Del 1: Statlig, regional eller kommunal
    const coveredByPart1 = isPublicOrganization(answers);
    
    // Del 2 och 3: Privat verksamhet och digitala tjänster
    const coveredByPart2And3 = isPrivateOrganizationCovered(answers);
    
    // Del 4: Undantag (endast om frågor visades)
    const hasException = 
      answers.q13 !== undefined && (
        (answers.q13 === 'ja' || answers.q14 === 'ja' || 
         answers.q16 === 'ja' || answers.q17 === 'ja') &&
        answers.q15 !== 'ja'
      );
    
    // Osäkra svar
    const hasUncertainAnswers = Object.entries(answers).some(([key, value]) => {
      if (key === 'q8' || key === 'q4') {
        // För q8 och q4 (checkbox), kontrollera inte "vet ej" här
        return false;
      }
      return value === 'vet_ej';
    });
    
    // Sammanfattande bedömning
    if ((coveredByPart1 || coveredByPart2And3) && !hasException) {
      return {
        result: "omfattas",
        message: "Din verksamhet omfattas sannolikt av Cybersäkerhetslagen (2025:1506).",
        details: "Baserat på dina svar uppfyller verksamheten kriterierna för att omfattas av lagen."
      };
    } else if ((coveredByPart1 || coveredByPart2And3) && hasException) {
      return {
        result: "undantag",
        message: "Din verksamhet kan vara undantagen trots att den annars skulle omfattas.",
        details: "Verksamheten uppfyller kriterier för att omfattas, men kan vara undantagen på grund av särskilda omständigheter."
      };
    } else if (hasUncertainAnswers) {
      return {
        result: "osäker",
        message: "Bedömningen är osäker på grund av 'Vet ej'-svar.",
        details: "För en säkrare bedömning behöver du ta reda på svaren på de frågor du är osäker på."
      };
    } else {
      return {
        result: "omfattas_ej",
        message: "Din verksamhet omfattas sannolikt inte av Cybersäkerhetslagen.",
        details: "Baserat på dina svar uppfyller verksamheten inte kriterierna för att omfattas av lagen."
      };
    }
  };

  // Skicka in formulär
  const handleSubmit = async (submittedAnswers) => {
    setLoading(true);
    
    try {
      // Använd submittedAnswers om det finns, annars answers
      const finalAnswers = submittedAnswers || answers;
      
      // Beräkna bedömning
      const result = assessCoverage(finalAnswers);
      
      // Spara till Supabase
      const { data, error } = await supabase
        .from('survey_responses')
        .insert([{
          q1: finalAnswers.q1 || null,
          q2: finalAnswers.q2 || null,
          q3: finalAnswers.q3 || null,
          q4: finalAnswers.q4 ? JSON.stringify(finalAnswers.q4) : null,
          q5: finalAnswers.q5 || null,
          q6: finalAnswers.q6 || null,
          q7: finalAnswers.q7 || null,
          q8_services: finalAnswers.q8 || null,
          q9: finalAnswers.q9 || null,
          q10: finalAnswers.q10 || null,
          q11: finalAnswers.q11 || null,
          q12: finalAnswers.q12 || null,
          q13: finalAnswers.q13 || null,
          q14: finalAnswers.q14 || null,
          q15: finalAnswers.q15 || null,
          q16: finalAnswers.q16 || null,
          q17: finalAnswers.q17 || null,
          assessment_result: result.result,
          assessment_message: result.message,
          assessment_details: result.details,
          wants_contact: false
        }])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        setSurveyResponseId(data[0].id);
      }
      
      setAssessment(result);
      setShowResults(true);
    } catch (error) {
      console.error('Fel vid sparande:', error);
      alert('Ett fel uppstod vid sparande. Vänligen försök igen.');
    } finally {
      setLoading(false);
    }
  };

  // Om bedömning är klar och kontaktformulär ska visas
  if (assessment && showContactForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <ContactForm surveyResponseId={surveyResponseId} />
      </div>
    );
  }

  // Om bedömning är klar
  if (assessment && showResults) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Cybersäkerhetslagen (2025:1506)
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Bedömning slutförd
          </p>
        </div>
        <ResultsSummary 
          assessment={assessment} 
          onShowContactForm={() => setShowContactForm(true)} 
        />
        
        {assessment.result === 'omfattas' && (
          <div className="max-w-4xl mx-auto">
            <SecurityMeasures />
          </div>
        )}
      </div>
    );
  }

  // Visa formulär med adaptiv logik
  const currentQuestion = visibleQuestions[currentQuestionIndex];
  const progress = visibleQuestions.length > 0 
    ? ((currentQuestionIndex + 1) / visibleQuestions.length) * 100 
    : 0;
  
  // Gruppera frågor efter sektion för att visa section titles
  const currentSection = currentQuestion ? currentQuestion.section : 1;
  const previousQuestion = currentQuestionIndex > 0 ? visibleQuestions[currentQuestionIndex - 1] : null;
  const showSectionTitle = !previousQuestion || previousQuestion.section !== currentSection;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cybersäkerhetslagen (2025:1506)
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Adaptivt bedömningsformulär
          </p>
          <p className="text-sm text-gray-500">
            Formuläret anpassar sig efter dina svar – du får endast relevanta frågor
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-primary">
              Fråga {currentQuestionIndex + 1} av {visibleQuestions.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-primary h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Formulärkort */}
        {currentQuestion && (
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6">
            {/* Section title om ny sektion */}
            {showSectionTitle && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentQuestion.sectionTitle}
                </h2>
                {currentSection > 1 && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                    <p className="text-sm text-blue-700">
                      ℹ️ <strong>Anpassat formulär</strong>
                      <br />
                      Baserat på dina tidigare svar visas endast relevanta frågor för din verksamhetstyp.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Aktuell fråga */}
            <QuestionSection
              question={currentQuestion.question}
              questionKey={currentQuestion.id}
              value={answers[currentQuestion.id]}
              onChange={handleAnswerChange}
              helpText={currentQuestion.helpText}
              type={currentQuestion.type}
              options={currentQuestion.options}
            />
          </div>
        )}

        {/* Navigeringsknappar */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Föregående
          </button>

          <button
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered() || loading}
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Bearbetar...
              </span>
            ) : currentQuestionIndex === visibleQuestions.length - 1 ? (
              'Slutför →'
            ) : (
              'Nästa →'
            )}
          </button>
        </div>

        {/* Hjälptext om obligatoriska frågor */}
        {!isCurrentQuestionAnswered() && currentQuestion && currentQuestion.type !== 'checkbox' && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Vänligen besvara frågan för att fortsätta
          </p>
        )}
      </div>
    </div>
  );
}
