import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Genererar en professionell processbeskrivning för incidenthantering
 * Omfattande guide enligt best practice för cybersäkerhetsincidenter
 */
export const generateIncidentProcessPDF = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace = 40) => {
    if (yPosition > pageHeight - requiredSpace) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Helper to add section header
  const addSectionHeader = (title, size = 16) => {
    checkNewPage();
    doc.setFillColor(37, 99, 235);
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(size);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin + 5, yPosition + 7);
    yPosition += 15;
    doc.setTextColor(0, 0, 0);
  };

  // === COVER PAGE ===
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, pageWidth, 60, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('INCIDENTHANTERING', pageWidth / 2, 25, { align: 'center' });
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('Processbeskrivning och handbok', pageWidth / 2, 38, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text('Cybersäkerhetslagen (2025:1506)', pageWidth / 2, 50, { align: 'center' });

  yPosition = 80;
  doc.setTextColor(0, 0, 0);

  // Document info
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const today = new Date().toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Genererad: ${today}`, margin, yPosition);
  yPosition += 6;
  doc.text('Version: 1.0', margin, yPosition);
  yPosition += 20;

  // Table of contents
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('INNEHÅLL', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const toc = [
    '1. Processöversikt',
    '2. Fas 1: Upptäckt och rapportering',
    '3. Fas 2: Initial bedömning',
    '4. Fas 3: Klassificering och prioritering',
    '5. Fas 4: Aktivera incidentresponsteam',
    '6. Fas 5: Containment (Inneslutning)',
    '7. Fas 6: Eradication (Utrotning)',
    '8. Fas 7: Recovery (Återställning)',
    '9. Fas 8: Post-Incident Review',
    '10. Fas 9: Dokumentation och rapportering'
  ];

  toc.forEach(item => {
    doc.text(item, margin + 5, yPosition);
    yPosition += 6;
  });

  // === NEW PAGE - PROCESS OVERVIEW ===
  doc.addPage();
  yPosition = margin;

  addSectionHeader('1. PROCESSÖVERSIKT');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Incidenthanteringsprocessen består av nio faser som säkerställer systematisk', margin, yPosition);
  yPosition += 5;
  doc.text('hantering från upptäckt till avslut.', margin, yPosition);
  yPosition += 10;

  // Process flow
  doc.setFillColor(240, 240, 240);
  const flowSteps = [
    '1. UPPTÄCKT & RAPPORTERING',
    '2. INITIAL BEDÖMNING',
    '3. KLASSIFICERING',
    '4. AKTIVERA TEAM',
    '5. CONTAINMENT',
    '6. ERADICATION',
    '7. RECOVERY',
    '8. POST-INCIDENT REVIEW',
    '9. DOKUMENTATION'
  ];

  flowSteps.forEach((step, index) => {
    checkNewPage(15);
    doc.setFillColor(230, 240, 255);
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text(step, margin + 5, yPosition + 7);
    yPosition += 10;
    
    if (index < flowSteps.length - 1) {
      doc.setFont('helvetica', 'normal');
      doc.text('↓', pageWidth / 2, yPosition + 3, { align: 'center' });
      yPosition += 6;
    }
  });

  yPosition += 10;

  // === FAS 1: UPPTÄCKT ===
  doc.addPage();
  yPosition = margin;
  
  addSectionHeader('2. FAS 1: UPPTÄCKT OCH RAPPORTERING');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('Alla medarbetare + Övervakningssystem', margin + 25, yPosition);
  yPosition += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Aktiviteter:', margin, yPosition);
  yPosition += 6;

  const fas1Activities = [
    '• Händelse upptäcks (manuellt eller automatiskt)',
    '• Rapporteras via etablerade kanaler',
    '• Registreras i incidenthanteringssystem'
  ];

  doc.setFont('helvetica', 'normal');
  fas1Activities.forEach(act => {
    doc.text(act, margin + 5, yPosition);
    yPosition += 5;
  });

  yPosition += 5;
  doc.setFont('helvetica', 'bold');
  doc.text('Utdata:', margin, yPosition);
  yPosition += 6;
  doc.setFont('helvetica', 'normal');
  doc.text('• Händelserapport', margin + 5, yPosition);
  yPosition += 5;
  doc.text('• Incidentnummer tilldelas', margin + 5, yPosition);
  yPosition += 8;

  doc.setFillColor(255, 240, 240);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.text('Tidsgräns: Omedelbart vid upptäckt', margin + 5, yPosition + 7);
  yPosition += 15;

  // === FAS 2: INITIAL BEDÖMNING ===
  addSectionHeader('3. FAS 2: INITIAL BEDÖMNING');

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('IT-säkerhetsansvarig eller Jourhavande IT', margin + 25, yPosition);
  yPosition += 10;

  doc.setFont('helvetica', 'bold');
  doc.text('Beslutspunkt:', margin, yPosition);
  yPosition += 6;

  doc.setFillColor(255, 250, 205);
  doc.rect(margin, yPosition, (pageWidth - 2 * margin) / 2 - 2, 25, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.text('INTE EN INCIDENT', margin + 5, yPosition + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('→ Dokumentera', margin + 5, yPosition + 10);
  doc.text('→ Stäng ärende', margin + 5, yPosition + 14);
  doc.text('→ Återkoppla', margin + 5, yPosition + 18);

  doc.setFillColor(255, 200, 200);
  doc.rect(pageWidth / 2 + 2, yPosition, (pageWidth - 2 * margin) / 2 - 2, 25, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.text('ÄR EN INCIDENT', pageWidth / 2 + 7, yPosition + 5);
  doc.setFont('helvetica', 'normal');
  doc.text('→ Fortsätt till Fas 3', pageWidth / 2 + 7, yPosition + 10);
  doc.text('→ Klassificering', pageWidth / 2 + 7, yPosition + 14);

  doc.setFontSize(10);
  yPosition += 30;

  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 15, 'F');
  doc.setFont('helvetica', 'bold');
  doc.text('Tidsgräns:', margin + 5, yPosition + 6);
  doc.setFont('helvetica', 'normal');
  doc.text('Kritiska händelser: 15 minuter | Andra händelser: 2 timmar', margin + 5, yPosition + 11);
  yPosition += 20;

  // === FAS 3: KLASSIFICERING ===
  checkNewPage(80);
  addSectionHeader('4. FAS 3: KLASSIFICERING OCH PRIORITERING');

  doc.setFont('helvetica', 'bold');
  doc.text('Klassificeringsmatris:', margin, yPosition);
  yPosition += 8;

  // Severity table
  const severityData = [
    ['Nivå', 'Beskrivning', 'Responstid', 'Eskalering'],
    ['KRITISK', 'Omfattande påverkan på verksamheten', '15 min', 'HELA teamet + VD'],
    ['HÖG', 'Betydande påverkan på säkerhet', '30 min', 'Incidentteam + Ledning'],
    ['MEDEL', 'Begränsad påverkan', '1 timme', 'IT-säkerhet + IT-drift'],
    ['LÅG', 'Minimal påverkan', '4 timmar', 'IT-drift enligt rutin']
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [severityData[0]],
    body: severityData.slice(1),
    theme: 'grid',
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    columnStyles: {
      0: { cellWidth: 25, fontStyle: 'bold' },
      1: { cellWidth: 60 },
      2: { cellWidth: 25 },
      3: { cellWidth: 50 }
    }
  });

  yPosition = doc.lastAutoTable.finalY + 10;

  // Incident types
  doc.setFont('helvetica', 'bold');
  doc.text('Vanliga incidenttyper:', margin, yPosition);
  yPosition += 6;

  const incidentTypes = [
    '• Malware/Ransomware',
    '• Phishing och social engineering',
    '• Intrång och obehörig åtkomst',
    '• DDoS-attacker',
    '• Dataläckage',
    '• Insiderhot',
    '• Brott mot integritet'
  ];

  doc.setFont('helvetica', 'normal');
  incidentTypes.forEach(type => {
    doc.text(type, margin + 5, yPosition);
    yPosition += 5;
  });

  // === FAS 4: AKTIVERA TEAM ===
  doc.addPage();
  yPosition = margin;
  
  addSectionHeader('5. FAS 4: AKTIVERA INCIDENTRESPONSTEAM');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('För KRITISKA och HÖGA incidenter aktiveras det fullständiga incidentresponsteamet.', margin, yPosition);
  yPosition += 10;

  doc.setFont('helvetica', 'bold');
  doc.text('Första mötet - Agenda (30 min):', margin, yPosition);
  yPosition += 6;

  const meetingAgenda = [
    '1. Situationsöversikt (5 min)',
    '2. Bekräfta klassificering (5 min)',
    '3. Tilldela specifika uppgifter (10 min)',
    '4. Beslut om omedelbara åtgärder (10 min)'
  ];

  doc.setFont('helvetica', 'normal');
  meetingAgenda.forEach(item => {
    doc.text(item, margin + 5, yPosition);
    yPosition += 5;
  });

  yPosition += 5;
  doc.setFont('helvetica', 'bold');
  doc.text('War Room:', margin, yPosition);
  yPosition += 6;
  doc.setFont('helvetica', 'normal');
  doc.text('• Fysisk plats: Konferensrum X', margin + 5, yPosition);
  yPosition += 5;
  doc.text('• Virtuell plats: Teams/Zoom', margin + 5, yPosition);
  yPosition += 5;
  doc.text('• Delad dokumentation: SharePoint/Drive', margin + 5, yPosition);
  yPosition += 10;

  // === FAS 5: CONTAINMENT ===
  addSectionHeader('6. FAS 5: CONTAINMENT (INNESLUTNING)');

  doc.setFont('helvetica', 'bold');
  doc.text('Mål:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('Stoppa spridning och begränsa ytterligare skada', margin + 15, yPosition);
  yPosition += 10;

  // Containment actions table
  const containmentData = [
    ['Incidenttyp', 'Containment-åtgärder'],
    ['Malware/\nRansomware', '• Isolera drabbade system från nätverk\n• Blockera skadliga IP-adresser\n• Inaktivera smittade användarkonton'],
    ['Phishing', '• Blockera avsändar-adress\n• Ta bort e-post från alla brevlådor\n• Återställ komprometterade lösenord'],
    ['Intrång', '• Inaktivera komprometterade konton\n• Ändra alla privilegierade lösenord\n• Isolera påverkade segment'],
    ['DDoS', '• Aktivera DDoS-skydd\n• Kontakta ISP/CDN-leverantör\n• Implementera rate limiting']
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [containmentData[0]],
    body: containmentData.slice(1),
    theme: 'grid',
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    columnStyles: {
      0: { cellWidth: 40, fontStyle: 'bold' },
      1: { cellWidth: 120 }
    }
  });

  yPosition = doc.lastAutoTable.finalY + 10;

  // Evidence preservation
  doc.setFillColor(255, 240, 200);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 35, 'F');
  doc.setFont('helvetica', 'bold');
  doc.text('VIKTIGT - Bevara bevis INNAN containment:', margin + 5, yPosition + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const evidence = [
    '✓ Ta minnesdump (RAM dump) av drabbade system',
    '✓ Ta disk-images/snapshots',
    '✓ Säkra loggar',
    '✓ Ta skärmdumpar',
    '✓ Dokumentera nätverksanslutningar'
  ];
  let evidenceY = yPosition + 11;
  evidence.forEach(item => {
    doc.text(item, margin + 8, evidenceY);
    evidenceY += 4;
  });

  doc.setFontSize(10);
  yPosition += 40;

  // === FAS 6: ERADICATION ===
  doc.addPage();
  yPosition = margin;
  
  addSectionHeader('7. FAS 6: ERADICATION (UTROTNING)');

  doc.setFont('helvetica', 'bold');
  doc.text('Mål:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('Ta bort hotet helt från miljön', margin + 15, yPosition);
  yPosition += 10;

  doc.setFont('helvetica', 'bold');
  doc.text('Identifiera grundorsaken:', margin, yPosition);
  yPosition += 6;
  doc.setFont('helvetica', 'normal');

  const rootCause = [
    '• Hur kom angriparen in?',
    '• Vilken sårbarhet utnyttjades?',
    '• Finns bakdörrar installerade?',
    '• Finns persistent åtkomst kvar?'
  ];

  rootCause.forEach(q => {
    doc.text(q, margin + 5, yPosition);
    yPosition += 5;
  });

  yPosition += 5;
  doc.setFont('helvetica', 'bold');
  doc.text('Verifiera utrotning:', margin, yPosition);
  yPosition += 6;
  doc.setFont('helvetica', 'normal');

  const verification = [
    '✓ Ingen skadlig aktivitet kvar',
    '✓ Alla indicators of compromise (IoC) är borta',
    '✓ Inga obehöriga konton finns',
    '✓ Övervakning visar inga misstänkta aktiviteter'
  ];

  verification.forEach(item => {
    doc.text(item, margin + 5, yPosition);
    yPosition += 5;
  });

  // === FAS 7: RECOVERY ===
  yPosition += 10;
  addSectionHeader('8. FAS 7: RECOVERY (ÅTERSTÄLLNING)');

  doc.setFont('helvetica', 'bold');
  doc.text('Mål:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('Återställa normal drift på ett säkert sätt', margin + 15, yPosition);
  yPosition += 10;

  doc.setFont('helvetica', 'bold');
  doc.text('Återställningsordning:', margin, yPosition);
  yPosition += 6;

  doc.setFillColor(230, 240, 255);
  const recoverySteps = [
    '1. Kritiska infrastrukturtjänster (AD, DNS, nätverk)',
    '2. Kärnaffärssystem (ERP, produktionssystem)',
    '3. Stödsystem (e-post, filservrar)',
    '4. Mindre kritiska system'
  ];

  recoverySteps.forEach(step => {
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
    doc.setFont('helvetica', 'normal');
    doc.text(step, margin + 5, yPosition + 5);
    yPosition += 8;
    if (step !== recoverySteps[recoverySteps.length - 1]) {
      doc.text('↓', pageWidth / 2, yPosition + 2, { align: 'center' });
      yPosition += 4;
    }
  });

  yPosition += 10;

  doc.setFont('helvetica', 'bold');
  doc.text('Stegvis återställning:', margin, yPosition);
  yPosition += 6;
  doc.setFont('helvetica', 'normal');
  doc.text('STEG 1: Återställ i isolerad miljö → Testa funktionalitet', margin + 5, yPosition);
  yPosition += 5;
  doc.text('STEG 2: Återställ i produktion (begränsat) → Pilot med små grupper', margin + 5, yPosition);
  yPosition += 5;
  doc.text('STEG 3: Fullständig återställning → Öppna för alla användare', margin + 5, yPosition);
  yPosition += 10;

  doc.setFillColor(240, 255, 240);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.text('Förstärkt övervakning: 2-4 veckor efter återställning', margin + 5, yPosition + 7);
  yPosition += 15;

  // === FAS 8: POST-INCIDENT REVIEW ===
  addSectionHeader('9. FAS 8: POST-INCIDENT REVIEW');

  doc.setFont('helvetica', 'bold');
  doc.text('Mål:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('Lära av incidenten och förbättra säkerheten', margin + 15, yPosition);
  yPosition += 10;

  doc.setFont('helvetica', 'bold');
  doc.text('Tidpunkt för review:', margin, yPosition);
  yPosition += 6;
  doc.setFont('helvetica', 'normal');
  doc.text('• KRITISKA: Inom 1 vecka', margin + 5, yPosition);
  yPosition += 5;
  doc.text('• HÖGA: Inom 2 veckor', margin + 5, yPosition);
  yPosition += 5;
  doc.text('• MEDEL/LÅG: Kvartalsvis sammanställning', margin + 5, yPosition);
  yPosition += 10;

  doc.setFont('helvetica', 'bold');
  doc.text('Agenda för review-möte (2-3 timmar):', margin, yPosition);
  yPosition += 6;

  const reviewAgenda = [
    'Del 1: Faktainsamling (30 min)',
    '  • Vad hände? (tidslinje)',
    '  • Hur upptäcktes det?',
    '  • Hur hanterades det?',
    '',
    'Del 2: Grundorsaksanalys (45 min)',
    '  • Varför hände det?',
    '  • Vilka sårbarheter utnyttjades?',
    '  • Vilka kontroller misslyckades?',
    '',
    'Del 3: Förbättringsförslag (45 min)',
    '  • Vad fungerade bra?',
    '  • Vad kan förbättras?',
    '  • Konkreta åtgärder'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  reviewAgenda.forEach(item => {
    doc.text(item, margin + 5, yPosition);
    yPosition += 4;
  });

  doc.setFontSize(10);

  // === FAS 9: DOKUMENTATION ===
  doc.addPage();
  yPosition = margin;
  
  addSectionHeader('10. FAS 9: DOKUMENTATION OCH RAPPORTERING');

  doc.setFont('helvetica', 'bold');
  doc.text('Rapporteringsfrister enligt Cybersäkerhetslagen:', margin, yPosition);
  yPosition += 8;

  const reportingData = [
    ['Typ', 'Tidsfrist', 'Innehåll'],
    ['Tidig varning', 'Inom 24 timmar', 'Kort beskrivning av incident'],
    ['Incidentrapport', 'Inom 72 timmar', 'Detaljerad rapport om händelse'],
    ['Slutrapport', 'Inom 1 månad', 'Fullständig analys och åtgärder']
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [reportingData[0]],
    body: reportingData.slice(1),
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    columnStyles: {
      0: { cellWidth: 40, fontStyle: 'bold' },
      1: { cellWidth: 40 },
      2: { cellWidth: 80 }
    }
  });

  yPosition = doc.lastAutoTable.finalY + 10;

  doc.setFont('helvetica', 'bold');
  doc.text('Dokumentation ska innehålla:', margin, yPosition);
  yPosition += 6;

  const docContent = [
    '✓ Komplett tidslinje',
    '✓ Klassificering och bedömning',
    '✓ Vidtagna åtgärder',
    '✓ Grundorsaksanalys',
    '✓ Påverkan på verksamheten',
    '✓ Kostnader (om tillämpligt)',
    '✓ Förbättringsåtgärder',
    '✓ Lessons learned'
  ];

  doc.setFont('helvetica', 'normal');
  docContent.forEach(item => {
    doc.text(item, margin + 5, yPosition);
    yPosition += 5;
  });

  // === FOOTER ===
  yPosition = pageHeight - 25;
  doc.setFillColor(240, 240, 240);
  doc.rect(0, yPosition, pageWidth, 25, 'F');
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text('Detta dokument är en mall och bör anpassas efter er verksamhets specifika behov.', margin, yPosition + 8);
  doc.text('För frågor om incidenthantering enligt Cybersäkerhetslagen, kontakta MSB eller er juridiska rådgivare.', margin, yPosition + 13);

  // Generate and download
  doc.save(`Incidenthantering_Processbeskrivning_${new Date().toISOString().split('T')[0]}.pdf`);
};
