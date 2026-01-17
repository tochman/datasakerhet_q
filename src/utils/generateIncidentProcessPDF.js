import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Genererar en professionell processbeskrivning för incidenthantering
 * Omfattande guide enligt best practice för cybersäkerhetsincidenter
 */
export const generateIncidentProcessPDF = async () => {
  // Load logo as base64
  const loadLogoAsBase64 = async () => {
    try {
      const response = await fetch('/communitas_logo_transparent.png');
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Failed to load logo:', error);
      return null;
    }
  };

  const logoData = await loadLogoAsBase64();

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const bottomMargin = 40; // Marginal för footer med logga
  const maxContentY = pageHeight - bottomMargin; // Max position för content
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

  // Track which pages have footers
  const pagesWithFooter = new Set();

  // Helper function to add footer to current page
  const addFooter = () => {
    const currentPage = doc.internal.getCurrentPageInfo().pageNumber;
    if (pagesWithFooter.has(currentPage)) return; // Already has footer
    pagesWithFooter.add(currentPage);
    
    const footerY = pageHeight - bottomMargin;
    
    // Thin separator line
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(margin, footerY + 5, pageWidth - margin, footerY + 5);
    
    // Add logo to bottom right
    if (logoData) {
      try {
        const logoWidth = 35;
        const logoHeight = 8.75;
        const logoX = pageWidth - margin - logoWidth;
        doc.addImage(logoData, 'PNG', logoX, footerY + 20, logoWidth, logoHeight);
      } catch (error) {
        console.error('Failed to add logo to PDF:', error);
      }
    }
    
    // Page number (top right)
    doc.setFontSize(FONT_SIZES.small);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`Sida ${currentPage}`, pageWidth - margin, footerY + 12, { align: 'right' });
    
    // Document title (top left)
    doc.setFontSize(FONT_SIZES.tiny);
    doc.setTextColor(120, 120, 120);
    doc.text('Incidenthantering enligt Cybersäkerhetslagen (2025:1506)', margin, footerY + 12);
    
    // Reset colors
    doc.setTextColor(0, 0, 0);
  };

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace = 15) => {
    if (yPosition + requiredSpace > maxContentY) {
      addFooter();
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Table options for autoTable with footer support
  const getTableOptions = (extraOptions = {}) => ({
    margin: { left: margin, right: margin, bottom: bottomMargin },
    pageBreak: 'auto',
    showHead: 'everyPage',
    didDrawPage: () => {
      addFooter();
    },
    ...extraOptions
  });

  // Helper to add section header with consistent styling
  const addSectionHeader = (title) => {
    checkNewPage(20);
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
  doc.rect(0, 0, pageWidth, 70, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(FONT_SIZES.title);
  doc.setFont('helvetica', 'bold');
  doc.text('INCIDENTHANTERING', pageWidth / 2, 30, { align: 'center' });
  
  doc.setFontSize(FONT_SIZES.subtitle);
  doc.setFont('helvetica', 'normal');
  doc.text('Processbeskrivning och handbok', pageWidth / 2, 45, { align: 'center' });
  
  doc.setFontSize(11);
  doc.text('Cybersäkerhetslagen (2025:1506)', pageWidth / 2, 58, { align: 'center' });

  yPosition = 90;
  doc.setTextColor(0, 0, 0);

  // Document info
  doc.setFontSize(FONT_SIZES.body);
  doc.setFont('helvetica', 'normal');
  const today = new Date().toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Genererad: ${today}`, margin, yPosition);
  yPosition += 7;
  doc.text('Version: 1.0', margin, yPosition);
  yPosition += 15;

  // Table of contents
  doc.setFontSize(FONT_SIZES.sectionHeader);
  doc.setFont('helvetica', 'bold');
  doc.text('INNEHÅLL', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(FONT_SIZES.body);
  doc.setFont('helvetica', 'normal');
  const toc = [
    '1. Processöversikt',
    '2. Fas 1: Upptäckt och rapportering',
    '3. Fas 2: Initial bedömning',
    '4. Fas 3: Klassificering och prioritering',
    '5. Fas 4: Aktivera incidentresponsteamet',
    '6. Fas 5: Containment (Inneslutning)',
    '7. Fas 6: Eradication (Utrotning)',
    '8. Fas 7: Recovery (Återställning)',
    '9. Fas 8: Post-Incident Review',
    '10. Fas 9: Dokumentation och rapportering'
  ];

  toc.forEach(item => {
    doc.text(item, margin + 5, yPosition);
    yPosition += 7;
  });

  // Add footer to cover page
  addFooter();

  // === NEW PAGE - PROCESS OVERVIEW ===
  doc.addPage();
  yPosition = margin;

  addSectionHeader('1. PROCESSÖVERSIKT');

  doc.setFontSize(FONT_SIZES.body);
  doc.setFont('helvetica', 'normal');
  doc.text('Incidenthanteringsprocessen består av nio faser som säkerställer systematisk', margin, yPosition);
  yPosition += 6;
  doc.text('hantering från upptäckt till avslut. Varje fas har definierade ansvariga, aktiviteter', margin, yPosition);
  yPosition += 6;
  doc.text('och tidsgränser för att möta kraven i Cybersäkerhetslagen.', margin, yPosition);
  yPosition += 12;

  // Process flow with descriptions
  const flowSteps = [
    { num: '1', title: 'UPPTÄCKT & RAPPORTERING', desc: 'Händelse upptäcks och rapporteras omedelbart' },
    { num: '2', title: 'INITIAL BEDÖMNING', desc: 'Verifiera om det är en incident' },
    { num: '3', title: 'KLASSIFICERING', desc: 'Bedöm allvarlighetsgrad och prioritera' },
    { num: '4', title: 'AKTIVERA TEAM', desc: 'Kalla in incidentresponsteamet' },
    { num: '5', title: 'CONTAINMENT', desc: 'Stoppa spridning och begränsa skada' },
    { num: '6', title: 'ERADICATION', desc: 'Ta bort hotet från miljön' },
    { num: '7', title: 'RECOVERY', desc: 'Återställ normal drift säkert' },
    { num: '8', title: 'POST-INCIDENT REVIEW', desc: 'Lär av incidenten' },
    { num: '9', title: 'DOKUMENTATION', desc: 'Rapportera enligt lagen' }
  ];

  flowSteps.forEach((step, index) => {
    // Kompakt blå box
    doc.setFillColor(235, 242, 255);
    doc.setDrawColor(79, 130, 230);
    doc.setLineWidth(0.6);
    doc.roundedRect(margin, yPosition, pageWidth - 2 * margin, 11, 1.5, 1.5, 'FD');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(FONT_SIZES.small);
    doc.setTextColor(30, 64, 175);
    doc.text(`${step.num}. ${step.title}`, margin + 4, yPosition + 4.5);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(FONT_SIZES.tiny);
    doc.setTextColor(55, 65, 81);
    doc.text(step.desc, margin + 4, yPosition + 8.5);
    doc.setTextColor(0, 0, 0);
    
    yPosition += 12;
    
    if (index < flowSteps.length - 1) {
      // Kompakt pil
      const centerX = pageWidth / 2;
      doc.setDrawColor(79, 130, 230);
      doc.setLineWidth(1);
      doc.line(centerX, yPosition + 1, centerX, yPosition + 5);
      // Arrow head
      doc.setFillColor(79, 130, 230);
      doc.triangle(centerX, yPosition + 6.5, centerX - 1.5, yPosition + 3.5, centerX + 1.5, yPosition + 3.5, 'F');
      yPosition += 8;
    }
  });

  yPosition += 10;

  // === FAS 1: UPPTÄCKT ===
  addFooter();
  doc.addPage();
  yPosition = margin;
  
  addSectionHeader('2. FAS 1: UPPTÄCKT OCH RAPPORTERING');

  doc.setFontSize(FONT_SIZES.body);
  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('Alla medarbetare samt övervakningssystem', margin + 25, yPosition);
  yPosition += 10;

  // Description paragraph
  const fas1Desc = [
    'Den första fasen är upptäckt och rapportering. Alla medarbetare har ett ansvar att',
    'rapportera misstänkta säkerhetshändelser omedelbart. Upptäckt kan ske både manuellt',
    '(användare observerar avvikelser) och automatiskt genom övervakningssystem.',
    'Snabb rapportering minimerar potentiell skada och möjliggör effektiv hantering.'
  ];
  fas1Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 6;
  });
  yPosition += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Aktiviteter:', margin, yPosition);
  yPosition += 7;

  const fas1Activities = [
    '- Händelse upptäcks (manuellt eller automatiskt)',
    '- Rapporteras via etablerade kanaler (telefon, e-post, incidentsystem)',
    '- Registreras i incidenthanteringssystem med unikt incidentnummer'
  ];

  doc.setFont('helvetica', 'normal');
  fas1Activities.forEach(act => {
    doc.text(act, margin + 3, yPosition);
    yPosition += 6;
  });

  yPosition += 8;
  doc.setFont('helvetica', 'bold');
  doc.text('Utdata:', margin, yPosition);
  yPosition += 7;
  doc.setFont('helvetica', 'normal');
  doc.text('- Händelserapport skapad', margin + 3, yPosition);
  yPosition += 6;
  doc.text('- Incidentnummer tilldelas automatiskt', margin + 3, yPosition);
  yPosition += 10;

  // Time constraint box - modernare design
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(239, 68, 68);
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, yPosition, pageWidth - 2 * margin, 11, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(185, 28, 28);
  doc.text('⏱ Tidsgräns: Omedelbart vid upptäckt', margin + 5, yPosition + 7);
  doc.setTextColor(0, 0, 0);
  yPosition += 16;

  // === FAS 2: INITIAL BEDÖMNING ===
  addSectionHeader('3. FAS 2: INITIAL BEDÖMNING');

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('IT-säkerhetsansvarig eller Jourhavande IT', margin + 25, yPosition);
  yPosition += 8;

  // Description
  const fas2Desc = [
    'I denna fas verifieras om den rapporterade händelsen verkligen är en säkerhetsincident.',
    'En incident definieras som en händelse som hotar konfidentialitet, integritet eller tillgänglighet',
    'i IT-system eller data. En noggrann bedömning är kritisk - falsklarm kostar resurser medan',
    'missade incidenter kan få allvarliga konsekvenser. Beslutet påverkar hela den fortsatta processen.'
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
  doc.text('- Återkoppla', margin + 5, yPosition + 22);

  // Red box - IS an incident
  doc.setFillColor(255, 220, 220);
  doc.setDrawColor(220, 38, 38);
  doc.rect(margin + boxWidth + 6, yPosition, boxWidth, 30, 'FD');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(FONT_SIZES.body);
  doc.text('ÄR EN INCIDENT', margin + boxWidth + 11, yPosition + 6);
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
  doc.text('Incidentresponsteamet', margin + 25, yPosition);
  yPosition += 8;

  // Description
  const fas3Desc = [
    'Efter att en incident har bekräftats ska den klassificeras baserat på påverkan och spridning.',
    'En korrekt klassificering säkerställer att rätt resurser sätts in vid rätt tidpunkt.',
    'Klassificeringen avgör resurstilldelning, eskaleringsvägar och rapporteringskrav enligt NIS2.',
    'Använd matrisen nedan för att bestämma allvarlighetsgrad.'
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
    ...getTableOptions(),
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
    '- Intrång och obehörig åtkomst',
    '- DDoS-attacker',
    '- Dataläckage',
    '- Insiderhot',
    '- Brott mot integritet'
  ];

  doc.setFont('helvetica', 'normal');
  incidentTypes.forEach(type => {
    doc.text(type, margin + 3, yPosition);
    yPosition += 5;
  });

  // === FAS 4: AKTIVERA TEAM ===
  addFooter();
  doc.addPage();
  yPosition = margin;
  
  addSectionHeader('5. FAS 4: AKTIVERA INCIDENTRESPONSTEAMET');

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('Incidentansvarig', margin + 25, yPosition);
  yPosition += 8;

  // Description
  const fas4Desc = [
    'För kritiska och höga incidenter måste det fullständiga incidentresponsteamet aktiveras omedelbart.',
    'Ett war room etableras som fysisk eller virtuell mötesplats där teamet samlas för samordning.',
    'Kommunikation centraliseras och roller fördelas enligt RACI-modell för tydligt ansvar.',
    'Snabb mobilisering och tydlig ansvarsfördelning är avgörande för effektiv incidenthantering.'
  ];
  fas4Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Första mötet - Agenda (30 min):', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');

  const meetingAgenda = [
    '1. Situationsöversikt (5 min)',
    '2. Bekräfta klassificering (5 min)',
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
    'Containment-fasen fokuserar på att stoppa spridning och begränsa ytterligare skada från incidenten.',
    'Bevara alltid forensisk information innan system stängs av eller kopplas från nätverk.',
    'Målet är att isolera drabbade system utan att förstöra bevis. Åtgärder måste vara snabba men genomtänkta.',
    'Dokumentera varje steg noggrant för senare analys och eventuell rättslig process.'
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
  doc.text('Ta minnesbilder, nätverksdumpar och systemloggar INNAN system stängs av eller isoleras', margin + 5, yPosition + 10);
  yPosition += 18;
  doc.setFontSize(FONT_SIZES.body);

  doc.setFont('helvetica', 'bold');
  doc.text('Containment-åtgärder:', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  const containmentData = [
    ['Incidenttyp', 'Containment-åtgärder'],
    ['Malware/\nRansomware', '- Isolera drabbade system från nätverk\n- Blockera skadliga IP-adresser och domäner\n- Inaktivera smittade användarkonton\n- Stäng av automatiska backupsynkroniseringar\n- Blockera lateral movement via SMB/RDP'],
    ['Phishing', '- Blockera avsändaradress och domän\n- Ta bort e-post från alla brevlådor\n- Återställ komprometterade lösenord\n- Aktivera MFA på drabbade konton\n- Revokera aktiva sessioner'],
    ['Intrång/\nBreach', '- Inaktivera komprometterade konton\n- Ändra alla privilegierade lösenord\n- Isolera påverkade segment\n- Blockera utgående trafik till C2-servrar\n- Revokera API-nycklar och certifikat'],
    ['DDoS', '- Aktivera DDoS-skydd\n- Kontakta ISP/CDN-leverantör\n- Implementera rate limiting\n- Blockera attackkällor geografiskt\n- Aktivera "under attack"-läge'],
    ['SQL Injection/\nWeb Attack', '- Inaktivera drabbad webbapplikation\n- Blockera skadliga IP-adresser\n- Aktivera WAF-regler\n- Begränsa databas-behörigheter\n- Isolera webb- och databasskikt'],
    ['Insider Threat', '- Inaktivera användarkonto omedelbart\n- Revokera fysisk och digital åtkomst\n- Isolera användarens enheter från nätverket\n- Frys användardata för forensisk analys\n- Blockera dataexfiltrering (USB, molntjänster)'],
    ['Credential\nStuffing', '- Tvinga lösenordsåterställning för drabbade konton\n- Aktivera MFA globalt\n- Blockera inloggningar från misstänkta IP-adresser\n- Implementera CAPTCHA vid inloggning\n- Aktivera geoblocking om lämpligt'],
    ['Zero-Day\nExploit', '- Isolera sårbara system från internet\n- Implementera virtuell patching via WAF/IPS\n- Aktivera whitelist-baserad åtkomst\n- Övervaka för exploit-indikatorer\n- Begränsa lateral movement']
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [containmentData[0]],
    body: containmentData.slice(1),
    theme: 'grid',
    ...getTableOptions(),
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
  addFooter();
  doc.addPage();
  yPosition = margin;
  
  addSectionHeader('7. FAS 6: ERADICATION (UTROTNING)');

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('IT-säkerhet med stöd från IT-drift', margin + 25, yPosition);
  yPosition += 8;

  // Description
  const fas6Desc = [
    'Efter att incidenten har isolerats ska grundorsaken identifieras och elimineras helt från miljön.',
    'Detta inkluderar att ta bort malware, stänga sårbarheter och säkerställa att angriparen inte längre',
    'har åtkomst. En grundlig utrotning förhindrar att samma incident inträffar igen.',
    'Verifiering att hotet är borta är kritisk innan återställning påbörjas.'
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
    '- Vilken sårbarhet utnyttjades?',
    '- Finns bakdörrar installerade?',
    '- Finns persistent åtkomst kvar?'
  ];

  rootCause.forEach(q => {
    doc.text(q, margin + 3, yPosition);
    yPosition += 5;
  });

  yPosition += 6;
  checkNewPage(30); // Ensure space for verification
  doc.setFont('helvetica', 'bold');
  doc.text('Verifiera utrotning:', margin, yPosition);
  yPosition += 6;
  doc.setFont('helvetica', 'normal');

  const verification = [
    '- Ingen skadlig aktivitet kvar',
    '- Alla indicators of compromise (IoC) är borta',
    '- Inga obehöriga konton finns',
    '- Övervakning visar inga misstänkta aktiviteter'
  ];

  verification.forEach(item => {
    doc.text(item, margin + 3, yPosition);
    yPosition += 5;
  });

  // === FAS 7: RECOVERY ===
  yPosition += 10;
  addSectionHeader('8. FAS 7: RECOVERY (ÅTERSTÄLLNING)');

  doc.setFont('helvetica', 'bold');
  doc.text('Ansvarig:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text('IT-drift med stöd från IT-säkerhet', margin + 25, yPosition);
  yPosition += 8;

  // Description
  const fas7Desc = [
    'Recovery-fasen fokuserar på att säkert återställa system och tjänster till normal drift.',
    'Återställning måste göras metodiskt och i rätt ordning för att undvika re-infektion.',
    'System återställs stegvis med kontrollerad verifiering vid varje steg.',
    'Förstärkt övervakning implementeras för att säkerställa att incidenten inte återkommer.'
  ];
  fas7Desc.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 6;

  checkNewPage(60); // Ensure space for recovery steps
  doc.setFont('helvetica', 'bold');
  doc.text('Återställningsordning:', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');

  const recoverySteps = [
    '1. Kritiska infrastrukturtjänster (AD, DNS, nätverk)',
    '2. Kärnaffärssystem (ERP, produktionssystem)',
    '3. Stödsystem (e-post, filservrar)',
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
  checkNewPage(35); // Ensure space for the remaining content

  doc.setFont('helvetica', 'bold');
  doc.text('Stegvis återställning:', margin, yPosition);
  yPosition += 6;
  doc.setFont('helvetica', 'normal');
  doc.text('STEG 1: Återställ i isolerad miljö - Testa funktionalitet', margin + 3, yPosition);
  yPosition += 5;
  doc.text('STEG 2: Återställ i produktion (begränsat) - Pilot med små grupper', margin + 3, yPosition);
  yPosition += 5;
  doc.text('STEG 3: Fullständig återställning - Öppna för alla användare', margin + 3, yPosition);
  yPosition += 8;

  checkNewPage(15); // Ensure space for the green box
  doc.setFillColor(240, 255, 240);
  doc.setDrawColor(150, 200, 150);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.text('Förstärkt övervakning: 2-4 veckor efter återställning', margin + 5, yPosition + 6);
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
    'Post-incident review är en strukturerad genomgång av hela incidenthanteringen för att identifiera',
    'lärdomar och förbättringsområden. Detta är en blamefree process fokuserad på att stärka organisationens',
    'säkerhet och incidentresponsförmåga inför framtiden. Målet är kontinuerlig förbättring,',
    'inte att peka finger. Alla erfarenheter - både positiva och negativa - är värdefulla för lärande.'
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
  doc.text('- HÖGA: Inom 2 veckor', margin + 3, yPosition);
  yPosition += 5;
  doc.text('- MEDEL/LÅG: Kvartalsvis sammanställning', margin + 3, yPosition);
  yPosition += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Agenda för review-möte (2-3 timmar):', margin, yPosition);
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
    'Del 3: Förbättringsförslag (45 min)',
    '  - Vad fungerade bra?',
    '  - Vad kan förbättras?',
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
  addFooter();
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
    'framtida incidenter samt vid granskning från myndigheter. Enligt Cybersäkerhetslagen finns',
    'specifika rapporteringsfrister som måste följas för att undvika sanktioner.'
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
    ...getTableOptions(),
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
  doc.text('Dokumentation ska innehålla:', margin, yPosition);
  yPosition += 6;

  const docContent = [
    '- Komplett tidslinje',
    '- Klassificering och bedömning',
    '- Vidtagna åtgärder',
    '- Grundorsaksanalys',
    '- Påverkan på verksamheten',
    '- Kostnader (om tillämpligt)',
    '- Förbättringsåtgärder',
    '- Lessons learned'
  ];

  doc.setFont('helvetica', 'normal');
  docContent.forEach(item => {
    doc.text(item, margin + 3, yPosition);
    yPosition += 5;
  });

  // Lägg till footer på ALLA sidor - viktig fix
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter();
  }

  // Generate and download
  doc.save(`Incidenthantering_Processbeskrivning_${new Date().toISOString().split('T')[0]}.pdf`);
};
