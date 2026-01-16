import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import QuestionSection from './QuestionSection'
import ResultsSummary from './ResultsSummary'
import ContactForm from './ContactForm'
import SecurityMeasures from './SecurityMeasures'

/**
 * Huvudformulär med alla 17 frågor om Cybersäkerhetslagen
 */
export default function QuestionnaireForm() {
  const [currentPart, setCurrentPart] = useState(0)
  const [answers, setAnswers] = useState({})
  const [assessment, setAssessment] = useState(null)
  const [surveyResponseId, setSurveyResponseId] = useState(null)
  const [showContactForm, setShowContactForm] = useState(false)
  const [loading, setLoading] = useState(false)

  // Definiera alla frågor grupperade i delar
  const questionParts = [
    {
      title: "Del 1: Statlig, regional eller kommunal verksamhet",
      questions: [
        {
          key: "q1",
          text: "Är din verksamhet en statlig myndighet som fattar viktiga beslut som påverkar människor eller företag över Sveriges gränser (t.ex. om man får resa, flytta varor eller pengar)?",
          type: "radio"
        },
        {
          key: "q2",
          text: "Är din verksamhet en region, en kommun eller ett kommunalförbund?",
          type: "radio"
        }
      ]
    },
    {
      title: "Del 2: Privat verksamhet och storlek",
      questions: [
        {
          key: "q3",
          text: "Är din verksamhet ett medelstort eller större företag?",
          helpText: "Förtydligande: Ett medelstort företag har färre än 250 anställda OCH antingen en årsomsättning på högst 50 miljoner euro ELLER en balansomslutning på högst 43 miljoner euro. Är ni större än så, eller motsvarar ni dessa gränser, svarar du \"Ja\".",
          type: "radio"
        },
        {
          key: "q4",
          text: "Omfattas er verksamhet av bilagorna i EU:s så kallade NIS 2-direktiv (EU 2022/2555)?",
          helpText: "Detta direktiv handlar om säkerhet för nätverks- och informationssystem.",
          type: "radio"
        },
        {
          key: "q5",
          text: "Är din verksamhet en privat utbildningsanordnare (t.ex. en privat högskola) som har tillstånd att utfärda examina?",
          type: "radio"
        },
        {
          key: "q6",
          text: "Har din verksamhet sitt huvudsakliga säte eller etablering i Sverige?",
          type: "radio"
        }
      ]
    },
    {
      title: "Del 3: Digitala tjänster och samhällsfunktion",
      questions: [
        {
          key: "q7",
          text: "Tillhandahåller din verksamhet allmänna telenät (t.ex. bredbandsnät) eller tjänster för elektronisk kommunikation som är tillgängliga för allmänheten i Sverige (t.ex. telefonitjänster eller internetleverantörer)?",
          type: "radio"
        },
        {
          key: "q8",
          text: "Har din verksamhet sitt huvudsakliga säte eller en representant i Sverige och erbjuder den någon av dessa digitala tjänster? (Markera alla som stämmer)",
          type: "checkbox",
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
          key: "q9",
          text: "Är din verksamhet den enda leverantören i Sverige av en tjänst som är avgörande för att viktiga samhällsfunktioner eller ekonomisk verksamhet ska fungera?",
          type: "radio"
        },
        {
          key: "q10",
          text: "Skulle ett avbrott i er tjänst allvarligt kunna påverka människors liv och hälsa, samhällets säkerhet, folkhälsan eller orsaka stora problem i digitala system?",
          type: "radio"
        },
        {
          key: "q11",
          text: "Är er verksamhet extra viktig på nationell eller regional nivå för en viss bransch eller tjänst, eller för andra branscher som är beroende av er?",
          type: "radio"
        },
        {
          key: "q12",
          text: "Tillhandahåller din verksamhet \"betrodda tjänster\" (t.ex. e-legitimation eller elektronisk underskrift)?",
          type: "radio"
        }
      ]
    },
    {
      title: "Del 4: Undantag",
      questions: [
        {
          key: "q13",
          text: "Bedriver din verksamhet huvudsakligen säkerhetskänslig verksamhet (som regleras av säkerhetsskyddslagen) eller brottsbekämpande verksamhet?",
          type: "radio"
        },
        {
          key: "q14",
          text: "Är din verksamhet enbart en privat aktör som sysslar med säkerhetskänslig verksamhet, eller som enbart levererar tjänster till statliga myndigheter som huvudsakligen bedriver säkerhetskänslig eller brottsbekämpande verksamhet?",
          type: "radio"
        },
        {
          key: "q15",
          text: "Tillhandahåller din verksamhet \"betrodda tjänster\" (t.ex. e-legitimation), även om den annars skulle vara undantagen på grund av säkerhetskänslig eller brottsbekämpande verksamhet?",
          type: "radio"
        },
        {
          key: "q16",
          text: "Är din verksamhet någon av följande: Regeringen, Regeringskansliet, en svensk ambassad/konsulat, en kommitté/utredning, en myndighet som lyder under riksdagen, en domstol eller en nämnd som dömer i juridiska frågor?",
          type: "radio"
        },
        {
          key: "q17",
          text: "Är din verksamhet en församling (fullmäktige) eller styrelse (direktion) i ett kommunalförbund, eller en kommun- eller regionfullmäktige?",
          type: "radio"
        }
      ]
    }
  ]

  // Hantera svarsändring
  const handleAnswerChange = (key, value) => {
    setAnswers(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Validera om nuvarande del är klar
  const isCurrentPartComplete = () => {
    const currentQuestions = questionParts[currentPart].questions
    return currentQuestions.every(q => {
      if (q.type === 'checkbox') {
        // För checkbox, acceptera tom array
        return true
      }
      return answers[q.key] !== undefined && answers[q.key] !== ''
    })
  }

  // Nästa del
  const handleNext = () => {
    if (currentPart < questionParts.length - 1) {
      setCurrentPart(currentPart + 1)
      window.scrollTo(0, 0)
    } else {
      // Sista delen, skicka in formulär
      handleSubmit()
    }
  }

  // Föregående del
  const handlePrevious = () => {
    if (currentPart > 0) {
      setCurrentPart(currentPart - 1)
      window.scrollTo(0, 0)
    }
  }

  /**
   * Bedömer om en verksamhet omfattas av Cybersäkerhetslagen (2025:1506)
   * 
   * Viktiga principer:
   * - Del 1 (statliga/kommunala verksamheter): Omfattas direkt, q6 är inte relevant
   * - Del 2 & 3 (privata verksamheter): KRÄVER svenskt säte (q6 = ja) enligt 1 kap. 4 § 2
   * - Del 4 (undantag): Kan göra att verksamheten inte omfattas trots att den annars skulle
   * 
   * @param {Object} answers - Svar från formuläret
   * @returns {Object} Bedömningsresultat med result, message, details
   */
  const assessCoverage = (answers) => {
    // Del 1: Statlig, regional eller kommunal
    const coveredByPart1 = answers.q1 === 'ja' || answers.q2 === 'ja'
    
    // Del 2 och 3: Privat verksamhet och digitala tjänster
    // Viktigt: Kräver svenskt säte/etablering (q6) enligt 1 kap. 4 § 2, 5 §, 7 §
    const coveredByPart2And3 = 
      answers.q6 === 'ja' && (
        answers.q3 === 'ja' || 
        answers.q4 === 'ja' || 
        answers.q5 === 'ja' || 
        answers.q7 === 'ja' || 
        (answers.q8 && answers.q8.length > 0) ||
        answers.q9 === 'ja' || 
        answers.q10 === 'ja' || 
        answers.q11 === 'ja' || 
        answers.q12 === 'ja'
      )
    
    // Del 4: Undantag
    const hasException = 
      (answers.q13 === 'ja' || answers.q14 === 'ja' || answers.q16 === 'ja' || answers.q17 === 'ja') &&
      answers.q15 !== 'ja'
    
    const hasUncertainAnswers = Object.entries(answers).some(([key, value]) => {
      if (key === 'q8') {
        // För q8, kontrollera inte "vet ej" här
        return false
      }
      return value === 'vet_ej'
    })
    
    // Sammanfattande bedömning
    if ((coveredByPart1 || coveredByPart2And3) && !hasException) {
      return {
        result: "omfattas",
        message: "Din verksamhet omfattas sannolikt av Cybersäkerhetslagen (2025:1506).",
        details: "Baserat på dina svar uppfyller verksamheten kriterierna för att omfattas av lagen."
      }
    } else if ((coveredByPart1 || coveredByPart2And3) && hasException) {
      return {
        result: "undantag",
        message: "Din verksamhet kan vara undantagen trots att den annars skulle omfattas.",
        details: "Verksamheten uppfyller kriterier för att omfattas, men kan vara undantagen på grund av särskilda omständigheter."
      }
    } else if (hasUncertainAnswers) {
      return {
        result: "osäker",
        message: "Bedömningen är osäker på grund av 'Vet ej'-svar.",
        details: "För en säkrare bedömning behöver du ta reda på svaren på de frågor du är osäker på."
      }
    } else {
      return {
        result: "omfattas_ej",
        message: "Din verksamhet omfattas sannolikt inte av Cybersäkerhetslagen.",
        details: "Baserat på dina svar uppfyller verksamheten inte kriterierna för att omfattas av lagen."
      }
    }
  }

  // Skicka in formulär
  const handleSubmit = async () => {
    setLoading(true)
    
    try {
      // Beräkna bedömning
      const result = assessCoverage(answers)
      
      // Spara till Supabase
      const { data, error } = await supabase
        .from('survey_responses')
        .insert([{
          q1: answers.q1 || null,
          q2: answers.q2 || null,
          q3: answers.q3 || null,
          q4: answers.q4 || null,
          q5: answers.q5 || null,
          q6: answers.q6 || null,
          q7: answers.q7 || null,
          q8_services: answers.q8 || null,
          q9: answers.q9 || null,
          q10: answers.q10 || null,
          q11: answers.q11 || null,
          q12: answers.q12 || null,
          q13: answers.q13 || null,
          q14: answers.q14 || null,
          q15: answers.q15 || null,
          q16: answers.q16 || null,
          q17: answers.q17 || null,
          assessment_result: result.result,
          assessment_message: result.message,
          assessment_details: result.details,
          wants_contact: false
        }])
        .select()

      if (error) throw error

      if (data && data[0]) {
        setSurveyResponseId(data[0].id)
      }
      
      setAssessment(result)
    } catch (error) {
      console.error('Fel vid sparande:', error)
      alert('Ett fel uppstod vid sparande. Vänligen försök igen.')
    } finally {
      setLoading(false)
    }
  }

  // Om bedömning är klar och kontaktformulär ska visas
  if (assessment && showContactForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <ContactForm surveyResponseId={surveyResponseId} />
      </div>
    )
  }

  // Om bedömning är klar
  if (assessment) {
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
    )
  }

  // Visa formulär
  const currentPartData = questionParts[currentPart]
  const progress = ((currentPart + 1) / questionParts.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cybersäkerhetslagen (2025:1506)
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Bedömningsformulär för verksamheter
          </p>
          <p className="text-sm text-gray-500">
            Besvara frågorna för att få en indikation på om din verksamhet omfattas av lagen
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-primary">
              Del {currentPart + 1} av {questionParts.length}
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
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {currentPartData.title}
          </h2>

          {/* Frågor */}
          <div>
            {currentPartData.questions.map((question) => (
              <QuestionSection
                key={question.key}
                question={question.text}
                questionKey={question.key}
                value={answers[question.key]}
                onChange={handleAnswerChange}
                helpText={question.helpText}
                type={question.type}
                options={question.options}
              />
            ))}
          </div>
        </div>

        {/* Navigeringsknappar */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentPart === 0}
            className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Föregående
          </button>

          <button
            onClick={handleNext}
            disabled={!isCurrentPartComplete() || loading}
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
            ) : currentPart === questionParts.length - 1 ? (
              'Slutför →'
            ) : (
              'Nästa →'
            )}
          </button>
        </div>

        {/* Hjälptext om obligatoriska frågor */}
        {!isCurrentPartComplete() && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Vänligen besvara alla frågor för att fortsätta
          </p>
        )}
      </div>
    </div>
  )
}
