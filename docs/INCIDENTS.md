# Incidenthantering

## Översikt

Incidenthantering omfattar 6 huvudområden:

1. Incidenthanteringspolicy
2. Övervakning och loggning
3. Händelserapportering
4. Händelsebedömning och klassificering
5. Incidentrespons
6. Eftergranskningar av incidenter

## 1 INCIDENTHANTERINGSPOLICY

### 1.1 - Etablera incidenthanteringspolicy

#### VÄGLEDNING (hur man implementerar)

Definiera tydliga mål för incidenthanteringspolicyn som täcker:

- Roller och ansvar
- Procedurer för upptäckt, analys, inneslutning, respons, återhämtning
- Dokumentation och rapportering i tid

Policyn måste vara sammanhängande med business continuity och disaster recovery-planen

Policyn ska inkludera:

**a) Kategoriseringssystem för incidenter baserat på kriterier som:**

- Påverkan på affärsverksamhet
- Datakänslighet (enligt riskhantering)
- Juridisk och regulatorisk påverkan, inklusive rapporteringstidslinjer (GDPR, nationella regler)
- Omfattning och skala
- Typ av attack
- Skadlig mjukvara/sårbarhetsexploatering
- Kritikalitet hos påverkade system
- Brådskande inneslutning
- Potentiell dataexfiltrering eller korruption (t.ex. ransomware)
- Sannolikhet för återhämtning
- Påverkan på människoliv och säkerhet

**b) Effektiva kommunikationsplaner inkluderande:**

- Eskalerings- och rapporteringsvägar
- Rapporteringstidslinjer från regulatoriska ramverk (GDPR, nationella regler)
- Villkor och procedurer för eskalering
- Kommunikationskanaler (e-post, intranät, telefon, sociala medier, pressmeddelanden)
- Kanaler anpassade efter målgrupp (interna, kunder, allmänheten)
- Metoder för feedback från intressenter
- Riktlinjer för när och hur ofta man kommunicerar
- Förskrivna meddelandemallar för olika scenarion

**c) Tilldela roller för att upptäcka och svara på incidenter till kompetenta anställda**

**d) Dokument att använda såsom:**

- Incidentresponsmanualer
- Eskaleringsdiagram
- Kontaktlistor
- Mallar

Identifiera nödvändiga roller och ansvar:

- Använd färdighetsramverk som ECSF (European Cybersecurity Skills Framework)
- Tydlig ansvarsfördelning

#### BEVIS-EXEMPEL (vad som kan visa efterlevnad)

- Dokumenterad incidenthanteringspolicy som innehåller alla obligatoriska element
- Kategoriseringssystem för incidenter dokumenterat
- Kommunikationsplan på plats
- Procedurer för kommunikation med CSIRT/behöriga myndigheter
- Procedurer för kommunikation med kunder/leverantörer
- Bevis på att policyn kommunicerats till anställda

#### TIPS (frivilliga bästa praxis)


💡 Identifiera och överväg alla resurser som behövs vid incident:

- Säkerställ att personal är välutbildad
- Identifiera externa intressenter (operatörer, teknikleverantörer, open source-projektkontakter, CSIRT)


💡 Säkerställ tydlig översikt över olika rapporteringsskyldigheter under olika rapporteringsregimer

💡 Ändringar i policyn ska kommuniceras till relevant personal

💡 Integrationsexempel:

- Identifiera gränssnitt mellan incidenthanteringspolicy och business continuity
- Beskriv arbetsflöden som triggar business continuity under en incident
- Utveckla scenarier som testar interaktionen mellan dessa processer

### 1.2 - Testa och granska policyn

#### VÄGLEDNING

Testa roller, ansvar och procedurer genom en eller flera av:

- Tabletop-övning
- Simulering av incident (baserat på identifierade risker och hotlandskap)
- Red team/blue team-övning
- Genomgång av tidigare incidenter

Testa minst årligen

Granska och uppdatera årligen, med hänsyn till:

- Resultat från policytester
- Ändringar i hotlandskap och cybersäkerhetslagar
- Ändringar i övergripande säkerhetspolicy

#### BEVIS-EXEMPEL

- Periodiska simuleringar och medvetandehöjande aktiviteter
- Test- och granskningsplaner eller scheman
- Procedururppdateringar (versionshistorik)

#### TIPS


💡 Kommunicera ändringar i policyn till relevant personal

💡 Detaljerade procedurer för incidenthanteringspolicyn kommunicerade till personal

💡 Lista över rapporteringsskyldigheter och tidsfrister (både juridiska och kontraktuella)

## 2 ÖVERVAKNING OCH LOGGNING

### 2.1 - Etablera procedurer och verktyg

#### VÄGLEDNING

- Identifiera ett eller flera mål för övervakning och loggning:

- Hotdetektering
- Efterlevnadssäkring
- Stöd för incidentrespons
- Prestandaoptimering
- Anomalidetektering
- Övervaka för nya sårbarhetsrapporter (för FOSS-komponenter)
- Förebyggande av dataförlust
- Stöd för forensiska undersökningar
- Övervakning av nätverkshälsa

Procedurer ska beskriva:

Mål
Data för insamling och relevanta verktyg
Beskrivning av dataalgoritmer
Mekanismer för att notifiera relevant personal

Välj verktyg baserat på kriterier som:

Användarvänlighet
Integration med befintliga system (inklusive gränsöverskridande verksamhet)
Minimering av manuell intervention
Kapacitet att samla data från olika källor
Säkerhetsfunktioner (kryptering, åtkomstkontroll)
Kostnader och licensiering

#### BEVIS-EXEMPEL

- Procedurer på plats
- Verktyg på plats
- Konfigurationsinställningar för loggningsfunktion
- Konfiguration enligt dokumenterade standarder/bästa praxis
- Skyddsåtgärder för konfidentialitet, integritet och tillgänglighet av loggar

#### TIPS


💡 Acceptabla verktyg enligt state-of-the-art:

SIEM-system (Security Information and Event Management)
EDR-verktyg (Endpoint Detection and Response)
XDR-verktyg (Extended Detection and Response)

### 2.2 - Automatisera övervakning

#### VÄGLEDNING

Minimera falska positiva och negativa genom att:

Etablera normala nätverkstrafikmönster
Använda analytics och maskininlärningsalgoritmer
Kontinuerligt uppdatera automatiserade övervakningsverktyg
Finjustera parametrar och tröskelvärden

Säkerställ att alla potentiella risker täcks av relevanta use cases, t.ex.:

Use case för åtkomst till kritisk data
Use case för dataexfiltrering
Use case för ransomware-infektion

#### BEVIS-EXEMPEL

- SIEM-system för analys och identifiering av avvikelser
- EDR/XDR-verktyg
- Mekanismer för att minimera falska positiva/negativa
- Mappning av use cases till potentiella risker

### 2.3 - Vad ska loggas

#### VÄGLEDNING

Basera listan på riskbedömningsresultat
Loggar ska där lämpligt inkludera:
- a) Relevant utgående och inkommande nätverkstrafik
- b) Skapande, ändring eller radering av användare och utökning av behörigheter
- c) Åtkomst till system och applikationer
- d) Autentiseringsrelaterade händelser
- e) All privilegierad åtkomst och aktiviteter av administrativa konton
- f) Åtkomst eller ändringar av kritiska konfigurations- och backup-filer
- g) Händelseloggar och loggar från säkerhetsverktyg (antivirus, IDS, brandväggar)
- h) Användning av systemresurser och deras prestanda
- i) Fysisk åtkomst till anläggningar
- j) Åtkomst till och användning av nätverksutrustning och enheter
- k) Aktivering, stopp och paus av olika loggar
- l) Miljöhändelser
- Kritisk konfiguration avser:

- Inställningar vitala för korrekt funktion, säkerhet och prestanda
- Ändringar eller felkonfigurationer kan ha betydande påverkan

#### BEVIS-EXEMPEL

- Loggfilsprover som innehåller de obligatoriska elementen
- Aktuella och historiska DNS- och DHCP-loggar

### 2.4 - Granska och larm

#### VÄGLEDNING

- Överväg anomalidetektering eller adaptiva larmtrösklar som komplement
- Säkerställ procedurer för att detektera nätverksbaserade attacker:

- Anomala in/utgående trafikmönster
- DoS-attacker

- Sätt larmtrösklar i linje med riskbedömning, exempel:

- Nätverkstrafik: Trafikvolymspikar som överstiger 50% av normal trafik på 10 minuter på specifik port
- Åtkomst till system: 3+ kontolåsningar inom 15 minuter
- Privilegierad åtkomst: 2+ instanser av privilegieeskalering inom 24 timmar
- Antivirus: Malware detekterad på flera endpoints inom kort tidsram
- Systemresursanvändning: Installation av otillåten mjukvara inom kort tidsram

- ⚠️ Viktigt om privilegierad åtkomst: Systemet ska skilja mellan:

- (a) Administrativa privilegietilldelningshändelser (skapande/befordran av konton)
- (b) Användning av befintliga privilegierade konton av auktoriserad personal
- Omedelbar varning vid obehörig/oväntad privilegietilldelning
- Beteendebaserad tröskelvarning (≥2 privilegieeskaleringar inom 24 timmar) för övervakning av legitim administrativ åtkomst

#### BEVIS-EXEMPEL

- Regelbundna rapporter som sammanfattar loggdata och framhäver anomalier
- Larmtrösklar inställda
- Register från tidigare larm när trösklar överskreds
- Befintliga arbetsflöden som triggar händelserapportering

### 2.5 - Underhålla och säkerhetskopiera loggar

#### VÄGLEDNING

- Lagringsperiod definieras enligt:

- Affärsbehov
- Riskbedömningsresultat
- Juridiska krav/skyldigheter

- Backup-underhållsperioden ska inte vara kortare än logggranskningsperioden
- Lagringsperioden ska överensstämma med backup-krav (punkt 4.2.2(f))
- Radera data när lagringsperioden upphör
- Skyddsmekanismer för att förhindra obehörig åtkomst/ändringar:

- Kryptering
- Åtkomstkontroll
- Hashning (avsnitt 9.2)
- Loggning av all åtkomst och ändringar till loggfiler

- Åtkomstkontrollen ska vara i linje med punkt 4.2.2(d)

#### BEVIS-EXEMPEL

- Lagringsperiod inställd
- Period överensstämmer med backup-krav och är kortare än granskningsperiod
- Logghantering på plats
- Loggar innehåller inte data vars lagringsperiod gått ut
- Åtkomstkontrollmekanismer på plats

### 2.6 - Tidssynkronisering och redundans

#### VÄGLEDNING

- För tidssynkronisering, överväg:

- Använd NTP-servrar eller PTP för noggrann tidssynkronisering
- Använd autentiserad NTP för att förhindra manipulation
- Konfigurera central tidsserver inom organisationen som synkar med pålitlig extern källa
- Använd flera tidskällor för att undvika single point of failure
- Planera tidssynkronisering över on-premises system, molntjänster och SaaS-plattformar

- Tillgångar som loggas ska markeras i tillgångsregistret (punkt 12.4)
- Implementera åtgärder för att skydda loggdata mot förlust:

- Redundant lagring över flera platser (moln, sekundära servrar)
- Bevarande av bearbetade logghändelser i strukturerade system
- Bevarande av härledda säkerhetsinsikter (varningar, metrics)
- I linje med backup-krav (punkt 4.2)

- Distribuera separata verktyg för att övervaka kapacitet och tillgänglighet hos primära övervaknings- och loggningssystem

#### BEVIS-EXEMPEL

- Mekanismer för tidssynkronisering av loggar
- Mekanismer för redundant logglagring
- Loggar från verktyg som övervakar primära systemens kapacitet och tillgänglighet

#### TIPS


💡 Entitetsriskanalys bör inkludera definition av stratumnivå för tidsynkronisering

### 2.7 - Granska procedurer och lista

#### VÄGLEDNING

- Bestäm granskningsfrekvens baserat på:

- Riskbedömningsresultat relaterade till tillgångarnas kritikalitet
- Minst årligen

- Inkludera testning av övervaknings- och loggningsprocedurer i säkerhetstestning (avsnitt 6.5)
- Granska slumpmässigt urval av loggar för att verifiera att alla tillgångar som ska loggas faktiskt gör det

#### BEVIS-EXEMPEL

- Granskningsplaner eller scheman

#### TIPS


💡 Dokumentera procedurer för övervakning och loggning

💡 Bedöm frekvensen för övervakningsaktiviteter för att säkerställa tillräckligt stöd för riskbaserade säkerhetsbeslut

💡 Säkerställ att personuppgifter i loggar inte behandlas i onödan; vid behov, extra skyddsnivå efter dataskyddskonsekvensbedömning

💡 Bestäm loggbaslinjer enligt affärsbehov och kapacitet:

- Strukturerad eller semi-strukturerad format istället för ostrukturerat
- Konsekvent dataformat enligt valda verktyg och välkända standarder (JSON, XML)
- Loggnivå enligt tillgångens klassificering (högre nivå för högklassificerade tillgångar)
- Standard för tidsstämplar (ISO-8601, RFC 3339, RFC 9557)


💡 Varje loggpost bör innehålla metadata:

- Loggnivå
- Tidsstämpel
- Källidentifierare (applikation/enhet)
- Unik identifierare för posten


💡 Korrelera data från olika källor, om tillämpligt

💡 Välj verktyg för endpoint-övervakning och skydd

💡 Välj verktyg för realtidsinsamling och analys av nätverkstrafik (NDR - Network Detection and Response)

## 3 HÄNDELSERAPPORTERING

### 3.1 - Enkel rapporteringsmekanism

#### VÄGLEDNING

- Definiera vad som utgör en misstänkt händelse baserat på:

- Påverkan på konfidentialitet, integritet eller tillgänglighet
- Uthållighet (pågående eller inte)
- Påverkan (antal tillgångar potentiellt påverkade)
- Efterlevnadsbrott mot regler eller policyer

- Utveckla tydliga riktlinjer för vad som ska inkluderas i rapport:

- Datum och tid för händelsen
- Beskrivning av händelsen
- Relevanta skärmdumpar, loggar eller andra bevis
- Kontaktinformation för uppföljning

- Tillhandahåll flera kanaler för rapportering:

- E-post
- Webbformulär
- Dedikerad telefonlinje
- Mobilapp

- Säkerställ att kanalerna är lättillgängliga och intuitiva

#### BEVIS-EXEMPEL

- Dokumenterad mekanism som beskriver rapporteringsprocessen
- Exempel på rapporteringsmallar
- Personal medveten om mekanismen och vem de ska kontakta
- Flera rapporteringskanaler tillgängliga (e-post, webbformulär, telefon, portaler)

#### TIPS


💡 Söker konsistens med rapporteringsmallar som krävs av nationell CSIRT/behörig myndighet

### 3.2 - Kommunicera och träna

#### VÄGLEDNING

- Gör rapporteringsmedel tillgängliga för personal, leverantörer och kunder
- Överväg anonym rapportering för att uppmuntra rapportering utan rädsla för repressalier
- Ta hänsyn till juridiska skyldigheter att rapportera till behöriga myndigheter (CSIRT) enligt NIS2-direktivets artiklar 23 och 30
- Påminn regelbundet intressenter om rapporteringsmekanismen via:

- E-postnyhetsbrev
- Affischer
- Andra kommunikationskanaler

- Genomför regelbundna övningar eller simuleringar för att testa rapporteringsmekanismens effektivitet

#### BEVIS-EXEMPEL

- Bevis på tidigare kommunikation och händelserapportering
- Dokumenterade procedurer för händelsekommunikation
- Utbildningsmaterial för anställda, leverantörer och kunder
- Periodiska simuleringar för att bedöma beredskap

#### TIPS


💡 Föra register över alla rapporterade händelser

💡 Säkerställ efterlevnad av andra relevanta regler om dataskydd, konfidentialitet och incidentrapportering

💡 Be om juridisk rådgivning vid behov

💡 Utvärdera tidigare kommunikation och rapportering om händelser

💡 Granska och uppdatera rapporteringsmekanismen baserat på ändringar eller tidigare händelser
BEVIS-EXEMPEL (för TIPS):

- Register över händelser med påverkan, orsak, åtgärder och lärdomar
- Sammanfattningar av tidigare granskningar

## 4 HÄNDELSEBEDÖMNING OCH KLASSIFICERING

### 4.1 - Bedöma om händelse är incident

#### VÄGLEDNING

Använd kriterier för att bedöma om misstänkt händelse är incident:

Samma kriterier som i avsnitt 1.1 (se kategoriseringssystem)

Bestäm art och allvarlighetsgrad baserat på kategoriseringssystem (punkt 1.1(a))

#### BEVIS-EXEMPEL

- Definierade kriterier på plats
- Kategoriseringssystem enligt punkt 1.1(a)

### 4.2 - Bedömningsprocess

#### VÄGLEDNING

I procedurer (punkterna 1.1 och 1.2), inkludera aktiviteter som:

Samla relevant information och bevis relaterat till händelsen
Analysera potentiell påverkan på system, data och verksamhet
Bestämma allvarlighetsgrad baserat på fördefinierade kriterier

Implementera playbooks eller runbooks för vanliga incidenttyper:

Ransomware
Phishing
Data-/enhetsförlust
Brand

Klassificera händelser baserat på:

Låg, medium, hög eller kritisk allvarlighetsgrad
Incidenttyper (malware-infektion, obehörig åtkomst)
Regulatoriska eller efterlevnadskonsekvenser

Prioritera händelsen enligt kriterier i kategoriseringssystemet (incidenthanteringspolicy, punkt 1.1)
Genom grundorsaksanalys, bestäm återkommande instanser av incident
Granska och korrelera loggar enligt punkt 2
Bedöm tidigare händelser och deras klassificering för att förbättra processer

#### BEVIS-EXEMPEL

- Dokumenterade procedurer för händelsebedömning
- Kriterier för prioritering
- Process för triagering av inkommande varningar
- Playbooks för vanliga incidenttyper
- Periodiska granskningar av bedömning och klassificering

#### TIPS


💡 Överväg att distribuera SIEM, EDR, XDR eller liknande system för korrelering och analys

💡 Använd automation för att triage inkommande varningar och prioritera

💡 Integrera säkerhetshändelser i central SIEM eller EDR/XDR-lösning

💡 Ta hänsyn till konfidentialitet vid loggkorrelering och analys genom:

Minimera insamlad data
Anonymisera eller pseudonymisera när möjligt
Tillämpa god säkerhetspraxis (åtkomstkontroll, kryptering, audits)
Tillämpa dataretentionspolicy enligt GDPR
Överväg dataskydd och juridiska skyldigheter utöver NIS2

BEVIS-EXEMPEL (för TIPS):

- SIEM, EDR/XDR eller liknande system
- Verktyg för incident-triagering
- Åtgärder för informationssäkerhet under logganalys

## 5 INCIDENTRESPONS

### 5.1 - Svara på incidenter

#### VÄGLEDNING

Etablera dedikerat incidentresponsteam med nödvändig teknisk expertis och auktoritet, där lämpligt
Definiera roller och ansvar inom teamet:

Incidentkoordinatorer
Analytiker
Kommunikationskontakter

Ta hänsyn till branscherkända standarder vid utveckling av incidentresponsprocedurer
Implementera playbooks eller runbooks för vanliga incidenttyper

#### BEVIS-EXEMPEL

- Tilldelning av roller inom incidentresponsteamet
- Dokumenterade standarder/bästa praxis som beaktats
- Playbooks eller incidentresponsplaner för vanliga incidenttyper

### 5.2 - Responsfaser

#### VÄGLEDNING

Skapa incidentresponsprocedurer som täcker:
- a) Incident containment (inneslutning) - förhindra spridning av konsekvenser
- b) Eradication (utrotning) - förhindra att incidenten fortsätter eller återkommer
- c) Recovery (återhämtning) - vid behov
- Säkerställ att hantering tar hänsyn till:

- Entitetens prioriteringar
- Incidentens påverkan

- Känn igen och hantera potentiella konflikter mellan:

- Forensiska aktiviteter - bevara bevis för juridiska/compliance/utredningssyften
- Incidentresponsaktiviteter - mildra och ta bort aktuella hot
- Operationell kontinuitet - minimera störningar

- Vid konflikter, etablera beslutsprocess som:

- Prioriterar baserat på accepterade risktoleransnivåer, affärspåverkan och juridiska skyldigheter
- Involverar koordinering mellan cybersäkerhet, juridik/compliance och operationella team
- Dokumenterar motivering för prioriteringsbeslut

- Utveckla playbooks som inkorporerar beslutsfattande och eskaleringsvägar
- Håll ledningen informerad

#### BEVIS-EXEMPEL

- Procedurer för incidentrespons med detaljerad beskrivning för varje incidenttyp
- Register från lösning av motstridiga mål under respons på tidigare incidenter

### 5.3 - Kommunikationsplaner

#### VÄGLEDNING

- Säkerställ att kommunikationsplanen (punkt 1.1) inkluderar:
- a) Procedurer för kommunikation med CSIRT/behöriga myndigheter om incidentnotifiering
- b) Procedurer för kommunikation med relevanta interna och externa intressenter (kunder, leverantörer, open source-projektkontakter om FOSS används)
- Inkludera kontaktinformation för nyckelpersonal, externa intressenter och relevanta myndigheter

#### BEVIS-EXEMPEL

- Procedurer för kommunikation med CSIRT/myndigheter
- Procedurer för kommunikation med kunder/leverantörer

### 5.4 - Logga responsaktiviteter

#### VÄGLEDNING

- Logga incidentresponsinformation som innehåller:

- Tid för upptäckt, inneslutning och utrotning
- När system återhämtades
- Indicators of compromise (IoC)
- Grundorsak
- Åtgärder under varje fas (upptäckt, inneslutning, utrotning)
- Bedömning av omfattning och påverkansnivå
- Kommunikation under respons
- Lärdomar och rekommendationer efter incident
- Om CSIRT/behörig myndighet notifierades enligt NIS2-direktivets artiklar 23 och 30

#### BEVIS-EXEMPEL

- Loggar från incidentrespons
- Användning av system (SIEM, EDR/XDR eller ticketsystem)

### 5.5 - Testa responsprocedurer

#### VÄGLEDNING

- Testa incidentresponsprocedurer minst årligen
- Testa olika incidenttyper:

- Ransomware
- Phishing
- Dataintrång
- DoS

- Säkerställ att testscenarier involverar:

- Anställda från olika avdelningar
- Externa intressenter (leverantörer, tjänsteleverantörer)
- Ledningen där nödvändigt

- Genomför post-test-granskningar för lärdomar
- Uppdatera procedurer baserat på lärdomar från tester

#### BEVIS-EXEMPEL

- Dokumenterade planer/scheman för framtida incidentresponstester
- Register från tester av olika incidenttyper

#### TIPS


💡 Utfärda instruktioner för de vanligaste incidenttyperna (inneslutning, utrotning, återhämtningssteg)

💡 Inkludera riktlinjer för bevarande av bevis och kedja av bevis

💡 Överväg automatiserade lösningar för incidentrespons (SOAR - Security Orchestration, Automation and Response)
BEVIS-EXEMPEL (för TIPS):

- Uppdaterade incidentresponsprocedurer baserade på genomförda tester

## 6 EFTERGRANSKNINGAR AV INCIDENTER

### 6.1 - Genomföra post-incident reviews

#### VÄGLEDNING

Genomför grundorsaksanalys och identifiera grundorsak där möjligt
Identifiera bidragande faktorer och förbättringsområden i:

Incidentupptäckt
Respons
Återhämtningsprocesser

Undersök betydande incidenter och skriv slutliga incidentrapporter med:

Åtgärder som vidtogs
Rekommendationer för att mildra framtida förekomst

Dokumentera lärdomar med rekommendationer och ägare, baserat på loggar (punkt 5.4)
Dela relevanta fynd med berörda intressenter (leverantörer, tjänsteleverantörer, FOSS-komponentunderhållare)

#### BEVIS-EXEMPEL

- Resultat av grundorsaksanalys
- Individuella rapporter om hantering av betydande incidenter
- Dokumenterade lärdomar från incidenter

### 6.2 - Bidra till förbättringar

#### VÄGLEDNING

Analysera fynd för att identifiera luckor och svagheter i säkerhetsstatusen
Säkerställ att identifierade luckor återkopplas till:

Riskbedömning
Riskbehandlingsplan (punkt 2.1)
Bedöm om befintliga riskbehandlingsåtgärder** var effektiva
Dokumentera fynd och lärdomar omfattande
Överväg om informationssäkerhetskrav har uppfyllts under hanteringen (t.ex. behöver lösenord för nödåtkomst återställas?)

#### BEVIS-EXEMPEL

- Post-incident review-rapporter med fynd, lärdomar och rekommendationer
- Analys, lösning och mildringsåtgärder kommunicerade till relevant personal
- Uppdaterad riskbedömning och riskbehandlingsplan med fynd från post-incident reviews

### 6.3 - Granska om incidenter lett till reviews

#### VÄGLEDNING

Genomför årlig granskning eller granskning efter betydande incidenter för att avgöra om incident har lett till post-incident review

#### BEVIS-EXEMPEL

- Dokumenterade planer/scheman för framtida granskningar

#### TIPS


💡 Bestäm sammansättning av granskningsteamet (IT, säkerhet, juridik, ledning)

💡 Granska befintliga säkerhetspolicyer mot ljuset av lärdomar från post-incident reviews
BEVIS-EXEMPEL (för TIPS):

- Mötesprotokoll från post-incident review-teamet
- Bevis på uppdateringar av policyer baserat på lärdomar

MAPPNINGAR TILL STANDARDER
ISO/IEC 27001:2022 & ISO/IEC 27002:2022
Incidenthantering mappas till:

Clause 5.24 - Information security incident management planning and preparation
Clause 5.25 - Assessment and decision on information security events
Clause 5.26 - Response to information security incidents
Clause 5.27 - Learning from information security incidents
Clause 5.28 - Collection of evidence
Clause 8.15 - Logging
Clause 8.16 - Monitoring activities

NIST Cybersecurity Framework 2.0
Incidenthantering mappas till:
- DETECT (DE):

- DE.AE: Anomalies and Events
- DE.CM: Continuous Monitoring

- RESPOND (RS):

- RS.AN: Analysis
- RS.CO: Communications
- RS.MA: Management of Response Activities
- RS.RP: Response Planning

- RECOVER (RC):

- RC.RP: Recovery Planning
- RC.CO: Recovery Communications

- NIST SP 800-61 Rev. 2
- "Computer Security Incident Handling Guide" - Detta är en nyckelstandard som ENISA hänvisar till för:

- Incident response life cycle
- Incident detection and analysis
- Containment, eradication, and recovery
- Post-incident activities

- NIST SP 800-53 Rev. 5
- Specifika kontroller:

- AU (Audit and Accountability) - för loggning och övervakning
- IR (Incident Response) - för incidenthantering
- SI (System and Information Integrity) - för övervakning

- ETSI EN 319 401 V3.1.1 (2024-06)
- För betrodda tjänsteleverantörer - specifika krav på incidenthantering
- ISO/IEC 27035 Series
- Omfattande standard för incidenthantering:

- ISO/IEC 27035-1:2023 - Part 1: Principles and process
- ISO/IEC 27035-2:2023 - Part 2: Guidelines to plan and prepare for incident response

- Denna standard ger detaljerad vägledning om:

- Incidenthanteringsprocesser
- Kategorisering av incidenter
- Grundorsaksanalys

- CEN/TS 18026:2024
- Europeisk teknisk specifikation för cybersäkerhetshantering

- SAMMANFATTNING AV KRITISKA PUNKTER
- Obligatoriska minimikrav:
- ✅ Policy och procedurer:

- Dokumenterad incidenthanteringspolicy
- Kategoriseringssystem för incidenter
- Kommunikationsplan
- Definierade roller och ansvar

- ✅ Övervakning och loggning:

Procedurer och verktyg för övervakning
Automatiserad övervakning där möjligt
Loggning av 12 specificerade kategorier
Tröskelvärden för larm
Logglagring och backup
Tidssynkronisering
Minst årlig granskning

- ✅ Händelserapportering:

Enkel rapporteringsmekanism för alla (anställda, leverantörer, kunder)
Utbildning i användning av mekanismen

- ✅ Bedömning och klassificering:

Fördefinierade kriterier
Bedömning av återkommande incidenter kvartalsvis
Loggkorrelering och analys
Omvärdering vid ny information

- ✅ Incidentrespons:

Dokumenterade procedurer
Containment, eradication och recovery
Kommunikationsplaner
Loggning av responsaktiviteter
Minst årlig testning

- ✅ Post-incident reviews:

Genomföra där lämpligt
Identifiera grundorsak
Dokumentera lärdomar
Återkoppla till riskhantering
Granska om incidenter lett till reviews

Testning och granskning:
- 🔄 Minst årligen:

- Testa och granska incidenthanteringspolicy
- Granska övervaknings- och loggningsprocedurer
- Testa incidentresponsprocedurer
- Granska om incidenter lett till post-incident reviews

- 🔄 Dessutom vid:

- Betydande incidenter
- Betydande förändringar i verksamhet eller risker

- Rutin för hantering av incidenter
- Baserad på ENISA:s vägledning för NIS2-direktivet

- DOKUMENTINFORMATION
- DokumenttypIncidenthanteringsrutinVersion1.0Datum[Datum]Godkänd av[Ledning/VD]Nästa granskning[Datum + 1 år]Ägare[CISO/Säkerhetsansvarig]DistributionslistaAlla anställda, relevanta leverantörer

1. SYFTE OCH OMFATTNING
1.1 Syfte
- Denna rutin beskriver hur [Organisationens namn] ska:

- Upptäcka och rapportera säkerhetshändelser
- Bedöma och klassificera incidenter
- Svara på och hantera incidenter
- Återhämta sig från incidenter
- Lära sig av incidenter

1.2 Omfattning
- Rutinen gäller för:

- Alla anställda
- Konsulter och inhyrd personal
- Leverantörer med tillgång till våra system
- Alla system, nätverk och tjänster som [Organisationens namn] använder

1.3 Relaterade dokument

- Informationssäkerhetspolicy
- Riskhanteringsplan
- Business Continuity Plan
- Kommunikationsplan vid kris
- Kontaktlista för säkerhetsincidenter

2. DEFINITIONER
- TermDefinitionHändelseEn identifierad förekomst som indikerar ett möjligt säkerhetsbrott eller kontrollfelMisstänkt händelseEn händelse som verkar ovanlig eller okänd och som kan vara ett säkerhetshotIncidentEn händelse som komprometterar tillgänglighet, autenticitet, integritet eller konfidentialitet hos data eller tjänsterBetydande incidentEn incident som uppfyller kriterierna i nationell lagstiftning och kräver rapportering till myndigheterGrundorsakDen underliggande orsaken till en incident

3. ROLLER OCH ANSVAR
3.1 Incidentresponsteam (IRT)
- RollAnsvarPerson/AvdelningIncidentkoordinator- Övergripande ansvar för incidenthantering- Beslut om eskalering- Kommunikation med ledning[Namn/Roll]IT-säkerhetsansvarig (CISO)- Teknisk ledning- Kontakt med CSIRT/myndigheter- Godkänna åtgärder[Namn/Roll]IT-forensiker- Samla in och bevara bevis- Teknisk analys- Dokumentation[Namn/Roll]IT-drift- Implementera tekniska åtgärder- Återställning av system- Logganalys[Avdelning]Kommunikationsansvarig- Intern kommunikation- Extern kommunikation (vid behov)- Kundkommunikation[Namn/Roll]Juridisk rådgivare- Juridisk rådgivning- GDPR-aspekter- Kontraktsaspekter[Internt/Externt]VD/Ledningsgrupp- Strategiska beslut- Resurstilldelning- Godkännande av kommunikation[Ledning]
3.2 Alla medarbetares ansvar

- Rapportera misstänkta händelser omedelbart
- Följa instruktioner från incidentresponsteamet
- Inte prata med media utan godkännande
- Dokumentera vad de observerat

3.3 Ersättare
- Varje nyckelroll ska ha minst en utsedd ersättare.
- Ersättarschema:
- RollPrimärErsättareIncidentkoordinator[Namn][Namn]IT-säkerhetsansvarig[Namn][Namn]IT-forensiker[Namn][Namn]

4. KATEGORISERING AV INCIDENTER
4.1 Allvarlighetsgrad
- NivåBeskrivningExempelResponstidKRITISKOmfattande påverkan på verksamhetskritiska system, stora dataintrång, hot mot människoliv- Ransomware på kärnaffärssystem- Storskalig dataexfiltrering- Långvarigt avbrott i kritisk tjänstOmedelbart(< 15 min)HÖGBetydande påverkan på verksamhet eller säkerhet, känslig data exponerad- Intrång i viktiga system- Målriktad attack- Exponering av känslig data< 1 timmeMEDELBegränsad påverkan, inga känsliga data påverkade, innehållbar incident- Malware på enskild arbetsstation- Mindre phishing-försök- Obehörigt åtkomstförsök< 4 timmarLÅGMinimal påverkan, snabbt åtgärdad, ingen dataexponering- Generisk spam- Misslyckade inloggningsförsök- Policy-brott utan säkerhetspåverkan< 24 timmar
4.2 Incidenttyper
- Vanliga incidenttyper vi kan stöta på:

- Skadlig kod (malware, ransomware, virus)
- Phishing och social engineering
- Obehörig åtkomst (intrång, stulna credentials)
- Denial of Service (DoS/DDoS)
- Dataläckage/dataintrång
- Insiderhot (uppsåtliga eller oavsiktliga)
- Fysiska säkerhetshändelser
- Systemfel som påverkar säkerhet
- Leverantörssäkerhetshändelser
- Policy-överträdelser med säkerhetspåverkan

4.3 Återkommande incidenter
- Definition: Samma typ av incident som inträffar minst 3 gånger inom 12 månader med samma grundorsak.
- Åtgärd: Kräver särskild analys och åtgärdsplan för att eliminera grundorsaken.

5. RAPPORTERING AV HÄNDELSER
5.1 Hur rapporterar jag en misstänkt händelse?
- Rapporteringskanaler (använd minst EN):
- KanalNär/HurKontaktuppgifter🔴 Akut telefonlinjeVid KRITISKA händelser, 24/7Tel: [Nummer]📧 Säkerhets-emailVid MEDEL/LÅG händelsersecurity@[företag].se🌐 WebbformulärAlla händelser, anonym rapportering möjlig[Intranät-länk]💬 Säkerhets-chatUnder kontorstid[Teams/Slack-kanal]👤 DirektkontaktDin chef eller säkerhetsansvarig[Kontaktuppgifter]
5.2 Vad ska jag rapportera?
- Rapportera ALLTID om du misstänker:

- Du har fått ett misstänkt e-postmeddelande (phishing)
- Din dator beter sig konstigt
- Du har klickat på en misstänkt länk
- Du upptäcker okända filer eller program
- Du ser obehörig åtkomst till system
- Du förlorat en enhet (laptop, telefon, USB)
- Du upptäcker att data exponerats
- System är ovanligt långsamma
- Du får varningar från säkerhetsverktyg
- Något annat som känns "fel"

- ⚠️ VIKTIGT: Det är ALLTID bättre att rapportera en falsk larm än att missa en riktig incident!
5.3 Vilken information ska ingå i rapporten?
- Grundläggande information:

- Datum och tid - När upptäckte du händelsen?
- Vad hände? - Beskriv med egna ord
- Vilka system påverkades? - Dator, server, tjänst, etc.
- Skärmdumpar/bevis - Ta skärmdumpar om möjligt
- Dina kontaktuppgifter - För uppföljning

- Mall för händelserapport:
- HÄNDELSERAPPORT

- Datum/Tid för upptäckt: ___________________________
- Rapporterad av: ___________________________________
- Kontaktuppgifter: _________________________________

- BESKRIVNING:
- [Beskriv vad som hänt med egna ord]

- PÅVERKADE SYSTEM:
- □ Arbetsstation/laptop (vilken?): _________________
- □ Server/tjänst (vilken?): ______________________
- □ Nätverk/internet
- □ E-post
- □ Annat: ________________________________________

BEVIS (bifoga om möjligt):
- □ Skärmdumpar
- □ E-postmeddelanden
- □ Loggfiler
- □ Annat: ________________________________________

- REDAN VIDTAGNA ÅTGÄRDER:
- [Vad har du redan gjort?]

- ALLVARLIGHETSGRAD (din bedömning):
- □ Kritisk - Omedelbar åtgärd krävs!
- □ Hög - Brådskande
- □ Medel
- □ Låg

- ÖVRIG INFORMATION:
5.4 Vad händer efter min rapport?
- Bekräftelse:

- Du får bekräftelse inom 15 minuter (kritiska händelser)
- Du får bekräftelse inom 2 timmar (andra händelser)

- Uppföljning:

- Incidentresponsteamet tar över
- Du kan bli kontaktad för mer information
- Du får uppdateringar om åtgärder (vid behov)

- Anonymitet:

- Anonym rapportering är möjlig via webbformuläret
- Vid behov av uppföljning behövs dock kontaktuppgifter

5.5 Vad ska jag INTE göra?
- ❌ GÖR INTE:

- Försök inte "fixa" problemet själv (vid säkerhetsincident)
- Radera inte bevis (loggar, e-post, filer)
- Stäng inte av datorn (förrän du fått instruktion)
- Prata inte med media eller sociala medier
- Diskutera inte incidenten offentligt
- Vänta med att rapportera "för att vara säker"

- ✅ GÖR:

- Rapportera omedelbart
- Ta skärmdumpar om möjligt
- Notera vad du såg och gjorde
- Följ instruktioner från säkerhetsteamet
- Koppla bort från nätverk om instruerad (vid malware)

6. INCIDENTHANTERINGSPROCESS
6.1 Processöversikt
- ┌─────────────────────────────────────────────────────────────┐
- │                    INCIDENTHANTERINGSPROCESS                 │
- └─────────────────────────────────────────────────────────────┘

1. UPPTÄCKT & RAPPORTERING
   - ↓
2. INITIAL BEDÖMNING (Är det en incident?)
   - ↓
3. KLASSIFICERING (Allvarlighetsgrad & typ)
   - ↓
4. AKTIVERA INCIDENTRESPONSTEAM
   - ↓
5. CONTAINMENT (Isolera & begränsa skada)
   - ↓
6. ERADICATION (Ta bort hotet)
   - ↓
7. RECOVERY (Återställ system & tjänster)
   - ↓
8. POST-INCIDENT REVIEW (Lär av incidenten)
   - ↓
9. DOKUMENTATION & RAPPORTERING
6.2 Fas 1: Upptäckt och rapportering
- Ansvarig: Alla medarbetare + Övervakningssystem
- Aktiviteter:

- Händelse upptäcks (manuellt eller automatiskt)
- Rapporteras via etablerade kanaler
- Registreras i incidenthanteringssystem

- Utdata:

- Händelserapport
- Incidentnummer tilldelas

- Tidsgräns: Omedelbart vid upptäckt

6.3 Fas 2: Initial bedömning
- Ansvarig: IT-säkerhetsansvarig eller Jourhavande IT
- Aktiviteter:
2.1 Verifiera händelsen:

- Är rapporten giltig?
- Kan den bekräftas i loggar/system?

2.2 Första bedömningen:

- Är detta en incident eller "bara" en händelse?
- Påverkas konfidentialitet, integritet eller tillgänglighet?

2.3 Beslut:
- OM det INTE är en incident:
   - → Dokumentera och stäng
   - → Återkoppla till rapportören
   - → Inget mer behövs

- OM det ÄR en incident:
   - → Fortsätt till Fas 3 (Klassificering)
- Utdata:

- Beslut: Incident JA/NEJ
- Initial bedömning dokumenterad

- Tidsgräns:

- Kritiska händelser: 15 minuter
- Andra händelser: 2 timmar

6.4 Fas 3: Klassificering och prioritering
- Ansvarig: IT-säkerhetsansvarig + Incidentkoordinator
- Aktiviteter:
3.1 Klassificera allvarlighetsgrad:
- Använd klassificeringsmatris (se avsnitt 4.1):

- KRITISK
- HÖG
- MEDEL
- LÅG

3.2 Identifiera incidenttyp:

- Malware/Ransomware
- Phishing
- Intrång
- DoS
- Dataläckage
- Annat (se avsnitt 4.2)

3.3 Bedöm påverkan:
- FaktorFrågor att besvaraAffärspåverkanVilka tjänster/processer påverkas?DatakänslighetVilken typ av data är exponerad?OmfattningHur många system/användare?Juridisk påverkanFinns rapporteringsskyldighet? (GDPR, NIS2)ReputationspåverkanRisk för negativ publicitet?
3.4 Kontrollera återkommande incident:

- Har liknande incident inträffat inom 12 månader?
- Har samma grundorsak?
- OM JA → Markera som återkommande incident

3.5 Beslut om eskalering:
- KRITISK → Aktivera HELA incidentresponsteamet + Informera VD OMEDELBART
- HÖG     → Aktivera incidentresponsteamet + Informera ledning
- MEDEL   → IT-säkerhet + IT-drift hanterar
- LÅG     → IT-drift hanterar enligt rutin
- Utdata:

- Klassificering dokumenterad
- Prioritet fastställd
- Beslut om eskalering
- Incidentresponsteam aktiverat (vid behov)

- Tidsgräns:

- KRITISK: 15 minuter från bekräftad incident
- HÖG: 30 minuter
- MEDEL/LÅG: 1 timme

6.5 Fas 4: Aktivera incidentresponsteam
- Ansvarig: Incidentkoordinator
- Aktiviteter (för KRITISKA och HÖGA incidenter):
4.1 Kalla in teamet:

- Använd kontaktlista (se avsnitt 3.1)
- Använd primär kontakt, annars ersättare
- Alla ska bekräfta mottagande inom 15 min

4.2 Sätt upp incident war room:

- Fysisk plats: [Konferensrum X]
- Virtuell plats: [Teams/Zoom-länk]
- Delad dokumentation: [SharePoint/Drive-länk]

4.3 Första mötet (inom 30 min):
- Agenda:

- Situationsöversikt (5 min)
- Bekräfta klassificering (5 min)
- Tilldela specifika uppgifter (10 min)
- Beslut om omedelbara åtgärder (10 min)

4.4 Etablera kommunikation:

- Intern: Hur informerar vi anställda?
- Extern: Behöver vi informera kunder/partners?
- Myndigheter: Rapporteringsskyldighet? (Se avsnitt 9)

- Utdata:

- Incidentresponsteam aktiverat och på plats
- Initial handlingsplan
- Roller och uppgifter tilldelade
- Kommunikationsplan

- Tidsgräns: 30 minuter från eskalering

6.6 Fas 5: Containment (Inneslutning)
- Ansvarig: IT-säkerhetsansvarig + IT-drift
- Mål: Stoppa spridning och begränsa ytterligare skada
- Aktiviteter:
5.1 Kortsiktig containment (omedelbart):
- Åtgärder beroende på incidenttyp:
- IncidenttypContainment-åtgärderMalware/Ransomware- Isolera drabbade system från nätverk- Blockera skadliga IP-adresser i brandvägg- Inaktivera smittade användarkontonPhishing- Blockera avsändar-adress- Ta bort e-post från alla brevlådor- Återställ komprometterade lösenordIntrång- Inaktivera komprometterade konton- Ändra alla privilegierade lösenord- Isolera påverkade segmentDoS/DDoS- Aktivera DDoS-skydd- Kontakta ISP/CDN-leverantör- Implementera rate limitingDataläckage- Stoppa aktiv exfiltrering- Blockera obehörig åtkomst- Säkra expunerad data
5.2 VIKTIGT - Bevara bevis:
- INNAN du gör containment:

- Ta minnesdum p (RAM dump) av drabbade system
- Ta disk-images/snapshots
- Säkra loggar
- Ta skärmdumpar
- Dokumentera nätverksanslutningar

- Forensisk princip: Bevara bevis så att det kan användas juridiskt
5.3 Långsiktig containment:
- Efter omedelbar containment, implementera mer permanenta åtgärder:

- Patcha kända sårbarheter
- Förstärk åtkomstkontroller
- Implementera ytterligare övervakning
- Segmentera nätverk bättre

5.4 Konflikthantering:
- Vid konflikt mellan:

- Forensik (bevara bevis) ↔ Återställning (ta system i drift)
- Säkerhet (stäng av system) ↔ Verksamhet (behöver system)

- → Incidentkoordinatorn fattar beslut baserat på:

- Affärskritikalitet
- Juridisk påverkan
- Riskbedömning
- Dokumentera alltid beslutet och motivering!

- Utdata:

- Incidenten är innesluten
- Spridning stoppad
- Bevis säkrade
- Containment-åtgärder dokumenterade

- Tidsgräns:

- KRITISK: Påbörjas omedelbart, slutförs inom 1 timme
- HÖG: Inom 2 timmar
- MEDEL: Inom 4 timmar

6.7 Fas 6: Eradication (Utrotning)
- Ansvarig: IT-säkerhetsansvarig + IT-forensiker
- Mål: Ta bort hotet helt från miljön
- Aktiviteter:
6.1 Identifiera grundorsaken:

- Hur kom angriparen in?
- Vilken sårbarhet utnyttjades?
- Finns bakdörrar installerade?
- Finns persistent åtkomst kvar?

6.2 Ta bort hotet:
- Specifika åtgärder:
- HottypEradication-åtgärderMalware- Ta bort skadlig mjukvara från alla system- Verifiera att ingen persistens finns kvar- Skanna alla systemKomprometterade konton- Återställ ALLA lösenord (inte bara drabbade)- Revoke sessions/tokens- Granska behörigheterBakdörrar- Identifiera och ta bort alla backdoors- Granska alla administrativa konton- Kontrollera scheduled tasks/cron jobsSårbarheter- Patcha sårbarheten- Verifiera att patchen fungerar- Scanna för likn ande sårbarheterKomprometterad kod- Ta bort skadlig kod- Code review- Deploy ren version
6.3 Förstärk säkerheten:
- Efter att hotet är borttaget:

- Implementera åtgärder för att förhindra upprepning
- Förstärk övervakning av drabbade system
- Lägg till detektionsregler för liknande attacker
- Uppdatera brandväggsregler

6.4 Verifiera utrotning:
- Kontrollera att:

- Ingen skadlig aktivitet kvar
- Alla indicators of compromise (IoC) är borta
- Inga obehöriga konton finns
- Övervakning visar inga misstänkta aktiviteter

6.5 Dokumentera:

- Vad hittades
- Vad togs bort
- Hur hotet eliminerades
- Grundorsak
- Preventiva åtgärder

- Utdata:

- Hotet är helt eliminerat
- Grundorsak identifierad
- Preventiva åtgärder implementerade
- Verifiering genomförd
- Dokumentation komplett

- Tidsgräns:

- Beroende på incidentens komplexitet
- KRITISK: Prioriterat, kan ta flera dagar
- Progress rapporteras dagligen till ledning

6.8 Fas 7: Recovery (Återställning)
- Ansvarig: IT-drift + IT-säkerhetsansvarig
- Mål: Återställa normal drift på ett säkert sätt
- Aktiviteter:
7.1 Planera återställning:
- Besluta ordning för återställning baserat på:

- Affärskritikalitet (se BIA - Business Impact Analysis)
- Beroenden mellan system
- RTO (Recovery Time Objective) för varje tjänst
- RPO (Recovery Point Objective) för data

- Återställningsordning (exempel):
1. Kritiska infrastrukturtjänster (AD, DNS, nätv erk)
   - ↓
2. Kärnaffärssystem (ERP, produktionssystem)
   - ↓
3. Stödsystem (e-post, filservrar)
   - ↓
4. Mindre kritiska system
7.2 Återställ från backup (om nödvändigt):
- Process:

- Verifiera att backup är ren (ej infekterad)
- Testa återställning i isolerad miljö först
- Återställ data enligt RPO
- Verifiera integritet

7.3 Återbygga system (vid behov):
- Om system måste byggas om från grunden:

- Använd rena OS-images
- Installera från verifierade källor
- Applicera alla säkerhetspatchar
- Konfigurera enligt security baseline
- Implementera förstärkta säkerhetsåtgärder

7.4 Återställ funktionalitet stegvis:
- Steg-för-steg återställning:
- STEG 1: Återställ i isolerad miljö
        - → Testa funktionalitet
        - → Verifiera säkerhet
        - ↓
- STEG 2: Återställ i produktionsmiljö (begränsad)
        - → Pilot med små användargrupper
        - → Intensiv övervakning
        - ↓
- STEG 3: Fullständig återställning
        - → Öppna för alla användare
        - → Fortsatt övervakning
7.5 Verifiering:
- Kontrollera att:

- System fungerar som förväntat
- Data är intakt och korrekt
- Inga säkerhetsvarningar
- Prestanda är normal
- Användare kan arbeta normalt
- Ingen återinfektion sker

7.6 Förstärkt övervakning:
- Under återställningsfas och 2-4 veckor därefter:

- Intensifierad loggning
- Daglig granskning av säkerhetsloggar
- Extra uppmärksamhet på drabbade system
- Regelbundna sårbarhetsscanningar

7.7 Kommunikation:
- Informera:

- Användare: När system är tillgängliga igen
- Kunder: Om tjänster påverkats
- Ledning: Status på återställning
- Myndigheter: Slutrapport (om tillämpligt)

- Utdata:

- System återställda till normal drift
- Verifiering genomförd
- Förstärkt övervakning aktiv
- Användare informerade
- Dokumentation av återställning

- Tidsgräns:

- Enligt RTO för respektive system (definierat i BCP)
- Progress rapporteras var 4:e timme (KRITISKA incidenter)

6.9 Fas 8: Post-Incident Review (Eftergranskning)
- Ansvarig: Incidentkoordinator + Hela incidentresponsteamet
- Mål: Lära av incidenten och förbättra säkerheten
- Aktiviteter:
8.1 Tidpunkt för review:

- KRITISKA incidenter: Inom 1 vecka efter avslutad incident
- HÖGA incidenter: Inom 2 veckor
- MEDEL/LÅG: Kvartalsvis sammanställning

8.2 Post-Incident Review-möte:
- Deltagare:

- Hela incidentresponsteamet
- Berörda avdelningschefer
- Representant från ledningen (för kritiska incidenter)

- Agenda (2-3 timmar):
- Del 1: Faktainsamling (30 min)

- Vad hände? (tidslinje)
- Hur upptäcktes det?
- Hur hanterades det?

- Del 2: Grundorsaksanalys (45 min)

- Varför hände det?
- Vilka sårbarheter utnyttjades?
- Vilka kontroller misslyckades?

- Använd "5 Whys"-metoden:
- Problem: Ransomware infekterade flera servrar

- Varför? → Användare öppnade skadlig bilaga
- Varför? → Användaren kunde inte identifiera phishing
- Varför? → Otillräcklig utbildning i att känna igen phishing
- Varför? → Ingen regelbunden säkerhetsutbildning finns
- Varför? → Ingen budget/prioritering för säkerhetsutbildning

- GRUNDORSAK: Avsaknad av strukturerad säkerhetsutbildning
- Del 3: Utvärdera respons (30 min)
- Vad fungerade bra?

- Snabb upptäckt?
- Effektiv kommunikation?
- Snabb containment?
- Bra dokumentation?

- Vad fungerade dåligt?

- Förseningar?
- Kommunikationsbrister?
- Avsaknad av verktyg/kunskaper?
- Otydliga roller?

- Del 4: Förbättringsåtgärder (45 min)
- Identifiera förbättringsområden:
- Kategori
- Frågor att besvaraTekniska åtgärder
- Vilka tekniska kontroller ska förstärkas?
- Vilka verktyg saknas?Vilka system ska uppdateras?
- Process åtgärder
- Vilka processer ska förbättras?
- Vilka rutiner saknas?
- Vilka policies ska uppdateras?

**Personal/Utbildning** | Vilken utbildning behövs?<br>Vilka roller ska förstärkas?<br>Vilka kompetenser saknas? |
| Kommunikation | Hur förbättrar vi intern kommunikation?<br>Hur förbättrar vi extern kommunikation? |
8.3 Handlingsplan:
- För varje förbättringsåtgärd, definiera:

- Vad ska göras?
- Vem är ansvarig?
- När ska det vara klart?
- Hur mäter vi att det är genomfört?

- Mall:
- HANDLINGSPLAN - Post-Incident Review

- Incident ID: [XXX]
- Datum för review: [Datum]

- FÖRBÄTTRINGSÅTGÄRD #1
- Beskrivning: Implementera MFA för alla användare
- Ansvarig: IT-säkerhetsansvarig
- Deadline: [Datum]
- Status: Pågående/Klart
- Verifiering: Alla användarkonton har MFA aktiverat

- FÖRBÄTTRINGSÅTGÄRD #2
- Beskrivning: Månadsvis phishing-utbildning för all personal
- Ansvarig: HR + IT-säkerhet
- Deadline: [Datum]
- Status: Ej påbörjad
- Verifiering: Utbildningsplan skapad och första session genomförd
8.4 Uppdatera dokumentation:
- Baserat på review, uppdatera:

- Riskbedömning och riskbehandlingsplan
- Incidenthanteringsrutiner (denna rutin!)
- Playbooks för specifika incidenttyper
- Kontaktlistor
- Teknisk dokumentation
- Business Continuity Plan

8.5 Dela lärdomar:
- Intern kommunikation:

- Sammanfattning till all personal (utan känsliga detaljer)
- Detaljerad rapport till ledning
- Teknisk rapport till IT-avdelningen

- Extern kommunikation (vid behov):

- Dela lärdomar med branschorganisationer
- Rapportera till CSIRT (för trendanalys)
- Informera leverantörer om relevanta sårbarheter

8.6 Dokumentera:
- Post-Incident Review-rapport ska innehålla:

- Sammanfattning av incidenten
- Tidslinje för händelser
- Grundorsaksanalys
- Utvärdering av respons
- Lärdomar (vad fungerade bra/dåligt)
- Rekommendationer
- Handlingsplan med ansvariga och deadlines

- Utdata:

- Post-Incident Review-rapport
- Handlingsplan med förbättringsåtgärder
- Uppdaterade rutiner och dokumentation
- Kommunikation av lärdomar

- Tidsgräns:

- Review-möte: Inom 1-2 veckor efter incident
- Rapport: Inom 1 vecka efter möte
- Handlingsplan: Påbörjas omedelbart

6.10 Fas 9: Dokumentation och slutrapportering
- Ansvarig: Incidentkoordinator + IT-säkerhetsansvarig
- Aktiviteter:
9.1 Slutdokumentation:
- Sammanställ ALL dokumentation från incidenten:

- Initial händelserapport
- Klassificering och bedömning
- Alla loggfiler och bevis
- Containment-åtgärder
- Eradication-åtgärder
- Recovery-dokumentation
- Post-Incident Review-rapport
- Tidslinje för alla händelser
- Kommunikation (intern och extern)
- Kostnadsuppskattning

9.2 Rapportering till myndigheter (vid behov):
- Om det är en betydande incident enligt NIS2:
- (Se avsnitt 9 för detaljerade rapporteringskrav)
- Slutrapport till CSIRT/behörig myndighet ska innehålla:

- Typ av incident och allvarlighetsgrad
- Orsak och konsekvenser
- Vidtagna åtgärder
- Gränsöverskridande påverkan
- Lärdomar och förbättringsåtgärder

9.3 Intern slutrapport:
- Rapport till ledningen med:

- Sammanfattning av incidenten
- Affärspåverkan (ekonomisk, reputationsmässig)
- Gjorda åtgärder
- Status på förbättringsåtgärder
- Rekommendationer för framtiden
- Budget behov för säkerhetsförbättringar

9.4 Arkivering:
- ALL incidentdokumentation arkiveras i:

- Incidenthanteringssystem: [System namn]
- Lagringsplats: [SharePoint/annan plats]
- Lagringsperiod: Minst 5 år (eller enligt juridiska krav)

- Åtkomst till arkiv:

- Begränsad till incidentresponsteam och ledning
- Loggad åtkomst

9.5 Stäng incidenten:
- Incident stängs officiellt när:

- All dokumentation är komplett
- Alla system är återställda
- Post-incident review genomförd
- Handlingsplan skapad och tilldelad
- Rapportering till myndigheter slutförd (om tillämpligt)
- Incidentkoordinator godkänner stängning

- Utdata:

- Komplett incidentdokumentation
- Slutrapporter (internt och externt)
- Arkiverad dokumentation
- Incident formellt stängd

7. ÖVERVAKNING OCH LOGGNING
7.1 Vad övervakar vi?
- Kontinuerlig övervakning sker av:
- OmrådeVad övervakasVerktygAnsvarigNätverkstrafik- Inkommande/utgående trafik- Ovanliga trafikmönster- DoS-attackerBrandvägg, IDS/IPSIT-driftEndpoints- Malware- Obehörig mjukvara- Misstänkt beteendeEDR-verktygIT-säkerhetÅtkomst- Inloggningsförsök- Privilegierad åtkomst- Misslyckade inloggningarSIEM, AD-loggarIT-säkerhetApplikationer- Applikationsfel- Säkerhetsvarningar- API-användningApploggar, SIEMIT-driftFysisk säkerhet- Dörrlarm- Kameraövervakning- PassersystemFysiskt säkerhetssystemFastighetsdrift
7.2 Larmtrösklar
- Automatiska larm genereras vid:
- HändelseTröskelÅtgärdMisslyckade inloggningar≥ 5 försök inom 15 min från samma kontoLarm till IT-säkerhet, kontospärrPrivilegieeskalering≥ 2 instanser inom 24 timmar (oväntat)Omedelbart larm till IT-säkerhetNätverkstrafikspik> 50% ökning under 10 minLarm till IT-driftMalware-detektionVid detektering på ≥ 2 endpoints inom 1 timmeKRITISKT larm till hela säkerhetsteametDataexfiltrering> [X] GB utgående data från serverOmedelbart larm till IT-säkerhetObehörig åtkomstÅtkomst till kritiska system utanför kontorstidLarm till IT-säkerhet (verifiering)
7.3 Loggning
- Vad loggas:
- ☑️ Obligatorisk loggning (enligt NIS2):

- All inkommande och utgående nätverkstrafik (sammandrag)
- Skapande/ändring/radering av användare och behörighetsändringar
- Åtkomst till system och applikationer
- Autentiseringshändelser (lyckade och misslyckade)
- All privilegierad åtkomst och administrativa aktiviteter
- Åtkomst och ändringar av kritiska konfigurationsfiler och backups
- Händelseloggar från säkerhetsverktyg (antivirus, IDS, brandvägg)
- Systemresursanvändning och prestanda
- Fysisk åtkomst till anläggningar
- Åtkomst till nätverksutrustning
- Aktivering/stopp/paus av loggar
- Miljöhändelser (temperatur, luftfuktighet, etc.)

- Logglagring:

- Lagringsperiod: Minst 12 månader (eller enligt juridiska krav)
- Backup av loggar: Samma period som primära loggar
- Skydd: Krypterade, åtkomstkontrollerade, integritetsverifierade (hashning)

- Tidssynkronisering:

- Alla system synkroniserade mot central NTP-server
- NTP-server synkar mot auktorativ tidskälla

- Granskning av loggar:

- Daglig: Säkerhetsloggar, kritiska system
- Veckovis: Alla övriga loggar
- Vid larm: Omedelbart

8. KOMMUNIKATION VID INCIDENTER
8.1 Intern kommunikation
- Kommunikationsnivåer:
- AllvarlighetsgradVem informerasNärHurKRITISK- VD och ledningsgrupp- Alla anställda- Styrelse (vid stor påverkan)Omedelbart- Telefonsamtal till ledning- SMS/Email till alla- Intranät-notisHÖG- IT-chef- Berörda avdelningschefer- HR (vid behov)Inom 1 timme- Email- Intranät-notis- AvdelningsmötenMEDEL- Berörda avdelningar- IT-avdelningenInom 4 timmar- Email till berörda- Intranät-notisLÅG- IT-avdelningenVid lämplig tidpunkt- Email- Logg i incident-system
- Kommunikationsmallar:
- MALL 1: Första meddelandet (KRITISK incident)
- ÄMNE: BRÅDSKANDE - Säkerhetsincident pågår

- Kära kollegor,

- Vi har identifierat en säkerhetsincident som påverkar [beskriv kortfattat].

- OMEDELBAR ÅTGÄRD KRÄVS:
- [Specifik åtgärd, t.ex. "Använd inte e-post förrän vidare"]
- [Annan åtgärd, t.ex. "Kontakta IT-säkerhet om du märker något ovanligt"]

- VAD VI GÖR:
- Vi arbetar intensivt med att hantera situationen.

- NÄSTA UPPDATERING:
- Ni får nästa uppdatering inom [X timmar].

- FRÅGOR:
- Kontakta: [Namn/Kontaktuppgifter]

- Med vänlig hälsning,
- [Incidentkoordinator]
- MALL 2: Uppdatering under pågående incident
- ÄMNE: Uppdatering - Säkerhetsincident

- Kära kollegor,

- NULÄGE:
- [Beskriv aktuell situation]

- VAD VI HAR GJORT:
- [Åtgärd 1]
- [Åtgärd 2]

- VAD SOM GÄLLER NU:
- [Status på system/tjänster]
- [Vad anställda kan/inte kan göra]

- FÖRVÄNTAT:
- Vi räknar med att [beskriv förväntad tidslinje]

- NÄSTA UPPDATERING:
- [Tid/datum]

- Tack för ert tålamod,
- [Incidentkoordinator]
- MALL 3: Avslutande meddelande
- ÄMNE: Löst - Säkerhetsincident avslutad

- Kära kollegor,

- Säkerhetsincidenten som inträffade [datum] är nu löst.

- VAD SOM HÄNDE:
- [Kort beskrivning]

- VAD VI GJORDE:
- [Sammanfattning av åtgärder]

- LÄGET NU:
- Alla system är återställda och fungerar normalt.

- VAD DU BEHÖVER GÖRA:
- [Ev. åtgärder för användare, t.ex. "Byt lösenord"]

- VAD VI LÄRT OSS:
- Vi kommer att implementera förbättringar för att förhindra liknande incidenter.

- FRÅGOR:
- Kontakta: [Namn/Kontaktuppgifter]

- Tack för ert samarbete,
- [Incidentkoordinator]
8.2 Extern kommunikation
- Principer:

- ❌ INGEN pratar med media utan godkännande från VD/Kommunikationsansvarig
- ✅ All extern kommunikation koordineras av Kommunikationsansvarig
- ✅ Konsekvent budskap i alla kanaler

- Externa intressenter som kan behöva informeras:
- IntressentNärAnsvarigKunderVid tjänsteavbrott eller dataexponeringKommunikationsansvarig + KundansvarigLeverantörer/PartnersVid incident som påverkar demIncidentkoordinatorCSIRT/MyndigheterVid betydande incident (NIS2)IT-säkerhetsansvarigFörsäkringsbolagVid betydande skadaEkonomiansvarigMediaVid förfrågan eller stor incidentVD + KommunikationsansvarigRegistrerade (GDPR)Vid personuppgiftsincidentDataskyddsombud + Juridisk
- Mall för kundkommunikation:
- ÄMNE: Viktig information om [Tjänst]

- Kära kund,

- Vi vill informera er om en incident som påverkat [beskriv påverkan].

- VAD SOM HÄNT:
- [Kort, transparent beskrivning utan tekniska detaljer]

- PÅVERKAN PÅ ER:
- [Beskriv konkret påverkan på kunden]

- VAD VI GJORT:
- [Sammanfatta åtgärder]

- VAD NI BEHÖVER GÖRA:
- [Om kunden behöver göra något, t.ex. byta lösenord]

- VI BEKLAGAR:
- Vi beklagar djupt denna incident och tar den på största allvar.

- KONTAKT:
- För frågor, kontakta: [Kundtjänst-uppgifter]

- Med vänlig hälsning,
- [Namn och titel]
- [Företag]

9. RAPPORTERING TILL MYNDIGHETER (NIS2)
9.1 När måste vi rapportera?
- Betydande incident enligt NIS2 = Rapporteringsskyldighet
- Kriterier för betydande incident:
- (Kontrollera aktuella nationella kriterier - dessa är exempel)
- En incident är betydande om den uppfyller minst ett av följande:
- ☑️ Operationell påverkan:

- Tjänsten otillgänglig > [X] timmar

- [Y]% av användare påverkade

- Kritisk tjänst helt avbruten

- ☑️ Ekonomisk påverkan:

- Direkt ekonomisk förlust > [Z] SEK
- Förväntad kostnad för hantering > [Belopp]

- ☑️ Dataskydd:

- Personuppgiftsincident som ska rapporteras till IMY enligt GDPR
- Exponering av känsliga affärsdata

- [Antal] personer påverkade

- ☑️ Reputationspåverkan:

- Risk för betydande reputationsskada
- Mediaupp märksamhet

- ☑️ Gränsöverskridande:

- Påverkan i flera EU-länder

- ☑️ Typ av incident:

- Vissa incidenttyper ska alltid rapporteras (t.ex. omfattande ransomware-attack)

9.2 Rapporteringstidslinjer (NIS2)
- Första anmälan (Early Warning):

- Tidsfrist: Inom 24 timmar från kännedom om incident
- Innehåll: Initial information (kan vara begränsad)

- Incidentrapport:

- Tidsfrist: Inom 72 timmar från kännedom
- Innehåll: Detaljerad information

- Slutrapport:

- Tidsfrist: Senast 1 månad efter incidenthantering
- Innehåll: Komplett analys, grundorsak, åtgärder

9.3 Vad ska rapporteras?
- Första anmälan (24 timmar) - minimalt:

- Incident inträffad
- Typ av incident (preliminär)
- Påverkade tjänster
- Antal användare påverkade (uppskattning)
- Geografisk omfattning

- Incidentrapport (72 timmar):

- Detaljerad beskrivning av incidenten
- Typ och allvarlighetsgrad
- Indikationer på grundorsak
- Påverkan (operationell, ekonomisk, reputationsmässig)
- Vidtagna åtgärder
- Gränsöverskridande påverkan (om tillämpligt)

- Slutrapport (1 månad):

- Komplett analys och tidslinje
- Bekräftad grundorsak
- Alla vidtagna åtgärder
- Konsekvenser
- Förebyggande åtgärder för framtiden
- Lärdomar

9.4 Var rapporterar vi?
- Sverige:

- CSIRT: Myndigheten för samhällsskydd och beredskap (MSB)
- Rapporteringsportal: [Länk till aktuell portal]
- Kontakt: [E-post/Telefon]

- Sektor-specifika myndigheter:
- (Beroende på vilken sektor organisationen tillhör)

- [Lista relevanta tillsynsmyndigheter]

9.5 Ansvarsfördelning
- AktivitetAnsvarigTidsfristBedöma om incident är rapporteringspliktigIT-säkerhetsansvarig + JuridiskInom 12 timmar från kännedomFörbereda första anmälanIT-säkerhetsansvarigInom 20 timmarGodkänna och skicka första anmälanVD/CISOInom 24 timmarFörbereda incidentrapportIncidentkoordinatorInom 60 timmarGodkänna och skicka incidentrapportVD/CISOInom 72 timmarFörbereda slutrapportIncidentkoordinatorInom 3 veckor efter hanteringGodkänna och skicka slutrapportVD/CISOSenast 1 månad efter hantering
9.6 Rapporteringsmall (NIS2)
- FÖRSTA ANMÄLAN (24 timmar):
- INCIDENTRAPPORT - FÖRSTA ANMÄLAN

- ORGANISATIONSUPPGIFTER:
- Organisationsnamn: [Namn]
- Organisationsnummer: [Nummer]
- Kontaktperson: [Namn, titel, telefon, e-post]
- Sektor: [Enligt NIS2]

- INCIDENTINFORMATION:
- Incidentnummer (internt): [XXX]
- Datum/Tid för upptäckt: [ÅÅÅÅ-MM-DD HH:MM]
- Preliminär incidenttyp: [Typ]
- Allvarlighetsgrad: [KRITISK/HÖG/MEDEL]

- PÅVERKAN:
- Påverkade tjänster: [Lista]
- Antal användare påverkade: [Antal/Uppskattning]
- Geografisk omfattning: [Sverige/EU/Globalt]
- Operationell påverkan: [Beskrivning]

- GRÄNSÖVERSKRIDANDE:
- Påverkan i andra EU-länder: [Ja/Nej]
- Om ja, vilka: [Lista länder]

- STATUS:
- Pågående hantering: [Kort beskrivning]
- Förväntad återställning: [Tidpunkt]

- NÄSTA RAPPORT:
- Incidentrapport planerad: [ÅÅÅÅ-MM-DD]

- Rapporterad av: [Namn, titel]
- Datum/Tid: [ÅÅÅÅ-MM-DD HH:MM]

10. PLAYBOOKS FÖR VANLIGA INCIDENTER
10.1 Playbook: Ransomware-attack
- FASSKEMA:
1. OMEDELBAR RESPONS (0-30 min):
- ☑️ Identifiera omfattning:

- Vilka system är krypterade?
- Vilka system visar ransomware-meddelande?
- Sprids infektionen fortfarande?

- ☑️ CONTAINMENT - Stoppa spridning:

- Isolera drabbade system från nätverk (dra nätverkskabel OMEDELBART)
- Inaktivera WiFi på drabbade enheter
- Stäng AV drabbade servrar (koordinerat, dokumentera ordning)
- Blockera skadliga IP-adresser i brandvägg (om identifierade)
- Inaktivera komprometterade användarkonton

- ☑️ Bevara bevis:

- TA INTE BORT RANSOMWARE-MEDDELANDET (innehåller viktig info)
- Fotografera skärmar med ransomware-meddelande
- Säkra loggar före isolering av system

- ☑️ Aktivera incidentresponsteam:

- Ring incidentkoordinator: [Telefon]
- Sätt upp war room: [Plats]
- Alla till plats inom 30 min

2. BEDÖMNING (30-60 min):
- ☑️ Identifiera ransomware-typ:

- Vilken variant? (ID Ransomware: https://id-ransomware.malwarehunterteam.com/)
- Finns gratis dekryptering tillgänglig?
- Vad säger hotaktören? (lösesum ma, tidsfrist)

- ☑️ Bedöm påverkan:

- Vilka data är krypterade?
- Har vi fungerande backups?
- Är backups också krypterade?
- Tidsåtgång för återställning?

- ☑️ Beslut om rapportering:

- Är detta rapporteringspliktig enligt NIS2? → JA (nästan alltid)
- Förbereda första anmälan (24-timmarsfrist börjar)

3. ERADICATION (1-4 timmar):
- ☑️ Ta bort ransomware:

- Använd uppdaterade anti-malware verktyg
- Skanna ALLA system, även de som verkar opåverkade
- Identifiera och ta bort persistence-mekanismer

- ☑️ Identifiera intrångspunkt:

- Hur kom ransomware in? (phishing, RDP, sårbarhet?)
- Finns bakdörrar installerade?
- Granska alla administrativa konton

- ☑️ Återställ lösenord:

- Alla privilegierade konton
- Alla användarkonton (vid stort intrång)
- Servicekonton

4. RECOVERY (timmar till dagar):
- ☑️ Beslut: Återställ från backup eller betala?
- Betala ALDRIG lösen (i första hand) - ISTÄLLET:

- Kontakta polis (anmäl brott)
- Kontakta försäkringsbolag
- Utvärdera backups
- Konsultera med ransomware-experter

- Om återställning från backup:

- Verifiera att backups är rena
- Bygg om kritiska system från grunden (ej förlita på infekterade system)
- Återställ data från backup
- Testa funktionalitet i isolerad miljö FÖRST
- Återställ till produktion stegvis

5. POST-INCIDENT (inom 1 vecka):
- ☑️ Analys:

- Hur kunde det hända?
- Vilka kontroller misslyckades?
- Grundorsak?

- ☑️ Förbättringsåtgärder:

- Implementera MFA (om saknas)
- Förbättra backup-strategi (3-2-1-regeln, offline backups)
- Email-säkerhetsförbättringar
- Endpoint Detection and Response (EDR)
- Nätverkssegmentering
- Förbättrad övervakning

10.2 Playbook: Phishing-attack
- FASSKEMA:
1. OMEDELBAR RESPONS (0-15 min):
- ☑️ Bekräfta phishing:

- Granska rapporterad e-post
- Är det verkligen phishing?
- Målriktad (spear phishing) eller massutskick?

- ☑️ CONTAINMENT - Stoppa spridning:

- Blockera avsändaradress i e-postfilter
- Blockera skadliga domäner/URL:er
- Ta bort e-post från ALLA inkörgar (använd admin-verktyg)
- Blockera bifogade filers hash (om malware)

- ☑️ Identifiera drabbade användare:

- Vem fick e-posten?
- Vem har öppnat e-posten?
- Vem klickade på länk?
- Vem laddade ner bilaga?
- Vem angav credentials?

2. BEDÖMNING (15-30 min):
- ☑️ Bedöm påverkan:
- Om användare BARA öppnade e-post:
- → Låg risk, fortsätt övervaka
- Om användare klickade på länk:
- → Kontrollera om credentials angavs
- → Kontrollera om malware laddades ner
- Om användare angav credentials:
- → KRITISK - Gå till steg 3 omedelbart!
- Om användare laddade ner och öppnade bilaga:
- → KRITISK - Behandla som malware-incident
- ☑️ Analys av phishing:

- Vad efterfrågas? (credentials, pengar, information)
- Vilken tjänst imiteras?
- Teknisk analys av länk/bilaga
- Är det del av större kampanj?

3. ERADICATION (30 min - 2 timmar):
- För användare som angav credentials:
- ☑️ OMEDELBART (inom 5 min):

- Inaktivera komprometterat konto
- Avsluta alla aktiva sessioner
- Revoke alla access tokens

- ☑️ INOM 30 MIN:
4. Återställ lösenord (använd säker kanal, ej e-post!)
5. Granska kontoaktivitet (inloggningar, åtkomst, ändringar)
6. Kontrollera om MFA aktiverades/modifierades
7. Kontrollera om regler/forwards skapats i e-post
- ☑️ INOM 2 TIMMAR:
8. Kontrollera relaterade konton (om samma lösenord används)
9. Granska om data exporterats/delats
10. Återställ åtkomst med MFA obligatoriskt
- För användare som laddade ner malware:
- → Följ Playbook för Malware (avsnitt 10.3)
4. RECOVERY (2-4 timmar):
- ☑️ Återställ åtkomst:

- Nytt lösenord via säker kanal
- Aktivera/verifiera MFA
- Användaren kan logga in igen
- Extra övervakning av kontot i 2 veckor

- ☑️ Granska och återställ:

- E-postregler/-forwards (ta bort obehöriga)
- Delningar/behörigheter (ta bort obehöriga)
- Applikationsåtkomster (revoke obehöriga)

5. POST-INCIDENT (inom 1 vecka):
- ☑️ Utbildning:

- Enskild utbildning för drabbade användare
- Generell påminnelse till alla om phishing
- Uppdatera phishing-awareness-material

- ☑️ Förbättringsåtgärder:

- Implementera/förbättra e-post-säkerhetsverktyg (anti-phishing)
- Implementera länksändbox (URL-rewriting och säker öppning)
- Obligatorisk MFA för alla användare
- Regelbundna phishing-simuleringar

10.3 Playbook: Malware-infektion
- FASSKEMA:
1. OMEDELBAR RESPONS (0-15 min):
- ☑️ Identifiera malware:

- Vilket system är infekterat?
- Vilken typ av malware? (virus, trojan, spyware, etc.)
- Sprids det?

- ☑️ CONTAINMENT - Isolera:

- Koppla bort infekterad enhet från nätverk (dra kabel/stäng av WiFi)
- Behåll enheten PÅSLAGEN (för forensik)
- Inaktivera användarkonto
4. Blockera skadlig kommunikation i brandvägg (om känd)
- ☑️ Snabb skanning:

- Skanna liknande system
- Är fler enheter infekterade?
- Identifiera smittväg

2. BEDÖMNING (15-45 min):
- ☑️ Analysera malware:

- Identifiera typ och variant
- Vad gör malwaren? (stjäl data, krypterar, spionerar?)
- Kommunicerar den med C2-server?
- Finns det persistence-mekanismer?

- ☑️ Bedöm påverkan:

- Vilken data har exponerats?
- Har credentials stulits?
- Är backups påverkade?
- Har andra system komprometterats?

3. ERADICATION (45 min - 4 timmar):
- ☑️ Ta bort malware:
- Metod 1 - Rensa (för mindre infektioner):

- Uppdatera antivirus till senaste definitioner
- Kör fullständig skanning i säkert läge
- Använd specialverktyg för specifik malware (om finns)
- Manuellt ta bort persistence (registry, scheduled tasks, etc.)
- Verifiera att allt är borta

- Metod 2 - Återbygg (rekommenderas för allvarliga infektioner):

- Säkerhetskopiera användares data (efter virusskanning)
- Formatera disk
- Ny OS-installation från ren image
- Installera alla säkerhetspatchar
- Installera och konfigurera säkerhetsprogram
- Återställ data (efter verifiering)

- ☑️ Återställ credentials:

- Användarlösenord
- Alla lösenord sparade i webbläsare
- Alla credentials för tjänster som använts från enheten

- ☑️ Kontrollera spridning:

- Granska nätverkskommunikation
- Skanna filservrar/delade mappar
- Kontrollera andra endpoints

4. RECOVERY (1-8 timmar):
- ☑️ Återställ enhet:

- Testa funktionalitet
- Verifiera att malware är borta (upprepade skanningar)
- Installera säkerhets förstärkningar (EDR, application whitelisting)
- Återanslut till nätverk

- ☑️ Förstärkt övervakning:

- Extra övervakning av enheten i 2 veckor
- Granska loggfiler dagligen
- Kontrollera utgående trafik

5. POST-INCIDENT (inom 1 vecka):
- ☑️ Analys:

- Hur kom malwaren in? (e-post, nedladdning, USB, etc.)
- Varför detekterades den inte tidigare?
- Vilka kontroller misslyckades?

- ☑️ Förbättringsåtgärder:

- Förbättra endpoint protection (EDR)
- Application whitelisting
- Email-filtrering
- USB-kontroller
- Användarutbildning
- Patch management

10.4 Playbook: Dataintrång / Obehörig åtkomst
- FASSKEMA:
1. OMEDELBAR RESPONS (0-30 min):
- ☑️ Bekräfta intrång:

- Finns bevis för obehörig åtkomst?
- Vilka system är komprometterade?
- Pågår åtkomst fortfarande?

- ☑️ CONTAINMENT - Stoppa åtkomst:

- Inaktivera komprometterade användarkonton OMEDELBART
- Blockera misstänkta IP-adresser
- Avsluta alla aktiva sessioner
- Ändra lösenord för administrativa konton
- Isolera komprometterade system (om möjligt utan att varna angripare)

- ☑️ Bevara bevis:

- Säkra loggar (innan angripare kan radera dem)
- Ta minnesdum p av komprometterade system
- Dokumentera alla observationer
- Ta skärmdumpar

2. BEDÖMNING (30 min - 2 timmar):
- ☑️ Forensisk analys:
- Hur kom angriparen in?

- Stulna credentials? (phishing, brute force, keylogger)
- Utnyttjad sårbarhet? (opatched system, zero-day)
- Insider? (missnöjd anställd, medhjälpare)
- Social engineering?

- Vad har angriparen gjort?

- Granska loggfiler för:

- Inloggningar (när, varifrån, vilka konton)
- Filåtkomst (vad har lästs, kopierats, raderats)
- Systemändringar (nya konton, nya regler, backdoors)
- Lateral movement (spridning till andra system)
- Data exfiltration (stora dataöverföringar ut)

- Etablerad persistence?

- Nya användarkonton skapade?
- Scheduled tasks/cron jobs?
- Registry-ändringar?
- Backdoors installerade?

- ☑️ Bedöm påverkan:

- Vilken data har exponerats/stulits?
- Affärskritisk information?
- Personuppgifter (GDPR-påverkan)?
- Känslig affärsinformation?
- Immateriella rättigheter?

3. ERADICATION (2-8 timmar):
- ☑️ Ta bort angriparens åtkomst:

- Konton:

- Radera alla obehöriga konton
- Återställ ALLA lösenord (inte bara komprometterade)
- Revoke alla sessions och tokens
- Granska och återställ behörigheter

- Backdoors:

- Sök efter och ta bort backdoors
- Granska scheduled tasks
- Kontrollera startup-items
- Granska nätverkslyssnare (open ports)

- Sårbarheter:

- Patcha utnyttjad sårbarhet
- Skanna efter liknande sårbarheter
- Härda system-konfiguration

- Förstärk säkerhet:

- Implementera/förstärk MFA
- Förbättra brandväggsregler
- Aktivera logging på alla kritiska system
- Implementera intrusion detection

- ☑️ Verifiera utrotning:

- Inga tecken på angripare kvar
- Inga obehöriga konton
- Inga aktiva sessioner från misstänkta IP
- Övervakning visar normal aktivitet

4. RECOVERY (varierar):
- ☑️ Återställ påverkade system:
- Om system är kraftigt komprometterade:

- Bygg om från grunden
- Ny OS-installation från verifierad källa
- Återställ data från backups (efter verifiering)

- Om begränsad kompromittering:

- Rensa och härda system
- Återställ säkra konfigurationer
- Extra övervakning

- ☑️ Återställ data (om förlust/radering):

- Från senaste rena backup
- Verifiera integritet
- Test återställda data

5. POST-INCIDENT (inom 2 veckor):
- ☑️ GDPR-bedömning:

- Är det en personuppgiftsincident?
- Rapportering till IMY inom 72 timmar?
- Information till registrerade?
- Dokumentera dataskyddskonsekvensbedömning

- ☑️ Analys och åtgärder:

- Hur kunde det hända?
- Vilka kontroller misslyckades?
- Implementera:

- Förbättrad access control
- Obligatorisk MFA
- Bättre logging och övervakning
- Nätverkssegmentering
- Intrusion detection/prevention
- Regular security audits
- Penetration testing

11. VERKTYG OCH SYSTEM
11.1 Obligatoriska verktyg
- VerktygSyfteAnsvarigStatusIncidenthanteringssystemRegistrera och spåra alla incidenterIT-säkerhet[Implementerat/Planerat]SIEMCentraliserad logghantering och analysIT-säkerhet[Implementerat/Planerat]EDREndpoint detection and responseIT-säkerhet[Implementerat/Planerat]Antivirus/Anti-malwareSkydd mot skadlig kodIT-drift[Implementerat]Brandvägg + IDS/IPSNätverksskyddIT-drift[Implementerat]Backup-systemSäkerhetskopieringIT-drift[Implementerat]Forensik-verktygIncidentanalysIT-säkerhet[Implementerat/Planerat]
11.2 Incidenthanteringssystem
- Vårt incidenthanteringssystem: [Systemnamn]
- Åtkomst: [URL/Plats]
- Ansvarig: [Namn]
- Systemet används för att:

- Registrera alla händelser och incidenter
- Spåra handläggning och status
- Tilldela ansvar
- Dokumentera åtgärder
- Generera rapporter
- Arkivera incidentdokumentation

- Obligatoriska fält vid registrering:

- Incidentnummer (auto-genererat)
- Datum/tid för upptäckt
- Rapporterad av
- Beskrivning
- Allvarlighetsgrad
- Incidenttyp
- Påverkade system
- Status

12. UTBILDNING OCH ÖVNINGAR
12.1 Utbildningsprogram
- Alla anställda:

- Vid onboarding: Grundläggande säkerhets- och incidentrapporteringsutbildning (1 timme)
- Årligen: Uppdateringsutbildning (30 min)
- Löpande: Phishing-simuleringar (minst kvartalsvis)

- Incidentresponsteam:

- Vid tillsättning: Incidenthanteringsutbildning (1 dag)
- Årligen: Uppdateringsutbildning och certifiering (4 timmar)
- Löpande: Playbook-genomgångar och övningar

- IT-avdelningen:

- Vid tillsättning: Teknisk säkerhetsutbildning (2 dagar)
- Årligen: Uppdaterad teknisk utbildning (1 dag)
- Löpande: Tekniska övningar och simuleringar

12.2 Övningsschema
- Kvartalsvis:

- Tabletop-övning för incidentresponsteamet
- Olika scenarion varje gång

- Halvårsvis:

- Teknisk simulering (t.ex. simulerad ransomware-attack)
- Involverar IT-drift och säkerhetsteam

- Årligen:

- Fullskalig incidentövning med hela organisationen
- Involverar ledning, kommunikation, IT och berörda avdelningar
- Externa partners kan involveras

- Dokumentation:

- Alla övningar dokumenteras
- Lessons learned används för förbättringar
- Uppdatering av rutiner och playbooks

13. MÄTNING OCH UPPFÖLJNING
13.1 KPI:er (Key Performance Indicators)
- Processeffektivitet:
- KPIMålMätfrekvensTid från upptäckt till first response< 15 min (KRITISK)< 1 timme (HÖG)Per incidentTid från upptäckt till containment< 1 timme (KRITISK)< 4 timmar (HÖG)Per incidentTid från upptäckt till resolution< 24 timmar (KRITISK)< 1 vecka (HÖG)Per incidentAndel incidenter med post-incident review100% (KRITISK/HÖG)80% (MEDEL)KvartalsvisEfterlevnad av rapporteringsfrister (NIS2)100%Per rapporteringspliktig incident
- Säkerhetseffektivitet:
- KPIMålMätfrekvensAntal incidenter per månadTrend nedåtMånadsvisAntal återkommande incidenter0KvartalsvisAndel incidenter upptäckta av egna system vs rapporterade> 70% upptäckta av systemKvartalsvisAndel phishing-e-post rapporterade av användare> 50%Per phishing-kampanjTid från sårbarhet publicerad till patchad< 30 dagar (kritiska)Månadsvis
- Utbildning och medvetenhet:
- KPIMålMätfrekvensAndel personal som genomgått säkerhetsutbildning100%ÅrligenAndel som klickar i phishing-simuleringar< 10%Per simulationAndel som rapporterar phishing-simuleringar> 50%Per simulation
13.2 Rapportering till ledning
- Månadsvis:

- Antal incidenter per typ och allvarlighetsgrad
- Trender och mönster
- Pågående incidenter
- Status på förbättringsåtgärder

- Kvartalsvis:

- Djupgående analys av incidenter
- KPI-uppföljning
- Övningsresultat
- Rekommendationer för investeringar

- Årligen:

- Årlig säkerhetsrapport
- Genomgång av incidenthanteringsförmåga
- Benchmarking mot bransch
- Strategiska rekommendationer

14. GRANSKNING OCH UPPDATERING
14.1 Rutin granskning
- Denna rutin ska granskas och uppdateras:
- ☑️ Minst årligen (planerad granskning)
- ☑️ Efter varje KRITISK incident
- ☑️ Efter betydande förändringar i:

- Organisation (nya system, omstrukturering)
- Hotlandskap (nya typer av attacker)
- Regulatoriska krav (nya lagar, förordningar)
- Teknisk miljö (ny IT-infrastruktur)

14.2 Granskningsprocess
- Ansvarig: Incidentkoordinator + IT-säkerhetsansvarig
- Process:

- Samla in feedback från incidentresponsteamet
- Granska incidentstatistik och KPI:er
- Analysera lessons learned från incidenter
- Granska mot uppdaterade standarder (ISO, NIST, NIS2)
- Föreslå förändringar
- Godkännande av ledning
- Kommunicera uppdateringar till alla
- Utbilda på förändringar

- Dokumentation:

- Versionshistorik
- Ändringslogg
- Godkännande
- Distributionslista

15. BILAGA: KONTAKTLISTOR
15.1 Incidentresponsteam
- RollNamnTelefonE-postErsättareIncidentkoordinator[Namn][Tel][E-post][Namn ersättare]IT-säkerhetsansvarig[Namn][Tel][E-post][Namn ersättare]IT-forensiker[Namn][Tel][E-post][Namn ersättare]IT-driftschef[Namn][Tel][E-post][Namn ersättare]Kommunikationsansvarig[Namn][Tel][E-post][Namn ersättare]Juridisk rådgivare[Namn][Tel][E-post][Namn ersättare]VD[Namn][Tel][E-post]-
15.2 Externa kontakter
- Myndigheter:
- OrganisationKontaktTelefonE-postNär kontaktaCSIRT Sverige (MSB)[Kontaktperson][Tel][E-post]Vid rapporteringspliktig incidentPolisen - IT-brottsroteln[Kontaktperson][Tel][E-post]Vid brottsmisstankeIMY (Datainspektionen)[Kontaktperson][Tel][E-post]Vid personuppgiftsincident[Sektormyndighet][Kontaktperson][Tel][E-post]Vid sektor-specifik incident
- Leverantörer:
- LeverantörTjänstSupport-telefonE-postSLA responstid[IT-leverantör]IT-infrastruktur[Tel][E-post][X timmar][Molnleverantör]Cloud hosting[Tel][E-post][X timmar][Säkerhetsleverantör]Security operations[Tel][E-post][X timmar][Försäkringsbolag]Cyberförsäkring[Tel][E-post][X timmar]
- Extern expertis:
- FöretagSpecialitetTelefonE-post[Forensik-företag]Digital forensik[Tel][E-post][Säkerhetsföretag]Incident response[Tel][E-post][Juridisk byrå]Cyber law[Tel][E-post][PR-byrå]Kriskommunikation[Tel][E-post]

16. BILAGA: MALLAR OCH CHECKLISTOR
16.1 Initial Incident Assessment Checklist
- ☐ Händelse rapporterad via: ___________________________
- ☐ Rapporterad av: _____________________________________
- ☐ Datum/Tid upptäckt: _________________________________
- ☐ Incident ID tilldelat: ______________________________

- INLEDANDE BEDÖMNING:
- ☐ Är detta en verklig incident? JA / NEJ
- ☐ Typ av incident: ____________________________________
- ☐ Påverkade system: ___________________________________
- ☐ Antal användare påverkade: __________________________

- ALLVARLIGHETSGRAD:
- ☐ KRITISK ☐ HÖG ☐ MEDEL ☐ LÅG

- OMEDELBAR ÅTGÄRD:
- ☐ Incidentresponsteam aktiverat? JA / NEJ
- ☐ Containment påbörjad? JA / NEJ
- ☐ Bevis säkrade? JA / NEJ

- RAPPORTERINGSBEDÖMNING:
- ☐ Rapporteringspliktig enligt NIS2? JA / NEJ / OKLART
- ☐ Rapporteringspliktig enligt GDPR? JA / NEJ / OKLART
- ☐ Juridisk rådgivare kontaktad? JA / NEJ

- NÄSTA STEG:
- ☐ Fortsätt till Containment
- ☐ Eskalera till ledning
- ☐ Förbereda första anmälan (myndighetjer)

- Utförd av: ___________________________________________
- Datum/Tid: ___________________________________________
16.2 Containment Checklist
- ☐ Incidenten är bekräftad och klassificerad
- ☐ Incidentresponsteamet är på plats

- OMEDELBAR CONTAINMENT:
- ☐ Drabbade system identifierade
- ☐ Isolering genomförd (från nätverk)
- ☐ Komprometterade konton inaktiverade
- ☐ Skadliga IP-adresser blockerade
- ☐ Bevis säkrade före isolering

- FORENSIK (före åtgärder):
- ☐ Minnesdump tagen
- ☐ Disk-images/snapshots tagna
- ☐ Loggar säkrade
- ☐ Skärmdumpar tagna
- ☐ Nätverksanslutningar dokumenterade

- LÅNGSIKTIG CONTAINMENT:
- ☐ Sårbarheter patchade
- ☐ Åtkomstkontroller förstärkta
- ☐ Ytterligare övervakning implementerad
- ☐ Nätverkssegmentering förbättrad

- KOMMUNIKATION:
- ☐ Ledning informerad
- ☐ Berörda användare informerade
- ☐ Plan för extern kommunikation (vid behov)

- DOKUMENTATION:
- ☐ Alla åtgärder dokumenterade
- ☐ Tidslinje uppdaterad
- ☐ Beslut och motiveringar dokumenterade

- Utförd av: ___________________________________________
- Datum/Tid för Containment slutförd: __________________
16.3 Post-Incident Review Agenda
- POST-INCIDENT REVIEW

- Incident ID: __________________________________________
- Datum för review: _____________________________________
- Deltagare: ____________________________________________

- AGENDA:

1. FAKTAINSAMLING (30 min)
   ☐ Tidslinje presenterad
   ☐ Tekniska detaljer genomgångna
   ☐ Påverkan sammanfattad

2. GRUNDORSAKSANALYS (45 min)
   ☐ 5 Whys-analys genomförd
   ☐ Grundorsak identifierad
   ☐ Bidragande faktorer noterade

3. UTVÄRDERING AV RESPONS (30 min)
   - VAD FUNGERADE BRA:
   ☐ ___________________________________________________
   ☐ ___________________________________________________
   
   - VAD FUNGERADE DÅLIGT:
   ☐ ___________________________________________________
   ☐ ___________________________________________________

4. FÖRBÄTTRINGSÅTGÄRDER (45 min)
   ☐ Tekniska åtgärder identifierade
   ☐ Processförbättringar identifierade
   ☐ Utbildningsbehov identifierade
   ☐ Ansvariga tilldelade
   ☐ Deadlines satta

5. HANDLINGSPLAN
   ☐ Dokumenterad och distribuerad

- NÄSTA STEG:
- ☐ Uppdatera riskbedömning
- ☐ Uppdatera rutiner/playbooks
- ☐ Kommunicera lärdomar
- ☐ Schemalägg uppföljning

- Mötesanteckningar: ____________________________________
- _______________________________________________________

- Signatur Incidentkoordinator: ________________________
- Datum: ________________________________________________

- GODKÄNNANDE OCH VERSIONSHISTORIK
- Godkännande
- Detta dokument har granskats och godkänts av:
- NamnRollSignaturDatum[Namn]VD[Namn]IT-chef[Namn]CISO[Namn]Dataskyddsombud
- Versionshistorik
- VersionDatumÄndringÄndrad av1.0[Datum]Initial version[Namn]
- Distributionslista
- Detta dokument har distribuerats till:

 - Alla anställda (sammanfattning)
 - Incidentresponsteam (fullständig version)
 - Ledningsgrupp (fullständig version)
 - IT-avdelning (fullständig version)
 - Viktiga leverantörer (relevant utdrag)

- SLUT PÅ RUTIN
