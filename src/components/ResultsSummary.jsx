import React from 'react'

/**
 * Komponent för att visa bedömningsresultat
 * @param {Object} props
 * @param {Object} props.assessment - Bedömningsresultat
 * @param {Object} props.answers - Användarens svar från formuläret
 * @param {function} props.onShowContactForm - Callback för att visa kontaktformulär
 */
export default function ResultsSummary({ assessment, answers, onShowContactForm }) {
  // Färgkodning baserat på resultat
  const getResultColor = (result) => {
    switch(result) {
      case 'omfattas':
        return 'bg-red-100 border-red-300 text-red-900'
      case 'undantag':
        return 'bg-yellow-100 border-yellow-300 text-yellow-900'
      case 'osäker':
        return 'bg-gray-100 border-gray-300 text-gray-900'
      case 'omfattas_ej':
        return 'bg-green-100 border-green-300 text-green-900'
      default:
        return 'bg-gray-100 border-gray-300 text-gray-900'
    }
  }

  const getResultIcon = (result) => {
    switch(result) {
      case 'omfattas':
        return (
          <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      case 'undantag':
        return (
          <svg className="w-16 h-16 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'osäker':
        return (
          <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'omfattas_ej':
        return (
          <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in px-3 sm:px-0">
      <div className={`border-4 rounded-sm p-6 sm:p-8 mb-6 sm:mb-8 transition-all duration-300 ${getResultColor(assessment.result)}`}>
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 sm:mb-4 animate-bounce-once">
            {getResultIcon(assessment.result)}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            Bedömning av er verksamhet
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3">
            {assessment.message}
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-gray-700">
            {assessment.details}
          </p>
        </div>
      </div>

      {/* MCFFS 2026:1 Klassificering - Väsentlig/Viktig */}
      {assessment.category && (
        <div className={`border-2 rounded-sm p-6 mb-8 ${
          assessment.category === 'väsentlig' 
            ? 'bg-orange-50 border-orange-300' 
            : 'bg-blue-50 border-blue-300'
        }`}>
          <div className="flex items-start">
            <svg className={`w-8 h-8 mt-1 mr-4 flex-shrink-0 ${
              assessment.category === 'väsentlig' ? 'text-orange-600' : 'text-blue-600'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <h3 className={`text-xl font-bold mb-3 ${
                assessment.category === 'väsentlig' ? 'text-orange-900' : 'text-blue-900'
              }`}>
                {assessment.category === 'väsentlig' 
                  ? '⚠️ Väsentlig verksamhetsutövare' 
                  : 'ℹ️ Viktig verksamhetsutövare'
                }
              </h3>
              <p className={`mb-3 ${
                assessment.category === 'väsentlig' ? 'text-orange-800' : 'text-blue-800'
              }`}>
                {assessment.category === 'väsentlig' ? (
                  <>
                    Enligt <strong>MCFFS 2026:1</strong> (Myndigheten för civilt försvar, beslutat 2026-01-08) 
                    klassificeras er verksamhet som en <strong>väsentlig verksamhetsutövare</strong> baserat på era svar.
                  </>
                ) : (
                  <>
                    Enligt <strong>MCFFS 2026:1</strong> (Myndigheten för civilt försvar, beslutat 2026-01-08) 
                    klassificeras er verksamhet som en <strong>viktig verksamhetsutövare</strong> baserat på era svar.
                  </>
                )}
              </p>
              <div className={`p-4 rounded border ${
                assessment.category === 'väsentlig' 
                  ? 'bg-orange-100 border-orange-300' 
                  : 'bg-blue-100 border-blue-300'
              }`}>
                <h4 className="font-semibold mb-2">
                  {assessment.category === 'väsentlig' ? 'Striktare krav gäller:' : 'Förhöjda krav gäller:'}
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {assessment.category === 'väsentlig' ? (
                    <>
                      <li>Omfattande incidenthantering och snabb rapportering</li>
                      <li>Regelbunden tillsyn från Myndigheten för samhällsskydd och beredskap (MSB)</li>
                      <li>Högre krav på riskbedömningar och säkerhetsåtgärder</li>
                      <li>Striktare sanktioner vid bristande efterlevnad</li>
                      <li>Krav på säkerhetsansvarig person</li>
                    </>
                  ) : (
                    <>
                      <li>Incidenthantering och rapportering till tillsynsmyndighet</li>
                      <li>Regelbundna riskbedömningar och säkerhetsåtgärder</li>
                      <li>Krav på tekniska och organisatoriska åtgärder</li>
                      <li>Dokumentation av säkerhetsarbete</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Juridisk rekommendation */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-sm p-6 mb-8">
        <div className="flex items-start">
          <svg className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Viktig information</h3>
            <p className="text-blue-800">
              Denna bedömning är en indikation baserad på lagtexten. För en definitiv bedömning 
              och juridisk rådgivning rekommenderas att konsultera en jurist specialiserad på 
              IT- och säkerhetsrätt.
            </p>
          </div>
        </div>
      </div>

      {/* Kontakt-knapp */}
      <div className="text-center mb-8">
        <button
          onClick={onShowContactForm}
          data-contact-trigger
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-dark hover:to-blue-700 text-white text-lg font-semibold rounded-sm shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Vill ha mer information
        </button>
      </div>

      {/* Attribution */}
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-600">
          Detta frågeformulär är byggt baserat på en initial bedömning av lagen gjord av{' '}
          <a 
            href="https://lexlegal.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-dark underline font-medium"
          >
            lexlegal.ai
          </a>
          {' '}– en AI-driven juridisk tjänst
        </p>
        <p className="text-sm text-gray-600">
          Frågor eller feedback? Kontakta oss på{' '}
          <a 
            href="mailto:hey@communitaslabs.io"
            className="text-primary hover:text-primary-dark underline font-medium"
          >
            hey@communitaslabs.io
          </a>
        </p>
      </div>
    </div>
  )
}
