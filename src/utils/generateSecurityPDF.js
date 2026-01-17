import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Genererar en professionell PDF med säkerhetsåtgärder
 * @param {Object} assessment - Bedömningsresultat
 * @param {Array} measures - Array med säkerhetsåtgärder
 * @param {Object} answers - Användarens svar från formuläret
 */
export const generateSecurityPDF = (assessment, measures, answers = {}) => {
  // Skapa ny PDF (A4, portrait)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // === HEADER ===
  // Blå header-box
  doc.setFillColor(37, 99, 235); // primary blue
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  // Titel
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Cybersäkerhetslagen (2025:1506)', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Säkerhetsåtgärder för din verksamhet', pageWidth / 2, 30, { align: 'center' });

  yPosition = 55;

  // === METADATA ===
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const today = new Date().toLocaleDateString('sv-SE', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  doc.text(`Genererad: ${today}`, 20, yPosition);
  yPosition += 6;
  
  // Verksamhetstyp (baserat på svar)
  let businessType = 'Inte specificerad';
  if (answers.q1 === 'Ja') businessType = 'Statlig myndighet';
  else if (answers.q2 === 'Ja') businessType = 'Kommun/Region';
  else if (answers.q0 === 'Offentlig') businessType = 'Offentlig verksamhet';
  else if (answers.q0 === 'Privat') businessType = 'Privat verksamhet';
  
  doc.text(`Verksamhetstyp: ${businessType}`, 20, yPosition);
  yPosition += 10;

  // === BEDÖMNING ===
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Bedömning', 20, yPosition);
  yPosition += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  // Bedömningsresultat med färgkodning
  if (assessment.result === 'omfattas') {
    doc.setFillColor(220, 252, 231); // green-100
    doc.rect(20, yPosition - 5, pageWidth - 40, 20, 'F');
    doc.setTextColor(22, 101, 52); // green-800
  } else if (assessment.result === 'omfattas_ej') {
    doc.setFillColor(254, 242, 242); // red-100
    doc.rect(20, yPosition - 5, pageWidth - 40, 20, 'F');
    doc.setTextColor(153, 27, 27); // red-800
  } else {
    doc.setFillColor(254, 249, 195); // yellow-100
    doc.rect(20, yPosition - 5, pageWidth - 40, 20, 'F');
    doc.setTextColor(133, 77, 14); // yellow-800
  }
  
  doc.setFont('helvetica', 'bold');
  doc.text(assessment.message, 25, yPosition);
  yPosition += 6;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const splitDetails = doc.splitTextToSize(assessment.details, pageWidth - 50);
  doc.text(splitDetails, 25, yPosition);
  yPosition += splitDetails.length * 5 + 10;

  doc.setTextColor(0, 0, 0);

  // === SÄKERHETSÅTGÄRDER ===
  if (measures && measures.length > 0) {
    // Kontrollera om vi behöver ny sida
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Rekommenderade säkerhetsåtgärder', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Följande åtgärder rekommenderas för att uppfylla kraven i Cybersäkerhetslagen:', 20, yPosition);
    yPosition += 10;

    // Gruppera åtgärder efter kategori
    const groupedMeasures = {};
    measures.forEach(measure => {
      const category = measure.category || 'Övrigt';
      if (!groupedMeasures[category]) {
        groupedMeasures[category] = [];
      }
      groupedMeasures[category].push(measure);
    });

    // Rendera varje kategori
    Object.entries(groupedMeasures).forEach(([category, categoryMeasures]) => {
      // Kontrollera ny sida
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      }

      // Kategori-rubrik
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(37, 99, 235); // primary blue
      doc.text(category, 20, yPosition);
      yPosition += 7;

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');

      // Åtgärder i kategorin
      categoryMeasures.forEach((measure, index) => {
        // Kontrollera ny sida
        if (yPosition > pageHeight - 30) {
          doc.addPage();
          yPosition = 20;
        }

        // Bullet point
        doc.setFont('helvetica', 'bold');
        doc.text(`${index + 1}.`, 25, yPosition);
        
        // Titel
        const titleLines = doc.splitTextToSize(measure.title, pageWidth - 60);
        doc.text(titleLines, 33, yPosition);
        yPosition += titleLines.length * 5;

        // Beskrivning
        if (measure.description) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.setTextColor(75, 85, 99); // gray-600
          const descLines = doc.splitTextToSize(measure.description, pageWidth - 60);
          doc.text(descLines, 33, yPosition);
          yPosition += descLines.length * 4.5;
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(10);
        }

        yPosition += 3;
      });

      yPosition += 5; // Extra space mellan kategorier
    });
  }

  // === CHECKLISTA (om det finns tasks) ===
  const allTasks = measures.flatMap(m => m.tasks || []).filter(Boolean);
  
  if (allTasks.length > 0) {
    // Ny sida för checklista
    doc.addPage();
    yPosition = 20;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Checklista - Konkreta åtgärder', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Använd denna checklista för att implementera säkerhetsåtgärderna:', 20, yPosition);
    yPosition += 10;

    // Skapa tabell med autoTable
    const tableData = allTasks.map((task, index) => [
      `${index + 1}`,
      '☐', // Checkbox
      task,
      '' // Status/Anteckningar
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [['#', '✓', 'Åtgärd', 'Ansvarig/Datum']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10
      },
      bodyStyles: {
        fontSize: 9,
        cellPadding: 3
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 10, halign: 'center', fontSize: 12 },
        2: { cellWidth: 110 },
        3: { cellWidth: 40 }
      },
      margin: { left: 20, right: 20 }
    });

    yPosition = doc.lastAutoTable.finalY + 10;
  }

  // === FOOTER PÅ SISTA SIDAN ===
  const finalPageCount = doc.internal.getNumberOfPages();
  
  for (let i = 1; i <= finalPageCount; i++) {
    doc.setPage(i);
    
    // Sidnummer
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175); // gray-400
    doc.text(
      `Sida ${i} av ${finalPageCount}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Disclaimer på sista sidan
  doc.setPage(finalPageCount);
  yPosition = pageHeight - 35;

  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128); // gray-500
  doc.setFont('helvetica', 'italic');
  
  const disclaimer = 
    'Detta dokument är genererat baserat på dina svar och ger vägledning kring Cybersäkerhetslagen (2025:1506). ' +
    'För en definitiv bedömning och juridisk rådgivning rekommenderar vi att du konsulterar en jurist eller ' +
    'kontaktar relevant tillsynsmyndighet.';
  
  const disclaimerLines = doc.splitTextToSize(disclaimer, pageWidth - 40);
  doc.text(disclaimerLines, pageWidth / 2, yPosition, { align: 'center' });

  // === SPARA PDF ===
  const filename = `Cybersakerhetslagen_Sakerhetsatgarder_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
};

/**
 * Hämtar säkerhetsåtgärder baserat på bedömning
 * Denna funktion kan anpassas baserat på din SecurityMeasures-komponent
 */
export const getSecurityMeasures = () => {
  return [
    {
      category: '1. Riskhantering',
      title: 'Genomföra en riskanalys',
      description: 'Identifiera och bedöm cyberhot mot nätverks- och informationssystem.',
      tasks: [
        'Identifiera kritiska system och tillgångar',
        'Kartlägga potentiella hot och sårbarheter',
        'Bedöm sannolikhet och konsekvens för varje risk',
        'Dokumentera riskanalysen',
        'Uppdatera riskanalysen minst årligen'
      ]
    },
    {
      category: '2. Säkerhetspolicyer',
      title: 'Upprätta säkerhetspolicyer',
      description: 'Skapa och implementera policyer för informationssäkerhet.',
      tasks: [
        'Utarbeta övergripande säkerhetspolicy',
        'Definiera roller och ansvar för cybersäkerhet',
        'Skapa policy för åtkomstkontroll',
        'Upprätta policy för incidenthantering',
        'Kommunicera policyer till all personal'
      ]
    },
    {
      category: '3. Incidenthantering',
      title: 'Etablera rutiner för incidenthantering',
      description: 'Förmåga att upptäcka, hantera och rapportera säkerhetsincidenter.',
      tasks: [
        'Upprätta incidenthanteringsprocess',
        'Utse incidenthanteringsteam',
        'Skapa kontaktlistor för incidenter',
        'Definiera rapporteringsrutiner till tillsynsmyndighet',
        'Upprätta återställningsplaner',
        'Öva på incidenthantering minst årligen'
      ]
    },
    {
      category: '4. Kontinuitetshantering',
      title: 'Säkerställa kontinuitet och återställning',
      description: 'Plan för att upprätthålla verksamhet vid incidenter.',
      tasks: [
        'Upprätta kontinuitetsplan (BCP)',
        'Skapa backup-rutiner för kritisk data',
        'Testa återställning av system regelbundet',
        'Dokumentera kritiska beroenden',
        'Definiera återställningsmål (RTO/RPO)'
      ]
    },
    {
      category: '5. Säkerhet i leverantörskedjan',
      title: 'Hantera leverantörsrisker',
      description: 'Säkerställ säkerhet hos leverantörer och underleverantörer.',
      tasks: [
        'Kartlägga kritiska leverantörer',
        'Ställ säkerhetskrav på leverantörer',
        'Granska leverantörers säkerhetsåtgärder',
        'Upprätta avtal med säkerhetsklausuler',
        'Följ upp leverantörers efterlevnad'
      ]
    },
    {
      category: '6. Tekniska säkerhetsåtgärder',
      title: 'Implementera tekniska skyddsåtgärder',
      description: 'Tekniska kontroller för att skydda system och data.',
      tasks: [
        'Implementera brandväggar och nätverkssegmentering',
        'Aktivera multifaktorautentisering (MFA)',
        'Kryptera känslig data (både i vila och transit)',
        'Installera och uppdatera antivirusprogram',
        'Logga och övervaka systemaktivitet',
        'Genomför regelbundna säkerhetsuppdateringar'
      ]
    },
    {
      category: '7. Utbildning och medvetenhet',
      title: 'Utbilda personal i cybersäkerhet',
      description: 'Säkerställ att personal har kunskap om cyberhot.',
      tasks: [
        'Genomför säkerhetsutbildning för all personal',
        'Utbilda om nätfiske och social engineering',
        'Skapa riktlinjer för säkra arbetssätt',
        'Genomför regelbundna säkerhetsövningar',
        'Testa personalens medvetenhet (t.ex. simulerade nätfiskeattacker)'
      ]
    },
    {
      category: '8. Dokumentation och efterlevnad',
      title: 'Dokumentera åtgärder och efterlevnad',
      description: 'Upprätthåll dokumentation som krävs enligt lagen.',
      tasks: [
        'Dokumentera alla säkerhetsåtgärder',
        'Upprätta rutin för regelbunden översyn',
        'Förbered för tillsyn och revision',
        'Dokumentera incidenter och åtgärder',
        'Arkivera dokumentation enligt krav'
      ]
    }
  ];
};
