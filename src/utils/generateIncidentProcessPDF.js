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
  
  // Standard font sizes för consistency
  const FONT_SIZES = {
    title: 28,
    subtitle: 16,
    sectionHeader: 14,
    body: 10,
    small: 9,
    tiny: 8
  };

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace = 40) => {
    if (yPosition > pageHeight - requiredSpace) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Helper to add section header with consistent styling
  const addSectionHeader = (title) => {
    checkNewPage(25);
    doc.setFillColor(37, 99, 235);
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(FONT_SIZES.sectionHeader);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin + 5, yPosition + 8);
    yPosition += 17;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(FONT_SIZES.body);
  };

  // === COVER PAGE ===
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, pageWidth, 60, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(FONT_SIZES.title);
  doc.setFont('helvetica', 'bold');
  doc.text('INCIDENTHANTERING', pageWidth / 2, 25, { align: 'center' });
  
  doc.setFontSize(FONT_SIZES.subtitle);
  doc.setFont('helvetica', 'normal');
  doc.text('Processbeskrivning och handbok', pageWidth / 2, 38, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text('Cybersäkerhetslagen (2025:1506)', pageWidth / 2, 50, { align: 'center' });

  yPosition = 80;
  doc.setTextColor(0, 0, 0);

  // Document info
  doc.setFontSize(FONT_SIZES.body);
  doc.setFont('helvetica', 'normal');
  const today = new Date().toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Genererad: ${today}`, margin, yPosition);
  yPosition += 6;
  doc.text('Version: 1.0', margin, yPosition);
  yPosition += 20;

  // Table of contents
  doc.setFontSize(FONT_SIZES.sectionHeader);
  doc.setFont('helvetica', 'bold');
  doc.text('INNEHALL', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(FONT_SIZES.body);
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

  addSectionHeader('1. PROCESSOVERSIKT');

  doc.setFontSize(FONT_SIZES.body);
  doc.setFont('helvetica', 'normal');
  doc.text('Incidenthanteringsprocessen består av nio faser som säkerställer systematisk', margin, yPosition);
  yPosition += 5;
  doc.text('hantering från upptäckt till avslut.', margin, yPosition);
  yPosition += 10;

  // Process flow with descriptions
  const flowSteps = [
    { num: '1', title: 'UPPTÄCKT & RAPPORTERING', desc: 'Händelse upptäcks och rapporteras omedelbart' },
    { num: '2', title: 'INITIAL BEDÖMNING', desc: 'Verifiera om det är en incident' },
    { num: '3', title: 'KLASSIFICERING', desc: 'Bedöm allvårlighetsgrad och prioritera' },
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
    doc.setDrawColor(100, 150, 220);
    doc.setLineWidth(0.5);
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 14, 'FD');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(FONT_SIZES.body);
    doc.setTextColor(0, 0, 0);
    doc.text(`${step.num}. ${step.title}`, margin + 5, yPosition + 5);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(FONT_SIZES.small);
    doc.setTextColor(60, 60, 60);
    doc.text(step.desc, margin + 5, yPosition + 10);
    doc.setTextColor(0, 0, 0);
    
    yPosition += 14;
    
    if (index < flowSteps.length - 1) {
      // Draw arrow
      const centerX = pageWidth / 2;
      doc.setDrawColor(100, 150, 220);
      doc.setLineWidth(1.5);
      doc.line(centerX, yPosition + 2, centerX, yPosition + 8);
      // Arrow head
      doc.triangle(centerX, yPosition + 10, centerX - 2, yPosition + 6, centerX + 2, yPosition + 6, 'F');
      yPosition += 12;
    }
  });

  yPosition += 10;

  // === FAS 1: UPPTACKT ===
  doc.addPage();
  yPosition = margin;
  
  addSectionHeader('2. FAS 1: UPPTACKT OCH RAPPORTERING');

  doc.setFontSize(FONT_SIZES.body);
  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('Alla medarbetare + Övervakningssystem', margin + 25, yPosition);
  yPosition += 8;

  // Description paragraph
  const fas1Desc = [
    'Den första fasen i incidenthantering är upptäckt och rapportering. Alla medarbetare har ett',
    'ansvar att rapportera misstänkta säkerhetshändelser omedelbart. Upptäckt kan ske bade',
    'manuellt (användare observerar något ovanligt) och automatiskt genom övervakningssystem.'
  ];
  fas1Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Aktiviteter:', margin, yPosition);
  yPosition += 6;

  const fas1Activities = [
    '- Handelse upptäcks (manuellt eller automatiskt)',
    '- Rapporteras via etablerade kanaler (telefon, e-post, incidentsystem)',
    '- Registreras i incidenthanteringssystem med unikt incidentnummer'
  ];

  doc.setFont('helvetica', 'normal');
  fas1Activities.forEach(act => {
    doc.text(act, margin + 3, yPosition);
    yPosition += 5;
  });

  yPosition += 6;
  doc.setFont('helvetica', 'bold');
  doc.text('Utdata:', margin, yPosition);
  yPosition += 6;
  doc.setFont('helvetica', 'normal');
  doc.text('- Handelserapport skapad', margin + 3, yPosition);
  yPosition += 5;
  doc.text('- Incidentnummer tilldelas automatiskt', margin + 3, yPosition);
  yPosition += 8;

  // Time constraint box
  doc.setFillColor(255, 240, 240);
  doc.setDrawColor(220, 38, 38);
  doc.setLineWidth(0.5);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 10, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(139, 0, 0);
  doc.text('Tidsgräns: Omedelbart vid upptäckt', margin + 5, yPosition + 7);
  doc.setTextColor(0, 0, 0);
  yPosition += 15;

  // === FAS 2: INITIAL BEDOMNING ===
  addSectionHeader('3. FAS 2: INITIAL BEDOMNING');

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('IT-säkerhetsansvarig eller Jourhavande IT', margin + 25, yPosition);
  yPosition += 8;

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
  yPosition += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Beslutspunkt:', margin, yPosition);
  yPosition += 8;

  // Decision boxes side by side
  const boxWidth = (pageWidth - 2 * margin - 6) / 2;
  
  // Yellow box - NOT an incident
  doc.setFillColor(255, 250, 205);
  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.5);
  doc.rect(margin, yPosition, boxWidth, 30, 'FD');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(FONT_SIZES.body);
  doc.setTextColor(0, 0, 0);
  doc.text('INTE EN INCIDENT', margin + 5, yPosition + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(FONT_SIZES.small);
  doc.text('- Dokumentera', margin + 5, yPosition + 12);
  doc.text('- Stäng ärende', margin + 5, yPosition + 17);
  doc.text('- Aterkoppla', margin + 5, yPosition + 22);

  // Red box - IS an incident
  doc.setFillColor(255, 220, 220);
  doc.setDrawColor(220, 38, 38);
  doc.rect(margin + boxWidth + 6, yPosition, boxWidth, 30, 'FD');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(FONT_SIZES.body);
  doc.text('AR EN INCIDENT', margin + boxWidth + 11, yPosition + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(FONT_SIZES.small);
  doc.text('- Fortsatt till Fas 3', margin + boxWidth + 11, yPosition + 12);
  doc.text('- Klassificering', margin + boxWidth + 11, yPosition + 17);

  yPosition += 35;
  doc.setFontSize(FONT_SIZES.body);

  // Time constraint box
  doc.setFillColor(245, 245, 245);
  doc.setDrawColor(150, 150, 150);
  doc.setLineWidth(0.3);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 14, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.text('Tidsgräns:', margin + 5, yPosition + 5);
  doc.setFont('helvetica', 'normal');
  doc.text('Kritiska händelser: 15 minuter', margin + 5, yPosition + 10);
  doc.text('Andra händelser: 2 timmar', margin + 80, yPosition + 10);
  yPosition += 19;

  // === FAS 3: KLASSIFICERING ===
  checkNewPage(80);
  addSectionHeader('4. FAS 3: KLASSIFICERING OCH PRIORITERING');

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('Incidenthanteringsteam', margin + 25, yPosition);
  yPosition += 8;

  // Description
  const fas3Desc = [
    'Efter att en incident har bekräftats ska den klassificeras baserat på påverkan och spridning.',
    'Klassificeringen avgor resurstilldelning, eskaleringsvagaroch rapporteringskrav enligt NIS2.',
    'Använd matrisen nedan för att bestämma allvårlighetsgrad.'
  ];
  fas3Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Klassificeringsmatris:', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');

  // Severity table
  const severityData = [
    ['Niva', 'Beskrivning', 'Responstid', 'Eskalering'],
    ['KRITISK', 'Omfattande påverkan på verksamheten', '15 min', 'HELA teamet + VD'],
    ['HOG', 'Betydande påverkan på säkerhet', '30 min', 'Incidentteam + Ledning'],
    ['MEDEL', 'Begränsad påverkan', '1 timme', 'IT-säkerhet + IT-drift'],
    ['LAG', 'Minimal påverkan', '4 timmar', 'IT-drift enligt rutin']
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [severityData[0]],
    body: severityData.slice(1),
    theme: 'grid',
    margin: { left: margin, right: margin },
    styles: { 
      fontSize: FONT_SIZES.small, 
      cellPadding: 3, 
      lineColor: [200, 200, 200], 
      lineWidth: 0.1,
      halign: 'left'
    },
    headStyles: { 
      fillColor: [37, 99, 235], 
      textColor: 255, 
      fontStyle: 'bold',
      halign: 'left'
    },
    columnStyles: {
      0: { cellWidth: 28, fontStyle: 'bold' },
      1: { cellWidth: 68 },
      2: { cellWidth: 26 },
      3: { cellWidth: 48 }
    }
  });

  yPosition = doc.lastAutoTable.finalY + 8;

  // Incident types
  doc.setFont('helvetica', 'bold');
  doc.text('Vanliga incidenttyper:', margin, yPosition);
  yPosition += 6;

  const incidentTypes = [
    '- Malware/Ransomware',
    '- Phishing och social engineering',
    '- Intrang och obehorig atkomst',
    '- DDoS-attacker',
    '- Datalackage',
    '- Insiderhot',
    '- Brott mot integritet'
  ];

  doc.setFont('helvetica', 'normal');
  incidentTypes.forEach(type => {
    doc.text(type, margin + 3, yPosition);
    yPosition += 5;
  });

  // === FAS 4: AKTIVERA TEAM ===
  doc.addPage();
  yPosition = margin;
  
  addSectionHeader('5. FAS 4: AKTIVERA INCIDENTRESPONSTEAM');

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('Incidentansvarig', margin + 25, yPosition);
  yPosition += 8;

  // Description
  const fas4Desc = [
    'For kritiska och hoga incidenter maste det fullstandiga incidentresponsteamet aktiveras omedelbart.',
    'Ett war room etableras som fysisk eller virtuell mötesplats där teamet samlas för samordning.',
    'Kommunikation centraliseras och roller fördelas enligt RACI-modell för tydligt ansvar.'
  ];
  fas4Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Första motet - Agenda (30 min):', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');

  const meetingAgenda = [
    '1. Situationsöversikt (5 min)',
    '2. Bekrafta klassificering (5 min)',
    '3. Tilldela specifika uppgifter (10 min)',
    '4. Beslut om omedelbara åtgärder (10 min)'
  ];

  doc.setFont('helvetica', 'normal');
  meetingAgenda.forEach(item => {
    doc.text(item, margin + 3, yPosition);
    yPosition += 5;
  });

  yPosition += 6;
  doc.setFont('helvetica', 'bold');
  doc.text('War Room:', margin, yPosition);
  yPosition += 6;
  doc.setFont('helvetica', 'normal');
  doc.text('- Fysisk plats: Konferensrum X', margin + 3, yPosition);
  yPosition += 5;
  doc.text('- Virtuell plats: Teams/Zoom', margin + 3, yPosition);
  yPosition += 5;
  doc.text('- Delad dokumentation: SharePoint/Drive', margin + 3, yPosition);
  yPosition += 8;

  // === FAS 5: CONTAINMENT ===
  addSectionHeader('6. FAS 5: CONTAINMENT (INNESLUTNING)');

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('IT-drift i samråd med IT-säkerhet', margin + 25, yPosition);
  yPosition += 8;

  // Description
  const fas5Desc = [
    'Containment-fasen fokuserar på att stoppa spridning och begransa ytterligare skada från incidenten.',
    'Malet är att isolera drabbåde system utan att förstöra bevis. Åtgärder maste vara snabba men genomtänkta.',
    'Dokumentera varje steg noggrant för senare analys och eventuell rattslig process.'
  ];
  fas5Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 6;

  // Critical warning box
  doc.setFillColor(255, 250, 205);
  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.5);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 14, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(FONT_SIZES.body);
  doc.text('VIKTIGT - Bevara bevis INNAN containment', margin + 5, yPosition + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(FONT_SIZES.small);
  doc.text('Ta minnesbilder, natverksdumpar och systemloggar INNAN system stangs av eller isoleras', margin + 5, yPosition + 10);
  yPosition += 18;
  doc.setFontSize(FONT_SIZES.body);

  doc.setFont('helvetica', 'bold');
  doc.text('Containment-åtgärder:', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  const containmentData = [
    ['Incidenttyp', 'Containment-åtgärder'],
    ['Malware/\nRansomware', '- Isolera drabbåde system från natverk\n- Blockera skadliga IP-adresser\n- Inaktivera smittade anvandarkonton'],
    ['Phishing', '- Blockera avsandar-adress\n- Ta bort e-post från alla brevlador\n- Aterstall komprometterade losenord'],
    ['Intrang', '- Inaktivera komprometterade konton\n- Andra alla privilegierade losenord\n- Isolera paverkade segment'],
    ['DDoS', '- Aktivera DDoS-skydd\n- Kontakta ISP/CDN-leverantor\n- Implementera rate limiting']
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [containmentData[0]],
    body: containmentData.slice(1),
    theme: 'grid',
    margin: { left: margin, right: margin },
    styles: { 
      fontSize: FONT_SIZES.small, 
      cellPadding: 3, 
      lineColor: [200, 200, 200], 
      lineWidth: 0.1,
      halign: 'left',
      valign: 'top'
    },
    headStyles: { 
      fillColor: [37, 99, 235], 
      textColor: 255, 
      fontStyle: 'bold',
      halign: 'left'
    },
    columnStyles: {
      0: { cellWidth: 38, fontStyle: 'bold' },
      1: { cellWidth: 132 }
    }
  });

  yPosition = doc.lastAutoTable.finalY + 10;

  // === FAS 6: ERADICATION ===
  doc.addPage();
  yPosition = margin;
  
  addSectionHeader('7. FAS 6: ERADICATION (UTROTNING)');

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('IT-säkerhet med stod från IT-drift', margin + 25, yPosition);
  yPosition += 8;

  // Description
  const fas6Desc = [
    'Efter att incidenten har isolerats ska grundorsaken identifieras och elimineras helt från miljon.',
    'Detta inkluderar att ta bort malware, stanga sårbarheter och sakerstalla att angriparen inte langre',
    'har atkomst. Verifiering att hotet är borta är kritisk innan återställning paborjas.'
  ];
  fas6Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Identifiera grundorsaken:', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');

  const rootCause = [
    '- Hur kom angriparen in?',
    '- Vilken sarbarhet utnyttjades?',
    '- Finns bakdorrar installerade?',
    '- Finns persistent atkomst kvar?'
  ];

  rootCause.forEach(q => {
    doc.text(q, margin + 3, yPosition);
    yPosition += 5;
  });

  yPosition += 6;
  doc.setFont('helvetica', 'bold');
  doc.text('Verifiera utrotning:', margin, yPosition);
  yPosition += 6;
  doc.setFont('helvetica', 'normal');

  const verification = [
    '- Ingen skadlig aktivitet kvar',
    '- Alla indicators of compromise (IoC) är borta',
    '- Inga obehoriga konton finns',
    '- Overvakning visar inga misstänkta aktiviteter'
  ];

  verification.forEach(item => {
    doc.text(item, margin + 3, yPosition);
    yPosition += 5;
  });

  // === FAS 7: RECOVERY ===
  yPosition += 10;
  addSectionHeader('8. FAS 7: RECOVERY (ATERSTALLNING)');

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('IT-drift med stod från IT-säkerhet', margin + 25, yPosition);
  yPosition += 8;

  // Description
  const fas7Desc = [
    'Recovery-fasen fokuserar på att sakert återställa system och tjänster till normal drift.',
    'Återställning maste goras metodiskt och i ratt ordning för att undvika re-infektion.',
    'Förstarkt övervakning implementeras för att sakerstalla att incidenten inte aterkommer.'
  ];
  fas7Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Återställningsordning:', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');

  const recoverySteps = [
    '1. Kritiska infrastrukturtjänster (AD, DNS, natverk)',
    '2. Karnaffarssystem (ERP, produktionssystem)',
    '3. Stodsystem (e-post, filservrar)',
    '4. Mindre kritiska system'
  ];

  recoverySteps.forEach(step => {
    // Set colors för each box
    doc.setFillColor(230, 240, 255);
    doc.setDrawColor(150, 180, 230);
    doc.setLineWidth(0.3);
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 7, 'FD');
    
    // Draw text
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text(step, margin + 5, yPosition + 5);
    yPosition += 7;
    
    if (step !== recoverySteps[recoverySteps.length - 1]) {
      // Draw arrow
      const centerX = pageWidth / 2;
      doc.setDrawColor(150, 180, 230);
      doc.setFillColor(150, 180, 230);
      doc.setLineWidth(1);
      doc.line(centerX, yPosition + 1, centerX, yPosition + 5);
      // Arrow head
      doc.triangle(centerX, yPosition + 7, centerX - 1.5, yPosition + 4, centerX + 1.5, yPosition + 4, 'F');
      yPosition += 8;
    }
  });

  yPosition += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Stegvis återställning:', margin, yPosition);
  yPosition += 6;
  doc.setFont('helvetica', 'normal');
  doc.text('STEG 1: Aterstall i isolerad miljo - Testa funktionalitet', margin + 3, yPosition);
  yPosition += 5;
  doc.text('STEG 2: Aterstall i produktion (begransat) - Pilot med sma grupper', margin + 3, yPosition);
  yPosition += 5;
  doc.text('STEG 3: Fullstandig återställning - Oppna för alla användare', margin + 3, yPosition);
  yPosition += 8;

  doc.setFillColor(240, 255, 240);
  doc.setDrawColor(150, 200, 150);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.text('Förstarkt övervakning: 2-4 veckor efter återställning', margin + 5, yPosition + 6);
  yPosition += 13;

  // === FAS 8: POST-INCIDENT REVIEW ===
  addSectionHeader('9. FAS 8: POST-INCIDENT REVIEW');

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('Incidentansvarig med hela teamet', margin + 25, yPosition);
  yPosition += 8;

  // Description
  const fas8Desc = [
    'Post-incident review är en strukturerad genomgang av hela incidenthanteringen för att identifiera',
    'lärdomar och förbättringsområden. Detta är en blamefree process fokuserad på att stärka organisationens',
    'sakerhet och incident response-förmåga inför framtiden.'
  ];
  fas8Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Tidpunkt för review:', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  doc.text('- KRITISKA: Inom 1 vecka', margin + 3, yPosition);
  yPosition += 5;
  doc.text('- HOGA: Inom 2 veckor', margin + 3, yPosition);
  yPosition += 5;
  doc.text('- MEDEL/LAG: Kvartalsvis sammanstallning', margin + 3, yPosition);
  yPosition += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Agenda för review-mote (2-3 timmar):', margin, yPosition);
  yPosition += 6;

  const reviewAgenda = [
    'Del 1: Faktainsamling (30 min)',
    '  - Vad hände? (tidslinje)',
    '  - Hur upptäcktes det?',
    '  - Hur hanterades det?',
    '',
    'Del 2: Grundorsaksanalys (45 min)',
    '  - Varför hände det?',
    '  - Vilka sårbarheter utnyttjades?',
    '  - Vilka kontroller misslyckades?',
    '',
    'Del 3: Förbättringsforslag (45 min)',
    '  - Vad fungerade bra?',
    '  - Vad kan forbattras?',
    '  - Konkreta åtgärder'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(FONT_SIZES.small);
  reviewAgenda.forEach(item => {
    doc.text(item, margin + 3, yPosition);
    yPosition += 4;
  });

  doc.setFontSize(FONT_SIZES.body);

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
    ['Typ', 'Tidsfrist', 'Innehall'],
    ['Tidig varning', 'Inom 24 timmar', 'Kort beskrivning av incident'],
    ['Incidentrapport', 'Inom 72 timmar', 'Detaljerad rapport om händelse'],
    ['Slutrapport', 'Inom 1 manad', 'Fullstandig analys och åtgärder']
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [reportingData[0]],
    body: reportingData.slice(1),
    theme: 'grid',
    margin: { left: margin, right: margin },
    styles: { 
      fontSize: FONT_SIZES.small, 
      cellPadding: 3, 
      lineColor: [200, 200, 200], 
      lineWidth: 0.1,
      halign: 'left'
    },
    headStyles: { 
      fillColor: [37, 99, 235], 
      textColor: 255, 
      fontStyle: 'bold',
      halign: 'left'
    },
    columnStyles: {
      0: { cellWidth: 42, fontStyle: 'bold' },
      1: { cellWidth: 42 },
      2: { cellWidth: 86 }
    }
  });

  yPosition = doc.lastAutoTable.finalY + 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Dokumentation ska innehalla:', margin, yPosition);
  yPosition += 6;

  const docContent = [
    '- Komplett tidslinje',
    '- Klassificering och bedömning',
    '- Vidtagna åtgärder',
    '- Grundorsaksanalys',
    '- Paverkan på verksamheten',
    '- Kostnader (om tillampligt)',
    '- Forbattringsåtgärder',
    '- Lessons learned'
  ];

  doc.setFont('helvetica', 'normal');
  docContent.forEach(item => {
    doc.text(item, margin + 3, yPosition);
    yPosition += 5;
  });

  // === FOOTER ===
  yPosition = pageHeight - 25;
  doc.setFillColor(240, 240, 240);
  doc.rect(0, yPosition, pageWidth, 25, 'F');
  
  doc.setFontSize(FONT_SIZES.small);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text('Detta dokument är en mall och bor anpassas efter er verksamhets specifika behov.', margin, yPosition + 8);
  doc.text('For fragor om incidenthantering enligt Cybersäkerhetslagen, kontakta MSB eller er juridiska radgivare.', margin, yPosition + 13);

  // Generate and download
  doc.save(`Incidenthantering_Processbeskrivning_${new Date().toISOString().split('T')[0]}.pdf`);
};
