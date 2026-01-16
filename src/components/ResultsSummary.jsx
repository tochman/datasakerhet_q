import React from 'react'

/**
 * Komponent för att visa bedömningsresultat
 * @param {Object} props
 * @param {Object} props.assessment - Bedömningsresultat
 * @param {function} props.onShowContactForm - Callback för att visa kontaktformulär
 */
export default function ResultsSummary({ assessment, onShowContactForm }) {
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
    <div className="max-w-4xl mx-auto">
      <div className={`border-4 rounded-xl p-8 mb-8 ${getResultColor(assessment.result)}`}>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            {getResultIcon(assessment.result)}
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Bedömning av er verksamhet
          </h2>
          <p className="text-xl font-semibold mb-2">
            {assessment.message}
          </p>
          <p className="text-lg">
            {assessment.details}
          </p>
        </div>
      </div>

      {/* Juridisk rekommendation */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
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
      <div className="text-center">
        <button
          onClick={onShowContactForm}
          data-contact-trigger
          className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-dark text-white text-lg font-semibold rounded-lg shadow-lg transition-colors"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Vill ha mer information
        </button>
      </div>
    </div>
  )
}
