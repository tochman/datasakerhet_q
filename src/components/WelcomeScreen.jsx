import React, { useState, useEffect } from 'react';

export default function WelcomeScreen({ onStart }) {
  const [daysSinceLaw, setDaysSinceLaw] = useState(0);

  useEffect(() => {
    // Calculate days since the law went into effect (2026-01-15)
    const lawEffectiveDate = new Date('2026-01-15');
    const today = new Date();
    const diffTime = Math.abs(today - lawEffectiveDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysSinceLaw(diffDays);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Counter Section */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <div className="inline-block bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-sm px-4 sm:px-8 py-4 sm:py-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <div className="text-5xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-2 animate-bounce-once">
              {daysSinceLaw}
            </div>
            <div className="text-sm sm:text-base lg:text-lg font-semibold text-red-900 mb-1 max-w-md px-2">
              dagar sedan Cybersäkerhetslagen började gälla i Sverige
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-700 mt-3 sm:mt-4 tracking-wide">
              Är du beredd?
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block p-2 sm:p-3 bg-primary/10 rounded-full mb-4 sm:mb-6">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Omfattas din verksamhet av<br className="hidden sm:inline" /><span className="sm:hidden"> </span>Cybersäkerhetslagen?
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Få en snabb bedömning om din verksamhet omfattas av Cybersäkerhetslagen (2025:1506)
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Om lagen */}
          <div className="bg-white rounded-sm shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Om lagen
            </h2>
            <p className="text-gray-700 mb-4">
              Cybersäkerhetslagen (2025:1506) genomför EU:s NIS 2-direktiv i Sverige och ställer krav 
              på hög cybersäkerhet för viktiga samhällsfunktioner och digitala tjänster.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Ikrafttagen:</strong> 15 januari 2026
            </p>
          </div>

          {/* Vad kan du förvänta dig */}
          <div className="bg-white rounded-sm shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Vad händer nu?
            </h2>
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
        <div className="bg-white rounded-sm shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Vem är detta verktyg för?
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="mb-2">
                <svg className="w-12 h-12 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="text-sm font-medium">Företag och organisationer</p>
            </div>
            <div className="text-center">
              <div className="mb-2">
                <svg className="w-12 h-12 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <p className="text-sm font-medium">Offentliga verksamheter</p>
            </div>
            <div className="text-center">
              <div className="mb-2">
                <svg className="w-12 h-12 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <p className="text-sm font-medium">Digitala tjänsteleverantörer</p>
            </div>
            <div className="text-center">
              <div className="mb-2">
                <svg className="w-12 h-12 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm font-medium">Beslutsfattare & IT-ansvariga</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center animate-fade-in">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-dark hover:to-blue-700 text-white text-lg sm:text-xl font-bold rounded-sm shadow-2xl transition-all transform hover:scale-110 active:scale-95 hover:shadow-3xl w-full sm:w-auto justify-center"
            aria-label="Starta bedömning av Cybersäkerhetslagen"
          >
            Starta bedömning
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-gray-600 font-medium px-2">
            ⏱️ Tar ca 3-5 minuter • 🔒 Anonymt • ✨ Helt gratis
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-sm text-gray-700 flex items-start">
            <svg className="w-5 h-5 mr-2 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>
              <strong>Juridisk ansvarsfriskrivning:</strong> Detta verktyg ger vägledning baserat på 
              Cybersäkerhetslagen (2025:1506). För en definitiv bedömning av om din verksamhet omfattas 
              rekommenderar vi att du konsulterar en jurist eller kontaktar relevant tillsynsmyndighet.
            </span>
          </p>
        </div>

        {/* Attribution */}
        <div className="mt-6 text-center space-y-2">
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
    </div>
  );
}
