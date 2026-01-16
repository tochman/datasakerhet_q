import { useState, useEffect } from 'react'

/**
 * SecurityMeasures component displays security measures and incident reporting procedures
 * for businesses covered by the Cybersecurity Law (2025:1506)
 */
export default function SecurityMeasures() {
  const [checklist, setChecklist] = useState({})
  const [expandedSections, setExpandedSections] = useState({
    security: true,
    incident: true
  })

  // Data för säkerhetsåtgärder (2 kap. 3-4 §§)
  const securityMeasures = [
    {
      id: 'security_1',
      title: 'Riskanalys och säkerhetsstrategier',
      reference: '2 kap. 3 § 1',
      description: 'Utveckla och implementera strategier för att regelbundet analysera cybersäkerhetsrisker och för att säkerställa säkerheten i nätverks- och informationssystemen.'
    },
    {
      id: 'security_2',
      title: 'Incidenthantering',
      reference: '2 kap. 3 § 2',
      description: 'Upprätta och underhålla processer och rutiner för effektiv hantering av säkerhetsincidenter, inklusive upptäckt, analys, åtgärder och återställning.'
    },
    {
      id: 'security_3',
      title: 'Kontinuitets- och krishantering',
      reference: '2 kap. 3 § 3',
      description: 'Säkerställa planer för verksamhetens kontinuitet och krishantering för att kunna upprätthålla kritiska funktioner vid störningar. Detta inkluderar säkerhetskopiering och återställningsprocedurer.'
    },
    {
      id: 'security_4',
      title: 'Säkerhet i leveranskedjan',
      reference: '2 kap. 3 § 4',
      description: 'Implementera åtgärder för att hantera cybersäkerhetsrisker relaterade till leverantörer och tjänster i leveranskedjan.'
    },
    {
      id: 'security_5',
      title: 'Säkerhet vid förvärv, utveckling och underhåll',
      reference: '2 kap. 3 § 5',
      description: 'Integrera säkerhetshänsyn i alla faser av förvärv, utveckling och underhåll av nätverks- och informationssystem.'
    },
    {
      id: 'security_6',
      title: 'Bedömning av åtgärdernas effektivitet',
      reference: '2 kap. 3 § 6',
      description: 'Utveckla strategier och förfaranden för att regelbundet bedöma och mäta effektiviteten av de vidtagna säkerhetsåtgärderna.'
    },
    {
      id: 'security_7',
      title: 'Cyberhygien och utbildning',
      reference: '2 kap. 3 § 7',
      description: 'Etablera grundläggande praxis för "cyberhygien" (t.ex. starka lösenord, uppdateringar, backup) och genomföra kontinuerlig utbildning i cybersäkerhet för all personal.'
    },
    {
      id: 'security_8',
      title: 'Kryptografi och kryptering',
      reference: '2 kap. 3 § 8',
      description: 'Använda strategier och förfaranden för kryptografi och, vid behov, implementera kryptering för att skydda information.'
    },
    {
      id: 'security_9',
      title: 'Personalsäkerhet, åtkomstkontroll och tillgångsförvaltning',
      reference: '2 kap. 3 § 9',
      description: 'Införa åtgärder för personalsäkerhet, inklusive rutiner för åtkomstkontroll till system och information, samt processer för tillgångsförvaltning.'
    },
    {
      id: 'security_10',
      title: 'Autentisering och säkrad kommunikation',
      reference: '2 kap. 3 § 10',
      description: 'Använda lösningar för autentisering (t.ex. multifaktorautentisering), säkra kommunikationslösningar och, vid behov, säkrade nödkommunikationssystem.'
    },
    {
      id: 'security_11',
      title: 'Utbildning av ledningen',
      reference: '2 kap. 4 §',
      description: 'Se till att de personer som ingår i ledningen för verksamheten genomgår adekvat utbildning om säkerhetsåtgärder och vikten av cybersäkerhet.'
    }
  ]

  // Data för incidentrapportering (2 kap. 5-10 §§)
  const incidentProcedures = [
    {
      id: 'incident_1',
      title: 'Anmälningsskyldighet',
      reference: '2 kap. 2 §',
      description: 'Upprätta en rutin för att anmäla verksamheten till den myndighet regeringen bestämmer, så snart det kan ske. Säkerställa att ändringar i de anmälda förhållandena rapporteras skyndsamt, dock senast 14 dagar efter förändringen.',
      deadline: '14 dagar'
    },
    {
      id: 'incident_2',
      title: 'Omedelbar upplysning om betydande incidenter',
      reference: '2 kap. 5 §',
      description: 'Rutiner för att omedelbart, senast inom 24 timmar efter kännedom, upplysa tillsynsmyndigheten om en betydande incident. Definition: En händelse som har orsakat eller kan orsaka allvarlig driftsstörning för den erbjudna tjänsten, ekonomisk skada för verksamhetsutövaren, eller betydande skada för andra fysiska eller juridiska personer.',
      deadline: '24 timmar',
      urgent: true
    },
    {
      id: 'incident_3',
      title: 'Incidentanmälan',
      reference: '2 kap. 6 §',
      description: 'Rutiner för att inkomma med en incidentanmälan till tillsynsmyndigheten: Senast 24 timmar efter kännedom för verksamhetsutövare som tillhandahåller betrodda tjänster. Senast 72 timmar efter kännedom för övriga verksamhetsutövare.',
      deadline: '24-72 timmar',
      urgent: true
    },
    {
      id: 'incident_4',
      title: 'Delrapportering',
      reference: '2 kap. 7 §',
      description: 'Rutiner för att, på begäran av tillsynsmyndigheten, lämna delrapporter med statusuppdateringar om den betydande incidenten.'
    },
    {
      id: 'incident_5',
      title: 'Slutrapportering',
      reference: '2 kap. 8 §',
      description: 'Rutiner för att lämna en slutrapport till tillsynsmyndigheten senast en månad efter incidentanmälan. Om incidenten fortfarande pågår vid denna tidpunkt, ska en lägesrapport lämnas och därefter en slutrapport inom en månad efter det att incidenten har hanterats.',
      deadline: '1 månad'
    },
    {
      id: 'incident_6',
      title: 'Information till tjänstemottagare vid betydande incidenter',
      reference: '2 kap. 9 §',
      description: 'Rutiner för att, om det är lämpligt, informera mottagarna av tjänsterna om en betydande incident som sannolikt inverkar negativt på tillhandahållandet av tjänsterna, så snart det kan ske.'
    },
    {
      id: 'incident_7',
      title: 'Information till tjänstemottagare vid betydande cyberhot',
      reference: '2 kap. 10 §',
      description: 'Rutiner för att, vid ett betydande cyberhot, informera mottagarna av tjänsterna om skydds- och motåtgärder de kan vidta, så snart det kan ske. Om det är lämpligt ska även information om själva hotet lämnas. Definition: Ett hot som, på grund av sina tekniska egenskaper, kan antas ha potential att allvarligt påverka nätverks- och informationssystem eller användare av tjänsterna genom att vålla betydande skada.'
    }
  ]

  // Load från localStorage
  useEffect(() => {
    const saved = localStorage.getItem('security_measures_checklist')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setChecklist(parsed.checklist || {})
      } catch (error) {
        console.error('Error parsing localStorage:', error)
      }
    }
  }, [])

  // Save till localStorage
  const handleCheckboxChange = (id) => {
    const updated = { ...checklist, [id]: !checklist[id] }
    setChecklist(updated)
    const dataToSave = {
      checklist: updated,
      last_updated: new Date().toISOString()
    }
    localStorage.setItem('security_measures_checklist', JSON.stringify(dataToSave))
  }

  // Toggle section
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Räkna progress
  const totalItems = securityMeasures.length + incidentProcedures.length
  const completedItems = Object.values(checklist).filter(Boolean).length
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6 security-measures-print">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        📋 Föreslagna Säkerhetsåtgärder och Rutiner
      </h2>
      
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Din framsteg</span>
          <span>{completedItems} av {totalItems} implementerade</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Säkerhetsåtgärder sektion */}
      <section className="mb-6 border-l-4 border-blue-500 pl-4">
        <button
          onClick={() => toggleSection('security')}
          className="w-full flex items-center justify-between py-3 text-left no-print"
          aria-expanded={expandedSections.security}
          aria-controls="security-content"
        >
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">🔒</span>
            Säkerhetsåtgärder (2 kap. 3-4 §§)
          </h3>
          <svg 
            className={`w-6 h-6 transition-transform ${expandedSections.security ? 'transform rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <div className="print-title hidden">
          <h3 className="text-xl font-bold text-gray-900 flex items-center mb-4">
            <span className="mr-2">🔒</span>
            Säkerhetsåtgärder (2 kap. 3-4 §§)
          </h3>
        </div>

        <div 
          id="security-content"
          className={`mt-4 space-y-4 ${expandedSections.security ? '' : 'hidden print-show'}`}
        >
          <p className="text-sm text-gray-700 mb-4 bg-blue-50 p-4 rounded-lg">
            Verksamhetsutövare ska vidta lämpliga och proportionella tekniska, driftsrelaterade och organisatoriska åtgärder för att skydda nätverks- och informationssystem som används för verksamheten eller för att tillhandahålla tjänster, samt systemens fysiska miljö mot incidenter. Dessa åtgärder ska utgå från ett allriskperspektiv och säkerställa en lämplig säkerhetsnivå i förhållande till risken.
          </p>

          {securityMeasures.map((measure) => (
            <div 
              key={measure.id} 
              className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <input
                type="checkbox"
                id={measure.id}
                checked={!!checklist[measure.id]}
                onChange={() => handleCheckboxChange(measure.id)}
                className="mt-1 mr-3 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
              />
              <label htmlFor={measure.id} className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900">{measure.title}</h4>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded ml-2">
                    {measure.reference}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{measure.description}</p>
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Incidentrapportering sektion */}
      <section className="mb-6 border-l-4 border-orange-500 pl-4">
        <button
          onClick={() => toggleSection('incident')}
          className="w-full flex items-center justify-between py-3 text-left no-print"
          aria-expanded={expandedSections.incident}
          aria-controls="incident-content"
        >
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">🚨</span>
            Incidentrapportering och informationsskyldighet (2 kap. 5-10 §§)
          </h3>
          <svg 
            className={`w-6 h-6 transition-transform ${expandedSections.incident ? 'transform rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className="print-title hidden">
          <h3 className="text-xl font-bold text-gray-900 flex items-center mb-4">
            <span className="mr-2">🚨</span>
            Incidentrapportering och informationsskyldighet (2 kap. 5-10 §§)
          </h3>
        </div>

        <div 
          id="incident-content"
          className={`mt-4 space-y-4 ${expandedSections.incident ? '' : 'hidden print-show'}`}
        >
          <p className="text-sm text-gray-700 mb-4 bg-orange-50 p-4 rounded-lg">
            Verksamhetsutövare har en skyldighet att rapportera betydande incidenter och att informera berörda parter om sådana incidenter och betydande cyberhot.
          </p>

          {incidentProcedures.map((procedure) => (
            <div 
              key={procedure.id} 
              className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <input
                type="checkbox"
                id={procedure.id}
                checked={!!checklist[procedure.id]}
                onChange={() => handleCheckboxChange(procedure.id)}
                className="mt-1 mr-3 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
              />
              <label htmlFor={procedure.id} className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                  <h4 className="font-semibold text-gray-900">{procedure.title}</h4>
                  <div className="flex items-center gap-2">
                    {procedure.deadline && (
                      <span 
                        className={`text-xs px-2 py-1 rounded font-semibold ${
                          procedure.urgent 
                            ? 'bg-red-100 text-red-800 border border-red-300' 
                            : 'bg-orange-100 text-orange-800 border border-orange-300'
                        }`}
                      >
                        ⏱️ {procedure.deadline}
                      </span>
                    )}
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                      {procedure.reference}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{procedure.description}</p>
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Varningsbox */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex items-start">
          <span className="text-2xl mr-3">⚠️</span>
          <div>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Viktigt att notera:</strong> Regeringen eller den myndighet som regeringen bestämmer kan 
              komma att meddela ytterligare föreskrifter om säkerhetsåtgärder, utbildning, 
              incidentrapportering, informationsskyldighet och registerföring (2 kap. 14 §). 
              Det är därför viktigt att löpande hålla sig uppdaterad om nya förordningar och 
              föreskrifter som kompletterar lagen.
            </p>
            <p className="text-sm text-gray-700">
              Denna lista är avsedd att ge en översikt baserad på Cybersäkerhetslagen (2025:1506). 
              För en fullständig implementering bör varje verksamhet genomföra en detaljerad 
              riskanalys och anpassa sina åtgärder och rutiner efter sin specifika kontext och 
              de tjänster som tillhandahålls.
            </p>
          </div>
        </div>
      </div>

      {/* Call-to-actions */}
      <div className="flex gap-4 flex-wrap no-print">
        <button 
          onClick={() => window.print()}
          className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg shadow transition-colors"
        >
          <span className="mr-2">📄</span>
          Skriv ut som checklista
        </button>
        <button 
          onClick={() => {
            const contactForm = document.querySelector('#contact-form')
            if (contactForm) {
              contactForm.scrollIntoView({ behavior: 'smooth' })
            } else {
              // If contact form is not visible, try to trigger it
              const contactButton = document.querySelector('[data-contact-trigger]')
              if (contactButton) {
                contactButton.click()
              }
            }
          }}
          className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow transition-colors"
        >
          <span className="mr-2">📧</span>
          Få hjälp med implementering
        </button>
      </div>
    </div>
  )
}
