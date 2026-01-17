import React from 'react';
import { generateIncidentReportPDF } from '../utils/generateIncidentReportPDF';
import { generateIncidentProcessPDF } from '../utils/generateIncidentProcessPDF';
import { supabase } from '../lib/supabaseClient';

export default function TemplateDownloads({ assessment, answers, handleDownloadPDF, trackPDFDownload }) {
  const trackDownload = async (templateName) => {
    if (trackPDFDownload) {
      await trackPDFDownload(templateName);
    } else {
      try {
        await supabase.from('pdf_downloads').insert({
          template_name: templateName,
          downloaded_at: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error tracking download:', error);
      }
    }
  };

  // Personalized recommendations (if available)
  const personalizedTemplate = assessment && answers ? {
    id: 'security-recommendations',
    title: 'Dina Säkerhetsrekommendationer',
    subtitle: 'Personaliserad bedömning',
    description: 'Skräddarsydd PDF baserad på din bedömning. Innehåller specifika rekommendationer för just din verksamhet enligt Cybersäkerhetslagen.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'blue',
    contains: [
      'Bedömningsresultat med färgkodning',
      'MCFFS 2026:1 klassificering (väsentlig/viktig)',
      'Rekommenderade säkerhetsåtgärder',
      'Checklista för implementering',
      'Tidsfrister för incidentrapportering',
      'Verksamhetstyp och metadata'
    ],
    note: {
      title: 'Automatiskt genererad:',
      items: [
        'Denna PDF skapas unikt för dig baserat på dina svar och bedömning.'
      ]
    },
    generatePDF: handleDownloadPDF
  } : null;

  const staticTemplates = [
    {
      id: 'incident-report',
      title: 'Händelserapport',
      subtitle: 'Mall för incidentdokumentation',
      description: 'Innehåller alla nödvändiga fält för rapportering enligt Cybersäkerhetslagen.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'red',
      contains: [
        'Grundläggande information (datum, rapportör)',
        'Beskrivning av händelsen',
        'Påverkade system (checkboxar)',
        'Bevis och dokumentation',
        'Vidtagna åtgärder',
        'Allvarlighetsgrad (kritisk/hög/medel/låg)',
        'Rapporteringsfrister enligt lagen'
      ],
      note: {
        title: 'Rapporteringsfrister:',
        items: [
          'Tidig varning: 24 timmar',
          'Incidentrapport: 72 timmar',
          'Slutrapport: Inom 1 månad'
        ]
      },
      generatePDF: generateIncidentReportPDF
    },
    {
      id: 'incident-process',
      title: 'Processbeskrivning',
      subtitle: 'Incidenthantering',
      description: 'Komplett guide för incidenthantering enligt best practice. Omfattande processbeskrivning med alla nio faser från upptäckt till avslut.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      color: 'indigo',
      contains: [
        'Processöversikt med alla 9 faser',
        'Detaljerade aktiviteter per fas',
        'Klassificeringsmatris (Kritisk/Hög/Medel/Låg)',
        'Containment-åtgärder per incidenttyp',
        'Återställningsordning och RTO',
        'Post-incident review process',
        'Rapporteringsfrister enligt lagen',
        'Tabeller och checklistor'
      ],
      note: {
        title: 'De 9 faserna:',
        items: [
          'Upptäckt → Bedömning → Klassificering → Aktivera team → Containment → Eradication → Recovery → Review → Dokumentation'
        ]
      },
      generatePDF: generateIncidentProcessPDF
    }
  ];

  return (
    <div className="bg-white rounded-sm shadow-lg p-6 sm:p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center">
          <svg className="w-8 h-8 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Ladda ner mallar och rekommendationer
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Börja med att ladda ner din personaliserade säkerhetsrapport, sedan kan du ladda ner våra praktiska mallar för incidenthantering.
        </p>
      </div>

      {/* Personalized Template - Featured */}
      {personalizedTemplate && (
        <div className="mb-8 border-4 border-primary/20 rounded-sm overflow-hidden shadow-xl">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <div className="flex items-center mb-3">
              <div className="mr-4">
                {personalizedTemplate.icon}
              </div>
              <div>
                <div className="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded mb-2">
                  DIN RAPPORT
                </div>
                <h3 className="text-2xl font-bold">{personalizedTemplate.title}</h3>
                <p className="text-sm opacity-90">{personalizedTemplate.subtitle}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-blue-50">
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Beskrivning</h4>
              <p className="text-gray-600 text-sm">
                {personalizedTemplate.description}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Innehåller</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {personalizedTemplate.contains.map((item, idx) => (
                  <li key={idx}>✓ {item}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4 p-3 bg-blue-100 rounded border border-blue-300">
              <p className="text-xs text-blue-900">
                <strong>{personalizedTemplate.note.title}</strong><br/>
                {personalizedTemplate.note.items.map((item, idx) => (
                  <span key={idx}>{item}<br/></span>
                ))}
              </p>
            </div>

            <button
              onClick={async () => {
                await personalizedTemplate.generatePDF();
              }}
              className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-sm shadow-lg transition-colors flex items-center justify-center"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Ladda ner din säkerhetsrapport
            </button>
          </div>
        </div>
      )}

      {/* Static Templates - Side by Side */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Ytterligare mallar</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-6">{staticTemplates.map((template) => {
          const colorClasses = {
            red: {
              gradient: 'from-red-600 to-red-700',
              bgLight: 'bg-red-50',
              borderLight: 'border-red-200',
              textDark: 'text-red-800',
              button: 'bg-red-600 hover:bg-red-700',
              icon: 'text-white'
            },
            indigo: {
              gradient: 'from-indigo-600 to-indigo-700',
              bgLight: 'bg-indigo-50',
              borderLight: 'border-indigo-200',
              textDark: 'text-indigo-800',
              button: 'bg-indigo-600 hover:bg-indigo-700',
              icon: 'text-white'
            }
          };
          
          const colors = colorClasses[template.color];
          
          return (
            <div 
              key={template.id}
              className="bg-white rounded-sm shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${colors.gradient} p-6 text-white`}>
                <div className="flex items-center mb-3">
                  <div className="mr-4">
                    {template.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{template.title}</h3>
                    <p className="text-sm opacity-90">{template.subtitle}</p>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Beskrivning</h4>
                  <p className="text-gray-600 text-sm">
                    {template.description}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Innehåller</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {template.contains.map((item, idx) => (
                      <li key={idx}>✓ {item}</li>
                    ))}
                  </ul>
                </div>

                <div className={`mb-4 p-3 ${colors.bgLight} rounded border ${colors.borderLight}`}>
                  <p className={`text-xs ${colors.textDark}`}>
                    <strong>{template.note.title}</strong><br/>
                    {template.note.items.map((item, idx) => (
                      <span key={idx}>• {item}<br/></span>
                    ))}
                  </p>
                </div>

                <button
                  onClick={async () => {
                    await trackDownload(template.title);
                    await template.generatePDF();
                  }}
                  className={`w-full px-4 py-3 ${colors.button} text-white font-semibold rounded-sm shadow transition-colors flex items-center justify-center`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Ladda ner {template.title.toLowerCase()}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to action for more templates */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-50 border-2 border-primary/20 rounded-sm p-6 text-center mt-8">
        <div className="flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900">
            Behöver ni fler mallar eller skräddarsydda lösningar?
          </h3>
        </div>
        <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
          Vi har fler mallar och kan hjälpa er med skräddarsydda policydokument, 
          riskbedömningar, och implementeringsstöd för Cybersäkerhetslagen. 
        </p>
        <a
          href="#kontakt"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-sm shadow-md transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Kontakta oss
        </a>
      </div>
      </div>
    </div>
  );
}
