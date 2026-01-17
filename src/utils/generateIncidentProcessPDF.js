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

  addSectionHeader('1. PROCESSÖVERSIKT', 18);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Incidenthanteringsprocessen består av nio faser som säkerställer systematisk', margin, yPosition);
  yPosition += 5;
  doc.text('hantering från upptäckt till avslut.', margin, yPosition);
  yPosition += 12;

  // Process flow with descriptions
  const flowSteps = [
    { num: '1', title: 'UPPTÄCKT & RAPPORTERING', desc: 'Händelse upptäcks och rapporteras omedelbart' },
    { num: '2', title: 'INITIAL BEDÖMNING', desc: 'Verifiera om det är en incident' },
    { num: '3', title: 'KLASSIFICERING', desc: 'Bedöm allvarlighetsgrad och prioritera' },
    { num: '4', title: 'AKTIVERA TEAM', desc: 'Kalla in incidentresponsteam' },
    { num: '5', title: 'CONTAINMENT', desc: 'Stoppa spridning och begränsa skada' },
    { num: '6', title: 'ERADICATION', desc: 'Ta bort hotet från miljön' },
    { num: '7', title: 'RECOVERY', desc: 'Återställ normal drift säkert' },
    { num: '8', title: 'POST-INCIDENT REVIEW', desc: 'Lär av incidenten' },
    { num: '9', title: 'DOKUMENTATION', desc: 'Rapportera enligt lagen' }
  ];

  flowSteps.forEach((step, index) => {
    checkNewPage(20);
    // Light blue box
    doc.setFillColor(225, 235, 250);
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 15, 'F');
    doc.setDrawColor(100, 150, 220);
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 15, 'D');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`${step.num}. ${step.title}`, margin + 5, yPosition + 6);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text(step.desc, margin + 5, yPosition + 11);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    
    yPosition += 15;
    
    if (index < flowSteps.length - 1) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('↓', pageWidth / 2, yPosition + 4, { align: 'center' });
      yPosition += 8;
    }
  });

  yPosition += 10;

  // === FAS 1: UPPTÄCKT ===
  doc.addPage();
  yPosition = margin;
  
  addSectionHeader('2. FAS 1: UPPTÄCKT OCH RAPPORTERING', 16);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('Alla medarbetare + Övervakningssystem', margin + 25, yPosition);
  yPosition += 10;

  // Description paragraph
  doc.setFont('helvetica', 'normal');
  const fas1Desc = [
    'Den första fasen i incidenthantering är upptäckt och rapportering. Alla medarbetare har ett',
    'ansvar att rapportera misstänkta säkerhetshändelser omedelbart. Upptäckt kan ske både',
    'manuellt (användare observerar något ovanligt) och automatiskt genom övervakningssystem.'
  ];
  fas1Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 5;

  doc.setFont('helvetica', 'bold');
  doc.text('Aktiviteter:', margin, yPosition);
  yPosition += 6;

  const fas1Activities = [
    '• Händelse upptäcks (manuellt eller automatiskt)',
    '• Rapporteras via etablerade kanaler (telefon, e-post, incidentsystem)',
    '• Registreras i incidenthanteringssystem med unikt incidentnummer'
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
  doc.text('• Händelserapport skapad', margin + 5, yPosition);
  yPosition += 5;
  doc.text('• Incidentnummer tilldelas automatiskt', margin + 5, yPosition);
  yPosition += 10;

  // Time constraint box
  doc.setFillColor(255, 240, 240);
  doc.setDrawColor(220, 38, 38);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 12, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(139, 0, 0);
  doc.text('Tidsgräns: Omedelbart vid upptäckt', margin + 5, yPosition + 8);
  doc.setTextColor(0, 0, 0);
  yPosition += 17;

  // === FAS 2: INITIAL BEDÖMNING ===
  addSectionHeader('3. FAS 2: INITIAL BEDÖMNING', 16);

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('IT-säkerhetsansvarig eller Jourhavande IT', margin + 25, yPosition);
  yPosition += 10;

  // Description
  const fas2Desc = [
    'I denna fas verifieras om den rapporterade händelsen verkligen är en säkerhetsincident.',
    'En incident definieras som en händelse som hotar konfidentialitet, integritet eller tillgänglighet',
    'i IT-system eller data. Beslutet om att klassificera som incident eller inte är kritiskt.'
  ];
  fas2Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Beslutspunkt:', margin, yPosition);
  yPosition += 8;
  doc.setFontSize(10);

  // Decision boxes side by side
  const boxWidth = (pageWidth - 2 * margin - 6) / 2;
  
  // Yellow box - NOT an incident
  doc.setFillColor(255, 250, 205);
  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.5);
  doc.rect(margin, yPosition, boxWidth, 35, 'FD');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('INTE EN INCIDENT', margin + 5, yPosition + 7);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('→ Dokumentera', margin + 5, yPosition + 14);
  doc.text('→ Stäng ärende', margin + 5, yPosition + 19);
  doc.text('→ Återkoppla', margin + 5, yPosition + 24);

  // Red box - IS an incident
  doc.setFillColor(255, 220, 220);
  doc.setDrawColor(220, 38, 38);
  doc.rect(margin + boxWidth + 6, yPosition, boxWidth, 35, 'FD');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('ÄR EN INCIDENT', margin + boxWidth + 11, yPosition + 7);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('→ Fortsätt till Fas 3', margin + boxWidth + 11, yPosition + 14);
  doc.text('→ Klassificering', margin + boxWidth + 11, yPosition + 19);

  yPosition += 40;
  doc.setFontSize(10);

  // Time constraint box
  doc.setFillColor(245, 245, 245);
  doc.setDrawColor(150, 150, 150);
  doc.setLineWidth(0.3);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 18, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.text('Tidsgräns:', margin + 5, yPosition + 7);
  doc.setFont('helvetica', 'normal');
  doc.text('Kritiska händelser: 15 minuter', margin + 5, yPosition + 13);
  doc.text('Andra händelser: 2 timmar', margin + 80, yPosition + 13);
  yPosition += 23;

  // === FAS 3: KLASSIFICERING ===
  checkNewPage(80);
  addSectionHeader('4. FAS 3: KLASSIFICERING OCH PRIORITERING', 16);

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('Incidenthanteringsteam', margin + 25, yPosition);
  yPosition += 10;

  // Description
  const fas3Desc = [
    'Efter att en incident har bekräftats ska den klassificeras baserat på påverkan och spridning.',
    'Klassificeringen avgör resurstilldelning, eskaleringsvägar och rapporteringskrav enligt NIS2.',
    'Använd matrisen nedan för att bestämma allvarlighetsgrad.'
  ];
  fas3Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Klassificeringsmatris:', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

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
  
  addSectionHeader('5. FAS 4: AKTIVERA INCIDENTRESPONSTEAM', 16);

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('Incidentansvarig', margin + 25, yPosition);
  yPosition += 10;

  // Description
  const fas4Desc = [
    'För kritiska och höga incidenter måste det fullständiga incidentresponsteamet aktiveras omedelbart.',
    'Ett war room etableras som fysisk eller virtuell mötesplats där teamet samlas för samordning.',
    'Kommunikation centraliseras och roller fördelas enligt RACI-modell för tydligt ansvar.'
  ];
  fas4Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Första mötet - Agenda (30 min):', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

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
  addSectionHeader('6. FAS 5: CONTAINMENT (INNESLUTNING)', 16);

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('IT-drift i samråd med IT-säkerhet', margin + 25, yPosition);
  yPosition += 10;

  // Description
  const fas5Desc = [
    'Containment-fasen fokuserar på att stoppa spridning och begränsa ytterligare skada från incidenten.',
    'Målet är att isolera drabbade system utan att förstöra bevis. Åtgärder måste vara snabba men genomtänkta.',
    'Dokumentera varje steg noggrant för senare analys och eventuell rättslig process.'
  ];
  fas5Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 8;

  // Critical warning box
  doc.setFillColor(255, 250, 205);
  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.5);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 16, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('⚠ VIKTIGT - Bevara bevis INNAN containment', margin + 5, yPosition + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Ta minnesbilder, nätverksdumpar och systemloggar INNAN system stängs av eller isoleras', margin + 5, yPosition + 12);
  yPosition += 21;
  doc.setFontSize(10);

  doc.setFont('helvetica', 'bold');
  doc.text('Containment-åtgärder:', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');
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

  // === FAS 6: ERADICATION ===
  doc.addPage();
  yPosition = margin;
  
  addSectionHeader('7. FAS 6: ERADICATION (UTROTNING)', 16);

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('IT-säkerhet med stöd från IT-drift', margin + 25, yPosition);
  yPosition += 10;

  // Description
  const fas6Desc = [
    'Efter att incidenten har isolerats ska grundorsaken identifieras och elimineras helt från miljön.',
    'Detta inkluderar att ta bort malware, stänga sårbarheter och säkerställa att angriparen inte längre',
    'har åtkomst. Verifiering att hotet är borta är kritisk innan återställning påbörjas.'
  ];
  fas6Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Identifiera grundorsaken:', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

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
  addSectionHeader('8. FAS 7: RECOVERY (ÅTERSTÄLLNING)', 16);

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('IT-drift med stöd från IT-säkerhet', margin + 25, yPosition);
  yPosition += 10;

  // Description
  const fas7Desc = [
    'Recovery-fasen fokuserar på att säkert återställa system och tjänster till normal drift.',
    'Återställning måste göras metodiskt och i rätt ordning för att undvika re-infektion.',
    'Förstärkt övervakning implementeras för att säkerställa att incidenten inte återkommer.'
  ];
  fas7Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Återställningsordning:', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

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
  addSectionHeader('9. FAS 8: POST-INCIDENT REVIEW', 16);

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('Incidentansvarig med hela teamet', margin + 25, yPosition);
  yPosition += 10;

  // Description
  const fas8Desc = [
    'Post-incident review är en strukturerad genomgång av hela incidenthanteringen för att identifiera',
    'lärdomar och förbättringsområden. Detta är en blamefree process fokuserad på att stärka organisationens',
    'säkerhet och incident response-förmåga inför framtiden.'
  ];
  fas8Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Tidpunkt för review:', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
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
  
  addSectionHeader('10. FAS 9: DOKUMENTATION OCH RAPPORTERING', 16);

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('IT-säkerhetsansvarig', margin + 25, yPosition);
  yPosition += 10;

  // Description
  const fas9Desc = [
    'Korrekt dokumentation är kritisk både för intern lärande och för lagkrav enligt NIS2-direktivet.',
    'Dokumentationen ska vara komplett, tidsbestämd och strukturerad för att kunna användas vid',
    'framtida incidenter samt vid granskning från myndigheter.'
  ];
  fas9Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 8;

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
