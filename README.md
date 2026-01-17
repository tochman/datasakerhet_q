# Cybersäkerhetslagen (2025:1506) - Bedömningsformulär

En komplett webbapplikation för att bedöma om verksamheter omfattas av den nya svenska Cybersäkerhetslagen.

## Om Projektet

Detta är ett interaktivt frågeformulär som hjälper företag och organisationer att bedöma om de omfattas av den nya svenska Cybersäkerhetslagen (2025:1506). Applikationen vägleder användare genom 17 frågor och ger en automatisk bedömning baserad på lagtexten.

### Om Cybersäkerhetslagen (2025:1506)

- **Utfärdad:** 11 december 2025
- **Ikraftträdande:** 15 januari 2026
- **Syfte:** Uppnå en hög nivå av cybersäkerhet i Sverige
- **Genomför:** NIS 2-direktivet (EU 2022/2555)
- **Ersätter:** Lagen (2018:1174) om informationssäkerhet för samhällsviktiga och digitala tjänster

Lagen ställer krav på organisationer inom kritiska sektorer att implementera cybersäkerhetsåtgärder och rapportera incidenter.

### NIS 2-direktivet och sektorer som omfattas

NIS 2-direktivet (EU 2022/2555) omfattar verksamheter inom följande sektorer:

- Energi (el, gas, fjärrvärme, olja, vätgas)
- Transport (flyg, järnväg, sjöfart, vägtransport)
- Bank och finans
- Hälso- och sjukvård
- Dricksvatten och avlopp
- Post och kurirtjänster
- Avfallshantering
- Tillverkning (medicinteknik, fordon, elektronik, m.m.)
- Digitala leverantörer (moln, datacenter, sökmotorer)
- Forskning (universitet, forskningsorganisationer)

**Viktigt:** Även företagets storlek (medelstort eller större) är avgörande för om lagen gäller.

## Funktioner

### För Användare
- ✅ **Adaptivt frågeformulär** – visar endast relevanta frågor baserat på dina svar
- ✅ **Smartare användarflöden**:
  - **Offentliga verksamheter**: 6-7 frågor (från tidigare 17)
  - **Privata utan svenskt säte**: 3 frågor med omedelbart resultat
  - **Små privata verksamheter**: 6-12 frågor istället för alla 17
  - **Större verksamheter**: 13-16 relevanta frågor
- ✅ **Automatisk bedömning** enligt lagstiftningens kriterier
- ✅ **Dynamisk progress-indikator** som visar faktiskt återstående frågor
- ✅ **Early exit** för verksamheter som inte omfattas
- ✅ **Kontextberoende hjälptext** för varje fråga
- ✅ **Kontaktformulär** för de som vill ha mer information
- ✅ **Responsiv design** som fungerar på alla enheter
- ✅ **Tillgänglighet** enligt WCAG 2.1 AA-standard

## Adaptivt formulär

Frågeformuläret använder smart adaptiv logik som anpassar frågorna baserat på dina svar. Detta ger en betydligt snabbare och mer relevant upplevelse.

### Hur det fungerar

**Fråga 3 är nyckelfrågan** – Har din verksamhet svenskt säte?
- Om NEJ → Omedelbart resultat (endast 3 frågor totalt)
- Om JA → Fortsätter med relevanta frågor om verksamheten

**Frågor visas endast när de är relevanta:**
- Offentliga verksamheter hoppar över privata frågor
- Små företag får färre frågor om digitala tjänster
- Stora företag eller NIS 2-verksamheter får alla relevanta frågor
- Undantagsfrågor visas endast för verksamheter som kan omfattas

### Exempel på användarflöden

#### Scenario 1: Offentlig verksamhet (Kommun)
```
Q1: Statlig myndighet? → NEJ
Q2: Region/kommun? → JA
[Hoppar direkt till undantag]
Q13-Q17: Undantagsfrågor
→ Resultat (7 frågor totalt, ~60% färre än tidigare)
```

#### Scenario 2: Utländskt företag
```
Q1: Statlig myndighet? → NEJ
Q2: Region/kommun? → NEJ
Q3: Svenskt säte? → NEJ
→ Resultat: "Omfattas ej" (3 frågor totalt, ~82% färre än tidigare)
```

#### Scenario 3: Litet svenskt företag utan digitala tjänster
```
Q1-Q2: NEJ (inte offentlig)
Q3: Svenskt säte? → JA
Q4: NIS 2-sektor? → Inga val
Q5: Medelstort/stort? → NEJ
Q6: Privat utbildning? → NEJ
Q7: Telenät? → NEJ
Q8: Digitala tjänster? → Inga val
Q12: Betrodda tjänster? → NEJ
→ Resultat: "Omfattas troligen ej" (9 frågor totalt)
```

#### Scenario 4: Stort företag inom NIS 2
```
Q1-Q2: NEJ (inte offentlig)
Q3: Svenskt säte? → JA
Q4: NIS 2-sektor? → JA (t.ex. Energi)
Q5: Medelstort/stort? → JA
Q7-Q12: Alla digitala tjänster och samhällsfunktioner
Q13-Q17: Undantagsfrågor
→ Resultat: "Omfattas" (15 frågor totalt)
```

### Fördelar med adaptivt formulär

**Snabbare genomförande:**
- Offentliga verksamheter: ~60% färre frågor
- Utländska företag: ~82% färre frågor
- Små privata företag: ~30-50% färre frågor

**Bättre användarupplevelse:**
- Ingen frustration över irrelevanta frågor
- Tydligare koppling mellan svar och frågor
- Omedelbar feedback när resultatet är klart

**Mer korrekta bedömningar:**
- Fråga 3 (svenskt säte) kommer tidigt och hindrar onödiga genomgångar
- Endast relevanta frågor för varje verksamhetstyp
- Tydligare hjälptexter för varje fråga

## Användarfokuserad design

Frågeformuläret är utformat för att vara tillgängligt även för användare utan förkunskaper om Cybersäkerhetslagen eller EU-direktiv.

### Exempel: Fråga 4 - NIS 2-direktivet

Istället för att fråga tekniskt om "bilagorna i EU:s NIS 2-direktiv", presenterar vi:

- **Konkreta exempel** från 10 olika sektorer (Energi, Transport, Hälsovård, etc.)
- **Checkboxar för val** av relevanta branscher
- **Tydlig koppling** till företagsstorlek (fråga 3)
- **Klartext istället för juridiska termer**

Detta gör det mycket enklare för användare att identifiera om deras verksamhet omfattas, 
utan att behöva ha djup kunskap om lagstiftningen.

### Designprinciper

1. **Enkelhet**: Använd vardagligt språk istället för juridiska termer
2. **Konkreta exempel**: Ge tydliga exempel från verkliga verksamheter
3. **Interaktivt val**: Låt användare välja relevanta branscher med checkboxar
4. **Koppling mellan frågor**: Hänvisa till tidigare frågor när relevant
5. **Tydlig presentation**: Undvik onödig visuell komplexitet

### För Administratörer
- ✅ **Admin-panel** med skyddad inloggning
- ✅ **Översikt över alla svar** med tidsstämplar
- ✅ **Filter- och sökfunktioner**
  - Filtrera på bedömningsresultat
  - Visa endast användare som vill ha kontakt
  - Datumfilter
- ✅ **Statistik-dashboard**
  - Totalt antal svar
  - Fördelning per bedömningskategori
  - Antal kontaktförfrågningar
- ✅ **Detaljerad visning** av enskilda svar
- ✅ **CSV-export** för vidare analys

## Dokumentation

Detaljerad dokumentation för frågeflöde och bedömningslogik finns i:
- [docs/QUESTIONNAIRE_DOCUMENTATION.md](docs/QUESTIONNAIRE_DOCUMENTATION.md)

## PDF-nedladdning

Användare som bedöms omfattas av lagen kan ladda ner en professionell PDF med:
- Bedömningsresultat med färgkodning
- Rekommenderade säkerhetsåtgärder enligt 2 kap. 3-4 §§
- Checklista för implementering
- Tidsfrister för incidentrapportering

## Dataflöde

1. **Formulärinsamling** → Svar sparas till Supabase `survey_responses`
2. **Bedömning** → Automatisk analys enligt lagtext
3. **Kontakt** → Kontaktuppgifter sparas i `contact_info`
4. **PDF** → Genereras lokalt med jsPDF
5. **Backup** → localStorage används om Supabase inte är tillgängligt

## Teknisk Stack

- **Frontend:** React 18+ med Vite
- **Styling:** Tailwind CSS
- **Backend:** Supabase (serverless)
- **Routing:** React Router v6
- **Deployment:** Netlify (production-ready)

## Projektstruktur

```
/
├── src/
│   ├── components/
│   │   ├── QuestionnaireForm.jsx    # Huvudformulär med alla frågor
│   │   ├── QuestionSection.jsx      # Återanvändbar frågekomponent
│   │   ├── ContactForm.jsx          # Kontaktformulär
│   │   ├── ResultsSummary.jsx       # Visar bedömningsresultat
│   │   ├── SecurityMeasures.jsx     # Säkerhetsåtgärder och checklista
│   │   ├── AdminPanel.jsx           # Admin-dashboard
│   │   ├── AdminLogin.jsx           # Admin-inloggning
│   │   └── PrivateRoute.jsx         # Route-skydd
│   ├── lib/
│   │   └── supabaseClient.js        # Supabase-konfiguration
│   ├── utils/
│   │   ├── generateSecurityPDF.js   # PDF-generering
│   │   └── questionFlows.js         # Frågeflödeslogik
│   ├── App.jsx                      # Routing
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Tailwind CSS
├── supabase/
│   ├── functions/
│   │   ├── save-survey/
│   │   │   └── index.ts             # Edge Function: Spara formulärsvar
│   │   └── save-contact/
│   │       └── index.ts             # Edge Function: Spara kontaktinfo
│   └── migrations/
│       ├── 001_initial_schema.sql   # Initialt databasschema
│       └── 002_add_q0_column.sql    # Migration för RLS-fix
├── docs/
│   └── QUESTIONNAIRE_DOCUMENTATION.md  # Detaljerad dokumentation
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml
├── .env.example
├── .gitignore
└── README.md
```

## Kom igång (Development)

### Förutsättningar

- Node.js 18+ installerat
- Ett Supabase-konto (gratis på [supabase.com](https://supabase.com))

### Installation

1. **Klona repositoryt**
   ```bash
   git clone https://github.com/tochman/datasakerhet_q.git
   cd datasakerhet_q
   ```

2. **Installera dependencies**
   ```bash
   npm install
   ```

3. **Konfigurera miljövariabler**
   ```bash
   cp .env.example .env
   ```
   
   Redigera `.env` och lägg till dina Supabase-uppgifter:
   ```
   VITE_SUPABASE_URL=https://ditt-projekt.supabase.co
   VITE_SUPABASE_ANON_KEY=din-anon-key
   ```

4. **Starta development server**
   ```bash
   npm run dev
   ```
   
   Applikationen är nu tillgänglig på `http://localhost:5173`

## Supabase Setup

### 1. Skapa projekt

1. Gå till [supabase.com](https://supabase.com) och skapa ett nytt projekt
2. Vänta tills projektet är helt uppsatt

### 2. Kör databas-migration

1. Öppna SQL Editor i Supabase Dashboard
2. Kopiera innehållet från `supabase/migrations/001_initial_schema.sql`
3. Kör SQL-koden för att skapa tabeller och policies

**För befintliga databaser:** Om du redan har tabellerna, kör istället `supabase/migrations/002_add_q0_column.sql` för att uppdatera RLS-policies.

### 3. Deploy Edge Functions

Edge Functions krävs för att spara formulärsvar och kontaktinformation:

```bash
# Installera Supabase CLI (om du inte har det)
npm install -g supabase

# Logga in på Supabase
supabase login

# Länka till ditt projekt
supabase link --project-ref <ditt-projekt-ref>

# Deploy Edge Functions
supabase functions deploy save-survey
supabase functions deploy save-contact
```

**Alternativt via Supabase Dashboard:**
1. Gå till "Edge Functions" i Supabase Dashboard
2. Klicka "New Function"
3. Skapa `save-survey` och klistra in koden från `supabase/functions/save-survey/index.ts`
4. Upprepa för `save-contact`

### 4. Skapa admin-användare

1. Gå till "Authentication" > "Users" i Supabase Dashboard
2. Klicka på "Add user" > "Create new user"
3. Ange email och lösenord för admin
4. Användaren kan nu logga in på `/admin/login`

### 5. Hämta API-nycklar

1. Gå till "Settings" > "API" i Supabase Dashboard
2. Kopiera "Project URL" och "anon public" key
3. Lägg till dessa i din `.env`-fil

## Deployment till Netlify

### Automatisk deployment via GitHub

1. **Koppla repository till Netlify**
   - Logga in på [netlify.com](https://netlify.com)
   - Klicka på "Add new site" > "Import an existing project"
   - Välj GitHub och ditt repository

2. **Konfigurera build-settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Dessa är redan konfigurerade i `netlify.toml`

3. **Lägg till environment variables**
   - Gå till "Site configuration" > "Environment variables"
   - Lägg till:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

4. **Deploy**
   - Klicka på "Deploy site"
   - Din site är live när deployment är klar!

### Manuell deployment

```bash
# Bygg projektet
npm run build

# Installera Netlify CLI (om du inte har det)
npm install -g netlify-cli

# Logga in
netlify login

# Deploy
netlify deploy --prod
```

## Användning

### För Slutanvändare

1. **Besök startsidan** (`/`)
2. **Besvara frågorna** genom att navigera genom de 4 delarna
3. **Se din bedömning** - får automatiskt ett resultat
4. **Fyll i kontaktformulär** (valfritt) för mer information

### För Administratörer

1. **Gå till** `/admin/login`
2. **Logga in** med dina Supabase-credentials
3. **Använd admin-panelen** för att:
   - Se alla inskickade svar
   - Filtrera och söka
   - Visa statistik
   - Exportera data till CSV
   - Se detaljerad information för varje svar

## Databasschema

### Tabell: `survey_responses`
Lagrar alla formulärsvar och bedömningar.

**Kolumner:**
- `id` (UUID) - Primärnyckel
- `created_at` (Timestamp) - När svaret skapades
- `q1` till `q17` (Text) - Svar på frågor (ja/nej/vet_ej)
- `q8_services` (JSONB) - Array med valda digitala tjänster
- `assessment_result` (Text) - Bedömningsresultat
- `assessment_message` (Text) - Meddelande till användare
- `assessment_details` (Text) - Detaljerad förklaring
- `wants_contact` (Boolean) - Om användaren vill bli kontaktad

### Tabell: `contact_info`
Lagrar kontaktinformation för användare som vill ha mer information.

**Kolumner:**
- `id` (UUID) - Primärnyckel
- `survey_response_id` (UUID) - Foreign key till survey_responses
- `created_at` (Timestamp) - När kontakten registrerades
- `name` (Text) - Namn
- `email` (Text) - E-post
- `phone` (Text) - Telefon (valfritt)
- `organization` (Text) - Organisation (valfritt)
- `message` (Text) - Meddelande (valfritt)

## Bedömningslogik

### Hur bedöms om en verksamhet omfattas av lagen?

Applikationen analyserar svaren genom ett strukturerat beslutsträd baserat på Cybersäkerhetslagens kriterier. Bedömningen sker i fyra steg:

#### Steg 1: Statlig, regional eller kommunal verksamhet
Verksamheten omfattas **direkt** om den är:
- **Fråga 1 (Ja):** En statlig myndighet som fattar viktiga gränsöverskridande beslut
- **Fråga 2 (Ja):** En region, kommun eller kommunalförbund

#### Steg 2 & 3: Privat verksamhet och digitala tjänster
En privat verksamhet omfattas om **minst ett** av följande kriterier uppfylls:
- **Fråga 3 (Ja):** Medelstort eller större företag (≥250 anställda ELLER omsättning >50M€ ELLER balansomslutning >43M€)
- **Fråga 4 (Ja):** Omfattas av NIS 2-direktivets bilagor (EU 2022/2555)
- **Fråga 5 (Ja):** Privat utbildningsanordnare med tillstånd att utfärda examina
- **Fråga 7 (Ja):** Tillhandahåller allmänna telenät eller elektroniska kommunikationstjänster
- **Fråga 8 (minst ett val):** Tillhandahåller digitala tjänster (molntjänster, datacenter, CDN, managed services, etc.)
- **Fråga 9 (Ja):** Enda leverantören av kritisk samhällstjänst i Sverige
- **Fråga 10 (Ja):** Avbrott skulle allvarligt påverka liv, hälsa eller säkerhet
- **Fråga 11 (Ja):** Extra viktig verksamhet på nationell/regional nivå
- **Fråga 12 (Ja):** Tillhandahåller betrodda tjänster (e-legitimation, e-underskrift)

**OBS:** Fråga 6 om svenskt säte är en förutsättning men påverkar inte direkt bedömningen.

#### Steg 4: Undantag från lagen
Verksamheter kan vara undantagna **även om** de uppfyller kriterierna ovan:

**Undantagna verksamheter:**
- **Fråga 13 (Ja):** Bedriver huvudsakligen säkerhetskänslig eller brottsbekämpande verksamhet
- **Fråga 14 (Ja):** Privat aktör som enbart sysslar med säkerhetskänslig verksamhet eller levererar till brottsbekämpande myndigheter
- **Fråga 16 (Ja):** Regeringen, Regeringskansliet, ambassader, kommittéer, riksdagsmyndigheter, domstolar
- **Fråga 17 (Ja):** Fullmäktige eller styrelser i kommunalförbund, kommun- eller regionfullmäktige

**Viktigt:** Om verksamheten tillhandahåller **betrodda tjänster** (Fråga 15 = Ja), gäller **INTE** undantaget. Då omfattas verksamheten ändå av lagen.

### Bedömningsresultat

Systemet ger ett av fyra möjliga resultat:

#### 🔴 Omfattas
**Resultat:** "Din verksamhet omfattas sannolikt av Cybersäkerhetslagen (2025:1506)"

**Betyder:** 
- Verksamheten uppfyller kriterierna i Del 1 eller Del 2-3
- Inget giltigt undantag föreligger
- Verksamheten behöver följa lagens krav på cybersäkerhet och incidentrapportering

**Vad händer nu:**
Verksamheter som omfattas måste:
1. Implementera riskhanteringsåtgärder för cybersäkerhet
2. Rapportera allvarliga IT-incidenter till behörig myndighet
3. Hantera säkerhetsrisker i leverantörskedjan
4. Vidta åtgärder för att säkra nätverks- och informationssystem

#### 🟢 Omfattas ej
**Resultat:** "Din verksamhet omfattas sannolikt inte av Cybersäkerhetslagen"

**Betyder:**
- Verksamheten uppfyller inte kriterierna för att omfattas
- Inga direkta lagkrav enligt Cybersäkerhetslagen

**Rekommendation:**
Även om verksamheten inte omfattas är det god praxis att:
- Implementera grundläggande cybersäkerhetsåtgärder
- Ha beredskap för IT-incidenter
- Följa relevanta branschstandarder (ISO 27001, etc.)

#### 🟡 Undantag
**Resultat:** "Din verksamhet kan vara undantagen trots att den annars skulle omfattas"

**Betyder:**
- Verksamheten uppfyller kriterierna för att omfattas
- Men verksamheten kan vara undantagen p.g.a. säkerhetskänslig eller brottsbekämpande verksamhet
- Undantaget gäller INTE om betrodda tjänster tillhandahålls

**Behöver verifieras:**
Detta är en komplex juridisk situation som kräver:
- Verifiering av om undantaget verkligen gäller
- Eventuell konsultation med tillsynsmyndighet
- Juridisk rådgivning för säkerhet

#### ⚪ Osäker bedömning
**Resultat:** "Bedömningen är osäker på grund av 'Vet ej'-svar"

**Betyder:**
- En eller flera frågor besvarades med "Vet ej"
- Systemet kan inte göra en säker bedömning

**Nästa steg:**
1. Ta reda på saknade uppgifter
2. Genomför bedömningen igen med kompletta svar
3. Kontakta oss för hjälp att utreda osäkra områden

### Rådgivning till användare

Oavsett bedömningsresultat visar applikationen följande viktiga information:

**⚠️ Juridiskt förbehåll:**
> "Denna bedömning är en indikation baserad på lagtexten. För en definitiv bedömning och juridisk rådgivning rekommenderas att konsultera en jurist specialiserad på IT- och säkerhetsrätt."

**💡 Om du är osäker:**
Om du inte känner dig redo att hantera cybersäkerhetskraven själv, eller om bedömningen är osäker, erbjuder vi stöd:

- **Kontakta oss för en fördjupad analys** - Vi hjälper dig att förstå exakt vad lagen innebär för just din verksamhet
- **Få hjälp med implementering** - Vägledning om vilka åtgärder som behövs
- **Juridisk second opinion** - Verifiera din bedömning med juridisk expertis
- **Utbildning och workshops** - Lär teamet om cybersäkerhetskrav

Använd kontaktformuläret efter bedömningen för att få mer information. Vi återkommer inom 1-2 arbetsdagar.

### Teknisk implementation

Bedömningslogiken implementeras i funktionen `assessCoverage()` i `QuestionnaireForm.jsx`:

```javascript
const assessCoverage = (answers) => {
  // Del 1: Statlig, regional eller kommunal
  const coveredByPart1 = answers.q1 === 'ja' || answers.q2 === 'ja'
  
  // Del 2 och 3: Privat verksamhet och digitala tjänster
  const coveredByPart2And3 = 
    answers.q3 === 'ja' || 
    answers.q4 === 'ja' || 
    answers.q5 === 'ja' || 
    answers.q7 === 'ja' || 
    (answers.q8 && answers.q8.length > 0) ||
    answers.q9 === 'ja' || 
    answers.q10 === 'ja' || 
    answers.q11 === 'ja' || 
    answers.q12 === 'ja'
  
  // Del 4: Undantag
  const hasException = 
    (answers.q13 === 'ja' || answers.q14 === 'ja' || answers.q16 === 'ja' || answers.q17 === 'ja') &&
    answers.q15 !== 'ja'
  
  const hasUncertainAnswers = Object.entries(answers).some(([key, value]) => {
    if (key === 'q8') return false
    return value === 'vet_ej'
  })
  
  // Sammanfattande bedömning
  if ((coveredByPart1 || coveredByPart2And3) && !hasException) {
    return {
      result: "omfattas",
      message: "Din verksamhet omfattas sannolikt av Cybersäkerhetslagen (2025:1506).",
      details: "Baserat på dina svar uppfyller verksamheten kriterierna för att omfattas av lagen."
    }
  } else if ((coveredByPart1 || coveredByPart2And3) && hasException) {
    return {
      result: "undantag",
      message: "Din verksamhet kan vara undantagen trots att den annars skulle omfattas.",
      details: "Verksamheten uppfyller kriterier för att omfattas, men kan vara undantagen på grund av särskilda omständigheter."
    }
  } else if (hasUncertainAnswers) {
    return {
      result: "osäker",
      message: "Bedömningen är osäker på grund av 'Vet ej'-svar.",
      details: "För en säkrare bedömning behöver du ta reda på svaren på de frågor du är osäker på."
    }
  } else {
    return {
      result: "omfattas_ej",
      message: "Din verksamhet omfattas sannolikt inte av Cybersäkerhetslagen.",
      details: "Baserat på dina svar uppfyller verksamheten inte kriterierna för att omfattas av lagen."
    }
  }
}
```

## Säkerhet och Privacy

- **Row Level Security (RLS)** aktiverat på alla tabeller
- **Endast autentiserade användare** kan läsa data via admin-panelen
- **Alla användare** kan skapa svar (INSERT)
- **Miljövariabler** för känsliga nycklar
- **HTTPS** enforcement via Netlify
- **Inga personuppgifter** samlas in utan användarens medgivande

## Tillgänglighet

Applikationen följer WCAG 2.1 AA-standard:

- ✅ Semantisk HTML
- ✅ ARIA labels och roller
- ✅ Keyboard navigation
- ✅ Tillräcklig färgkontrast (4.5:1)
- ✅ Responsiv text-skalning
- ✅ Tydliga fokus-indikatorer
- ✅ Beskrivande felmeddelanden

## Utveckling

### Tillgängliga kommandon

```bash
# Starta dev-server
npm run dev

# Bygga för produktion
npm run build

# Förhandsgranska produktion-build
npm run preview
```

### Kodstandard

- **React Functional Components** med hooks
- **JSDoc-kommentarer** för funktioner och komponenter
- **Svenska kommentarer** för domänspecifik logik
- **Tailwind CSS** för styling
- **Error handling** med try/catch
- **Loading states** för async operations

## Support och Kontakt

För frågor eller support:
- Öppna en issue på GitHub
- Kontakta projektet via kontaktformuläret på webbplatsen

## Licens

Detta projekt är utvecklat som ett verktyg för att hjälpa organisationer förstå Cybersäkerhetslagen. 

---

**OBS:** Detta verktyg ger endast en indikation. För definitiv juridisk rådgivning, konsultera en specialist inom IT- och säkerhetsrätt.
