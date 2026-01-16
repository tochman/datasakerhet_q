import React from 'react';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-6">
            <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Omfattas din verksamhet av<br />Cybersäkerhetslagen?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Få en snabb bedömning om din verksamhet omfattas av Cybersäkerhetslagen (2025:1506)
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Om lagen */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 Om lagen</h2>
            <p className="text-gray-700 mb-4">
              Cybersäkerhetslagen (2025:1506) genomför EU:s NIS 2-direktiv i Sverige och ställer krav 
              på hög cybersäkerhet för viktiga samhällsfunktioner och digitala tjänster.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Ikrafttagen:</strong> 15 januari 2026
            </p>
          </div>

          {/* Vad kan du förvänta dig */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ Vad händer nu?</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Svara på <strong>3-15 frågor</strong> (beroende på din verksamhet)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Tar cirka <strong>3-5 minuter</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Få <strong>omedelbart resultat</strong> om din verksamhet omfattas</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Se <strong>konkreta säkerhetsåtgärder</strong> om du omfattas</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><strong>Helt anonymt</strong> tills du väljer att dela kontaktuppgifter</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Vem är detta för */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">👥 Vem är detta verktyg för?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🏢</div>
              <p className="text-sm font-medium">Företag och organisationer</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏛️</div>
              <p className="text-sm font-medium">Offentliga verksamheter</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">☁️</div>
              <p className="text-sm font-medium">Digitala tjänsteleverantörer</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💼</div>
              <p className="text-sm font-medium">Beslutsfattare & IT-ansvariga</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={onStart}
            className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-dark text-white text-lg font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105"
          >
            Starta bedömning
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Tar ca 3-5 minuter • Anonymt • Helt gratis
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-sm text-gray-700">
            ⚠️ <strong>Juridisk ansvarsfriskrivning:</strong> Detta verktyg ger vägledning baserat på 
            Cybersäkerhetslagen (2025:1506). För en definitiv bedömning av om din verksamhet omfattas 
            rekommenderar vi att du konsulterar en jurist eller kontaktar relevant tillsynsmyndighet.
          </p>
        </div>
      </div>
    </div>
  );
}
