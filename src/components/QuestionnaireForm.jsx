import React, { useState, useMemo, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import QuestionSection from './QuestionSection'
import ResultsSummary from './ResultsSummary'
import ContactForm from './ContactForm'
import SecurityMeasures from './SecurityMeasures'
import { getUserType, getVisibleQuestionIds } from '../utils/questionFlows'

/**
 * Huvudformulär för bedömning av Cybersäkerhetslagen
 * Alla frågor visas i sekvens utan adaptiv filtrering
 * Bedömning görs i slutet baserat på alla insamlade svar
 */
export default function QuestionnaireForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [assessment, setAssessment] = useState(null)
  const [surveyResponseId, setSurveyResponseId] = useState(null)
  const [showContactForm, setShowContactForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [databaseError, setDatabaseError] = useState(false)
  const [databaseErrorDetails, setDatabaseErrorDetails] = useState(null)
  const [debugMode, setDebugMode] = useState(false)

  // Helper functions for adaptive logic
  const isPrivate = (answers) => answers.q0 === 'Privat';
  const isPublic = (answers) => answers.q0 === 'Offentlig';
  const isUncertain = (answers) => answers.q0 === 'Vet ej';
  const hasSwedishSite = (answers) => answers.q3 === 'Ja';
  const hasIndustries = (answers) => Array.isArray(answers.q4) && answers.q4.length > 0 && !answers.q4.includes('Ingen av ovanstående');
  
  // Definiera alla frågor med adaptiv logik
  const questions = [
    // DEL 1: Grundläggande verksamhetstyp
    {
      id: 'q0',
      section: 1,
      sectionTitle: "Del 1: Grundläggande verksamhetstyp",
      question: "Är din verksamhet huvudsakligen offentlig eller privat?",
      helpText: "Offentliga verksamheter inkluderar statliga myndigheter, regioner, kommuner och kommunalförbund. Privata verksamheter är företag, organisationer och andra aktörer som inte är offentliga.",
      type: 'radio',
      options: ['Offentlig', 'Privat', 'Vet ej'],
      showIf: () => true
    },
    
    // DEL 2: Offentlig verksamhet - ENDAST för offentliga eller osäkra
    {
      id: 'q1',
      section: 2,
      sectionTitle: "Del 2: Offentlig verksamhet",
      question: "Är din verksamhet en statlig myndighet som fattar viktiga beslut som påverkar människor eller företag över Sveriges gränser (t.ex. om man får resa, flytta varor eller pengar)?",
      helpText: "Statliga myndigheter med internationella beslut omfattas direkt av lagen.",
      type: 'radio',
      options: ['Ja', 'Nej', 'Vet ej'],
      showIf: (answers) => isPublic(answers) || isUncertain(answers)
    },
    {
      id: 'q2',
      section: 2,
      sectionTitle: "Del 2: Offentlig verksamhet",
      question: "Är din verksamhet en region, en kommun eller ett kommunalförbund?",
      helpText: "Regionala och kommunala verksamheter omfattas direkt av lagen.",
      type: 'radio',
      options: ['Ja', 'Nej', 'Vet ej'],
      showIf: (answers) => isPublic(answers) || isUncertain(answers)
    },
    
    // DEL 3: Etablering, storlek och generella kriterier
    {
      id: 'q3',
      section: 3,
      sectionTitle: "Del 3: Etablering, storlek och generella kriterier",
      question: "Har din verksamhet sitt huvudsakliga säte eller etablering i Sverige?",
      helpText: "Verksamheter måste ha sitt huvudsakliga säte eller etablering i Sverige för att omfattas av lagen (1 kap. 4 § 2, 1 kap. 5 §, 1 kap. 7 §).",
      type: 'radio',
      options: ['Ja', 'Nej', 'Vet ej'],
      showIf: () => true
    },
    {
      id: 'q12',
      section: 3,
      sectionTitle: "Del 3: Etablering, storlek och generella kriterier",
      question: "Tillhandahåller din verksamhet \"betrodda tjänster\" (t.ex. e-legitimation eller elektronisk underskrift)?",
      helpText: "Leverantörer av betrodda tjänster omfattas alltid av lagen, även om de skulle vara undantagna på annat sätt.",
      type: 'radio',
      options: ['Ja', 'Nej', 'Vet ej'],
      showIf: () => true
    },
    {
      id: 'q5',
      section: 3,
      sectionTitle: "Del 3: Etablering, storlek och generella kriterier",
      question: "Är din verksamhet ett medelstort eller större företag?",
      helpText: "Ett medelstort företag har färre än 250 anställda OCH antingen en årsomsättning på högst 50 miljoner euro ELLER en balansomslutning på högst 43 miljoner euro. Är ni större än så, eller motsvarar ni dessa gränser, svarar du \"Ja\".",
      type: 'radio',
      options: ['Ja', 'Nej', 'Vet ej'],
      showIf: (answers) => isPrivate(answers) || isUncertain(answers)
    },
    {
      id: 'q4',
      section: 3,
      sectionTitle: "Del 3: Etablering, storlek och generella kriterier",
      question: "Inom vilka branscher är din organisation verksam?",
      helpText: "Välj den eller de branscher som stämmer för er verksamhet. Detta hjälper oss att ställa relevanta följdfrågor.",
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
        "Forskning (universitet, forskningsorganisationer)",
        "Utbildning",
        "Telecom",
        "Ingen av ovanstående"
      ],
      showIf: () => true
    },
    {
      id: 'q6',
      section: 3,
      sectionTitle: "Del 3: Etablering, storlek och generella kriterier",
      question: "Är din verksamhet en privat utbildningsanordnare (t.ex. en privat högskola) som har tillstånd att utfärda examina?",
      helpText: "Privata utbildningsanordnare med rätt att utfärda examina omfattas av lagen.",
      type: 'radio',
      options: ['Ja', 'Nej', 'Vet ej'],
      showIf: (answers) => {
        // Visa endast om användaren har valt "Utbildning" i Q4 eller är privat/osäker
        const hasEducationIndustry = Array.isArray(answers.q4) && answers.q4.includes('Utbildning');
        return hasEducationIndustry || (isPrivate(answers) && !hasIndustries(answers));
      }
    },
    {
      id: 'q7',
      section: 3,
      sectionTitle: "Del 3: Etablering, storlek och generella kriterier",
      question: "Tillhandahåller din verksamhet allmänna telenät (t.ex. bredbandsnät) eller tjänster för elektronisk kommunikation som är tillgängliga för allmänheten i Sverige (t.ex. telefonitjänster eller internetleverantörer)?",
      helpText: "Leverantörer av telenät och elektronisk kommunikation omfattas av lagen.",
      type: 'radio',
      options: ['Ja', 'Nej', 'Vet ej'],
      showIf: (answers) => {
        // Visa endast om användaren har valt "Telecom" i Q4
        const hasTelecomIndustry = Array.isArray(answers.q4) && answers.q4.includes('Telecom');
        return hasTelecomIndustry || !hasIndustries(answers);
      }
    },
    {
      id: 'q8',
      section: 3,
      sectionTitle: "Del 3: Etablering, storlek och generella kriterier",
      question: "Erbjuder din verksamhet digitala tjänster? (Markera alla som stämmer)",
      helpText: "Digitala tjänster som molntjänster, datacenter och CDN omfattas av lagen.",
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
        "Domännamnsregistreringstjänster",
        "Ingen av ovanstående"
      ],
      showIf: (answers) => {
        // Visa endast om användaren har valt "Digitala leverantörer" i Q4
        const hasDigitalIndustry = Array.isArray(answers.q4) && answers.q4.includes('Digitala leverantörer (molntjänster, datacenter, sökmotorer)');
        return hasDigitalIndustry || !hasIndustries(answers);
      }
    },
    {
      id: 'q9',
      section: 3,
      sectionTitle: "Del 3: Etablering, storlek och generella kriterier",
      question: "Är din verksamhet den enda leverantören i Sverige av en tjänst som är avgörande för att viktiga samhällsfunktioner eller ekonomisk verksamhet ska fungera?",
      helpText: "Verksamheter som är enda leverantörer av kritiska tjänster omfattas även om de är små.",
      type: 'radio',
      options: ['Ja', 'Nej', 'Vet ej'],
      showIf: (answers) => isPrivate(answers) || isUncertain(answers)
    },
    {
      id: 'q10',
      section: 3,
      sectionTitle: "Del 3: Etablering, storlek och generella kriterier",
      question: "Skulle ett avbrott i er tjänst allvarligt kunna påverka människors liv och hälsa, samhällets säkerhet, folkhälsan eller orsaka stora problem i digitala system?",
      helpText: "Verksamheter vars avbrott skulle ha allvarliga konsekvenser omfattas av lagen.",
      type: 'radio',
      options: ['Ja', 'Nej', 'Vet ej'],
      showIf: () => true
    },
    {
      id: 'q11',
      section: 3,
      sectionTitle: "Del 3: Etablering, storlek och generella kriterier",
      question: "Är er verksamhet extra viktig på nationell eller regional nivå för en viss bransch eller tjänst, eller för andra branscher som är beroende av er?",
      helpText: "Verksamheter med särskild betydelse för samhället omfattas av lagen.",
      type: 'radio',
      options: ['Ja', 'Nej', 'Vet ej'],
      showIf: () => true
    },
    
    // DEL 4: Undantag - Visa för alla som kan omfattas
    {
      id: 'q13',
      section: 4,
      sectionTitle: "Del 4: Undantag",
      question: "Bedriver din verksamhet huvudsakligen säkerhetskänslig verksamhet (som regleras av säkerhetsskyddslagen) eller brottsbekämpande verksamhet?",
      helpText: "Vissa verksamheter kan vara undantagna från lagen på grund av säkerhetskänslig eller brottsbekämpande verksamhet.",
      type: 'radio',
      options: ['Ja', 'Nej', 'Vet ej'],
      showIf: () => true
    },
    {
      id: 'q14',
      section: 4,
      sectionTitle: "Del 4: Undantag",
      question: "Är din verksamhet enbart en privat aktör som sysslar med säkerhetskänslig verksamhet, eller som enbart levererar tjänster till statliga myndigheter som huvudsakligen bedriver säkerhetskänslig eller brottsbekämpande verksamhet?",
      helpText: "Privata aktörer som enbart arbetar med säkerhetskänslig verksamhet kan vara undantagna.",
      type: 'radio',
      options: ['Ja', 'Nej', 'Vet ej'],
      showIf: (answers) => isPrivate(answers) || isUncertain(answers)
    },
    {
      id: 'q15',
      section: 4,
      sectionTitle: "Del 4: Undantag",
      question: "Tillhandahåller din verksamhet \"betrodda tjänster\" (t.ex. e-legitimation), även om den annars skulle vara undantagen på grund av säkerhetskänslig eller brottsbekämpande verksamhet?",
      helpText: "Leverantörer av betrodda tjänster omfattas alltid, även om de annars skulle vara undantagna.",
      type: 'radio',
      options: ['Ja', 'Nej', 'Vet ej'],
      showIf: () => true
    },
    {
      id: 'q16',
      section: 4,
      sectionTitle: "Del 4: Undantag",
      question: "Är din verksamhet någon av följande: Regeringen, Regeringskansliet, en svensk ambassad/konsulat, en kommitté/utredning, en myndighet som lyder under riksdagen, en domstol eller en nämnd som dömer i juridiska frågor?",
      helpText: "Vissa statliga organ är undantagna från lagen.",
      type: 'radio',
      options: ['Ja', 'Nej', 'Vet ej'],
      showIf: (answers) => isPublic(answers) || isUncertain(answers)
    },
    {
      id: 'q17',
      section: 4,
      sectionTitle: "Del 4: Undantag",
      question: "Är din verksamhet en församling (fullmäktige) eller styrelse (direktion) i ett kommunalförbund, eller en kommun- eller regionfullmäktige?",
      helpText: "Vissa politiska församlingar är undantagna från lagen.",
      type: 'radio',
      options: ['Ja', 'Nej', 'Vet ej'],
      showIf: (answers) => isPublic(answers) || isUncertain(answers)
    }
  ]

  // Filter questions adaptively based on answers
  const visibleQuestions = useMemo(() => {
    return questions.filter(q => q.showIf(answers));
  }, [answers]);

  // Adjust current question index if visible questions change
  useEffect(() => {
    // If current question index is beyond visible questions, go to last question
    if (currentQuestionIndex >= visibleQuestions.length && visibleQuestions.length > 0) {
      setCurrentQuestionIndex(visibleQuestions.length - 1);
    }
    
    // If current question is no longer visible, find the next visible question
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion && !visibleQuestions.find(q => q.id === currentQuestion.id)) {
      // Current question is filtered out, find first visible question after current position
      const nextVisibleIndex = visibleQuestions.findIndex((q, idx) => idx >= currentQuestionIndex);
      if (nextVisibleIndex !== -1) {
        setCurrentQuestionIndex(nextVisibleIndex);
      } else if (visibleQuestions.length > 0) {
        // No visible question after current, go to last visible
        setCurrentQuestionIndex(visibleQuestions.length - 1);
      }
    }
  }, [visibleQuestions, currentQuestionIndex]);

  // Debug logging (endast i development)
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('DEBUG INFO:');
      console.log('  Current question:', visibleQuestions[currentQuestionIndex]?.id);
      console.log('  Answers so far:', answers);
      console.log('  Progress:', `${currentQuestionIndex + 1}/${visibleQuestions.length}`);
    }
  }, [currentQuestionIndex, answers, visibleQuestions]);

  // Hantera svarsändring - INGEN auto-navigation, INGEN early exit
  const handleAnswerChange = (key, value) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    // Navigation sker ENDAST via Nästa/Föregående-knappar
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
   * Bedömer om en verksamhet omfattas av Cybersäkerhetslagen (2025:1506)
   * 
   * Ny logik enligt specifikation:
   * - Alla frågor samlas in först
   * - Bedömning görs i slutet baserat på alla svar
   * - "Vet ej" hanteras genom att markera bedömningen som osäker
   * 
   * @param {Object} answers - Svar från formuläret
   * @returns {Object} Bedömningsresultat med result, message, details
   */
  const assessCoverage = (answers) => {
    // Normalize answers to lowercase for comparison
    const normalize = (val) => {
      if (typeof val === 'string') return val.toLowerCase();
      return val;
    };
    
    const isYes = (val) => normalize(val) === 'ja';
    const isNo = (val) => normalize(val) === 'nej';
    const isVetEj = (val) => normalize(val) === 'vet ej';
    const hasSelections = (arr) => Array.isArray(arr) && arr.length > 0 && !arr.includes('Ingen av ovanstående');
    
    // 1. Analys av "Potentiell Omfattning"
    
    // Grundläggande offentlig omfattning
    const arOffentligOchOmfattasDirekt = 
      (answers.q0 === 'Offentlig' || isVetEj(answers.q0)) && 
      (isYes(answers.q1) || isYes(answers.q2));
    
    // Potentiell Privat/Övrig Offentlig omfattning
    const harSvensktSate = 
      (answers.q0 === 'Privat' || isVetEj(answers.q0) || 
       (answers.q0 === 'Offentlig' && isNo(answers.q1) && isNo(answers.q2))) && 
      isYes(answers.q3);
    
    const uppfyllerKriterierDel3 = 
      isYes(answers.q12) || // Betrodda tjänster (moved to Q12)
      isYes(answers.q5) ||  // Medelstort/större företag
      hasSelections(answers.q4) ||  // NIS 2 branscher
      isYes(answers.q6) ||  // Privat utbildning
      isYes(answers.q7) ||  // Telenät
      hasSelections(answers.q8) ||  // Digitala tjänster
      isYes(answers.q9) ||  // Enda leverantör
      isYes(answers.q10) || // Avbrott påverkar allvarligt
      isYes(answers.q11);   // Extra viktig verksamhet
    
    const arPotentielltOmfattadSomPrivat = harSvensktSate && uppfyllerKriterierDel3;
    
    // Totalt Potentiellt Omfattande
    const potentielltOmfattad = arOffentligOchOmfattasDirekt || arPotentielltOmfattadSomPrivat;
    
    // 2. Analys av "Potentiella Undantag"
    const undantagGaller = 
      isYes(answers.q13) ||  // Säkerhetskänslig/brottsbekämpande
      isYes(answers.q14) ||  // Privat säkerhetskänslig
      isYes(answers.q16) ||  // Regeringen, domstolar etc
      isYes(answers.q17);    // Fullmäktige/församlingar
    
    const betroddaTjansterTrumfarUndantag = isYes(answers.q15);  // Q15 in exceptions
    
    // 3. Kontroll av "Vet ej"-svar som påverkar slutresultatet
    let harKritiskaVetEj = false;
    
    // Kontrollera om det finns kritiska "Vet ej"
    if (isVetEj(answers.q0)) {
      // Om Q0 är osäker, kan vi inte avgöra typen
      if (!isYes(answers.q1) && !isYes(answers.q2) && !isYes(answers.q3)) {
        harKritiskaVetEj = true;
      }
    }
    
    // Om svenskt säte är osäkert för privat verksamhet
    if ((answers.q0 === 'Privat' || (isNo(answers.q1) && isNo(answers.q2))) && isVetEj(answers.q3)) {
      harKritiskaVetEj = true;
    }
    
    // Om potentiellt omfattad men många "Vet ej" i kriterierna
    if (potentielltOmfattad) {
      const kritiskaFragor = ['q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12'];
      const vetEjCount = kritiskaFragor.filter(q => isVetEj(answers[q])).length;
      if (vetEjCount >= 3) {  // Om minst 3 kritiska frågor har "Vet ej"
        harKritiskaVetEj = true;
      }
    }
    
    // Om undantag är osäkra
    if (potentielltOmfattad && (isVetEj(answers.q13) || isVetEj(answers.q14) || 
                                 isVetEj(answers.q15) || isVetEj(answers.q16) || isVetEj(answers.q17))) {
      const undantagVetEjCount = ['q13', 'q14', 'q15', 'q16', 'q17'].filter(q => isVetEj(answers[q])).length;
      if (undantagVetEjCount >= 2) {
        harKritiskaVetEj = true;
      }
    }
    
    // 4. Slutgiltigt Utfall
    
    // ⚪ OSÄKER BEDÖMNING
    if (harKritiskaVetEj) {
      return {
        result: "osäker",
        message: "Bedömningen är osäker på grund av 'Vet ej'-svar.",
        details: "Systemet kan inte ge en tillförlitlig bedömning på grund av osäkra svar. För en säkrare bedömning behöver du ta reda på svaren på de frågor du är osäker på och göra om bedömningen."
      };
    }
    
    // 🔴 OMFATTAS
    if (potentielltOmfattad && (!undantagGaller || betroddaTjansterTrumfarUndantag)) {
      return {
        result: "omfattas",
        message: "Din verksamhet omfattas sannolikt av Cybersäkerhetslagen (2025:1506).",
        details: "Baserat på dina svar uppfyller verksamheten kriterierna för att omfattas av lagen och måste följa dess krav."
      };
    }
    
    // 🟡 UNDANTAG
    if (potentielltOmfattad && undantagGaller && !betroddaTjansterTrumfarUndantag) {
      return {
        result: "undantag",
        message: "Din verksamhet kan vara undantagen trots att den annars skulle omfattas.",
        details: "Verksamheten uppfyller kriterier för att omfattas, men kan vara undantagen på grund av särskilda omständigheter. Detta kräver noggrann juridisk analys."
      };
    }
    
    // 🟢 OMFATTAS EJ
    return {
      result: "omfattas_ej",
      message: "Din verksamhet omfattas sannolikt inte av Cybersäkerhetslagen.",
      details: "Baserat på dina svar uppfyller verksamheten inte kriterierna för att omfattas av lagen."
    };
  };

  // Skicka in formulär
  const handleSubmit = async (submittedAnswers) => {
    setLoading(true);
    
    try {
      // Använd submittedAnswers om det finns, annars answers
      const finalAnswers = submittedAnswers || answers;
      
      // Beräkna bedömning
      const result = assessCoverage(finalAnswers);
      
      // Försök spara till Supabase med graceful fallback
      let surveyId = null;
      try {
        // Check if Supabase is properly configured
        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
          console.warn('Supabase environment variables not configured. Using localStorage only.');
          throw new Error('Supabase not configured');
        }

        // Check if Supabase client is configured
        if (!supabase) {
          throw new Error('Supabase client not initialized - check environment variables');
        }

        const { data, error } = await supabase
          .from('survey_responses')
          .insert([{
            q0: finalAnswers.q0 || null,
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

        if (error) {
          console.warn('Kunde inte spara till databas:', error.message);
          throw error; // Går till catch-blocket nedan
        } else if (data && data[0]) {
          surveyId = data[0].id;
          setDatabaseError(false);
          setDatabaseErrorDetails(null);
          console.log('✅ Svar sparade i databas');
        }
      } catch (dbErr) {
        // Spara till localStorage istället
        const localBackup = {
          id: `local_${Date.now()}`,
          answers: finalAnswers,
          assessment: result,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem('survey_backup', JSON.stringify(localBackup));
        surveyId = localBackup.id;
        setDatabaseError(true);
        setDatabaseErrorDetails({
          message: dbErr.message || 'Kunde inte ansluta till databas',
          timestamp: new Date().toISOString()
        });
        console.log('💾 Svar sparade lokalt (localStorage)');
      }

      setSurveyResponseId(surveyId);
      setAssessment(result);
      setShowResults(true);
    } catch (error) {
      console.error('Fel vid bearbetning:', error);
      alert('Ett oväntat fel uppstod. Vänligen försök igen.');
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
        
        {/* Database error warning */}
        {databaseError && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-yellow-700">
                    <strong>Observera:</strong> Dina svar har sparats lokalt i din webbläsare. 
                    Du kan fortsätta se ditt resultat nedan. Om du vill bli kontaktad av oss, fyll i kontaktformuläret längre ner.
                  </p>
                  {import.meta.env.DEV && databaseErrorDetails && (
                    <details className="mt-2">
                      <summary className="text-xs text-yellow-600 cursor-pointer hover:text-yellow-800">
                        Teknisk information (för utvecklare)
                      </summary>
                      <pre className="mt-2 text-xs bg-yellow-100 p-2 rounded overflow-auto">
                        {JSON.stringify(databaseErrorDetails, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
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
          <p className="text-lg text-gray-600">
            Bedömning av din verksamhet
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-primary">
              {Object.keys(answers).length > 0 ? (
                <>Frågor besvarade: {Object.keys(answers).length} av {visibleQuestions.length}</>
              ) : (
                <>Börja med första frågan</>
              )}
            </span>
            <span className="text-sm font-medium text-primary">
              Fråga {currentQuestionIndex + 1} av {visibleQuestions.length}
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
        
        {/* Debug panel - endast i development mode */}
        {import.meta.env.DEV && (
          <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-sm text-xs z-50">
            <h3 className="font-bold mb-2">Debug Info</h3>
            <div className="space-y-1">
              <p><strong>Current Q:</strong> {currentQuestion?.id}</p>
              <p><strong>Progress:</strong> {currentQuestionIndex + 1}/{visibleQuestions.length}</p>
              <p><strong>Answers:</strong> {Object.keys(answers).length} questions answered</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
