import jsPDF from 'jspdf';

/**
 * Genererar en ifyllbar händelserapport-PDF enligt Cybersäkerhetslagen
 * Användare kan skriva ut och fylla i manuellt eller redigera digitalt
 */
export const generateIncidentReportPDF = () => {
  // Skapa ny PDF (A4, portrait)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (2 * margin);
  let yPosition = margin;

  // === HEADER ===
  doc.setFillColor(37, 99, 235); // primary blue
  doc.rect(0, 0, pageWidth, 35, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('HÄNDELSERAPPORT', pageWidth / 2, 15, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Cybersäkerhetsincident - Rapportmall', pageWidth / 2, 25, { align: 'center' });

  yPosition = 50;
  doc.setTextColor(0, 0, 0);

  // === INSTRUKTIONER ===
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text('Fyll i denna rapport så snart en cybersäkerhetsincident upptäcks. Spara eller skriv ut för dokumentation.', margin, yPosition);
  yPosition += 10;
  doc.setTextColor(0, 0, 0);

  // === GRUNDLÄGGANDE INFORMATION ===
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('GRUNDLÄGGANDE INFORMATION', margin, yPosition);
  yPosition += 8;

  // Datum/Tid
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Datum/Tid för upptäckt:', margin, yPosition);
  yPosition += 2;
  doc.setFont('helvetica', 'normal');
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  // Rapporterad av
  doc.setFont('helvetica', 'bold');
  doc.text('Rapporterad av:', margin, yPosition);
  yPosition += 2;
  doc.setFont('helvetica', 'normal');
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  // Kontaktuppgifter
  doc.setFont('helvetica', 'bold');
  doc.text('Kontaktuppgifter (telefon/e-post):', margin, yPosition);
  yPosition += 2;
  doc.setFont('helvetica', 'normal');
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 12;

  // === BESKRIVNING ===
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('BESKRIVNING AV HÄNDELSEN', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text('Beskriv vad som hänt med egna ord. Inkludera: När upptäcktes det? Vad observerades? Hur upptäcktes det?', margin, yPosition);
  yPosition += 5;
  doc.setTextColor(0, 0, 0);

  // Beskrivningsbox
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(250, 250, 250);
  doc.rect(margin, yPosition, contentWidth, 35, 'FD');
  yPosition += 40;

  // === PÅVERKADE SYSTEM ===
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('PÅVERKADE SYSTEM', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  // Checkboxar för påverkade system
  const systems = [
    'Arbetsstation/laptop (vilken?): _______________________',
    'Server/tjänst (vilken?): _______________________',
    'Nätverk/internet',
    'E-post',
    'Molntjänster/SaaS',
    'Databaser',
    'Annat: _______________________'
  ];

  systems.forEach(system => {
    // Rita checkbox
    doc.rect(margin, yPosition - 3, 4, 4, 'D');
    doc.text(system, margin + 7, yPosition);
    yPosition += 6;
  });

  yPosition += 5;

  // === BEVIS ===
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('BEVIS OCH DOKUMENTATION', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text('Bifoga eller ange var följande finns sparade (viktigt för utredning):', margin, yPosition);
  yPosition += 5;
  doc.setTextColor(0, 0, 0);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const evidence = [
    'Skärmdumpar',
    'E-postmeddelanden (headers och innehåll)',
    'Loggfiler',
    'Nätverkstrafikloggar',
    'Felmeddelanden',
    'Annat: _______________________'
  ];

  evidence.forEach(item => {
    doc.rect(margin, yPosition - 3, 4, 4, 'D');
    doc.text(item, margin + 7, yPosition);
    yPosition += 6;
  });

  yPosition += 5;

  // === NY SIDA OM NÖDVÄNDIGT ===
  if (yPosition > pageHeight - 80) {
    doc.addPage();
    yPosition = margin;
  }

  // === VIDTAGNA ÅTGÄRDER ===
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('REDAN VIDTAGNA ÅTGÄRDER', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text('Vad har du redan gjort? T.ex. stängt av system, isolerat nätverk, bytt lösenord, etc.', margin, yPosition);
  yPosition += 5;
  doc.setTextColor(0, 0, 0);

  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(250, 250, 250);
  doc.rect(margin, yPosition, contentWidth, 30, 'FD');
  yPosition += 35;

  // === ALLVARLIGHETSGRAD ===
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('ALLVARLIGHETSGRAD', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text('Din bedömning av hur allvarlig händelsen är:', margin, yPosition);
  yPosition += 5;
  doc.setTextColor(0, 0, 0);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  // Allvarlighetsgrader med färgkodning
  const severity = [
    { level: '🔴 KRITISK', desc: 'Omedelbar åtgärd krävs! Omfattande påverkan på verksamheten.', color: [220, 38, 38] },
    { level: '🟠 HÖG', desc: 'Brådskande åtgärd. Betydande påverkan på säkerhet eller verksamhet.', color: [249, 115, 22] },
    { level: '🟡 MEDEL', desc: 'Åtgärd inom kort. Begränsad påverkan.', color: [234, 179, 8] },
    { level: '🟢 LÅG', desc: 'Kan hanteras i normal ordning.', color: [34, 197, 94] }
  ];

  severity.forEach(sev => {
    // Checkbox
    doc.rect(margin, yPosition - 3, 4, 4, 'D');
    
    // Level text
    doc.setFont('helvetica', 'bold');
    doc.text(sev.level, margin + 7, yPosition);
    
    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(sev.desc, margin + 7, yPosition + 4);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    
    yPosition += 10;
  });

  yPosition += 5;

  // === ÖVRIG INFORMATION ===
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('ÖVRIG INFORMATION', margin, yPosition);
  yPosition += 8;

  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(250, 250, 250);
  doc.rect(margin, yPosition, contentWidth, 25, 'FD');
  yPosition += 30;

  // === FOOTER MED VÄGLEDNING ===
  yPosition = pageHeight - 30;
  doc.setFillColor(240, 240, 240);
  doc.rect(0, yPosition - 5, pageWidth, 30, 'F');
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('VIKTIGT - Rapporteringsfrister enligt Cybersäkerhetslagen:', margin, yPosition);
  yPosition += 5;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const instructions = [
    '• Tidig varning: Utan onödigt dröjsmål, senast 24 timmar efter kännedom om betydande incident',
    '• Incidentrapport: Senast 72 timmar efter kännedom',
    '• Slutrapport: Inom en månad efter incidentrapporten, om tillsynsmyndigheten begär det'
  ];
  
  instructions.forEach(instr => {
    doc.text(instr, margin, yPosition);
    yPosition += 4;
  });

  // === GENERERA OCH LADDA NER ===
  const today = new Date().toISOString().split('T')[0];
  doc.save(`Händelserapport_${today}.pdf`);
};
