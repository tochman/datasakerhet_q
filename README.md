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

## Funktioner

### För Användare
- ✅ **Frågeformulär med 17 frågor** uppdelade i 4 delar
- ✅ **Automatisk bedömning** enligt lagstiftningens kriterier
- ✅ **Visuell progress-indikator** för användarvänlig navigation
- ✅ **Kontaktformulär** för de som vill ha mer information
- ✅ **Responsiv design** som fungerar på alla enheter
- ✅ **Tillgänglighet** enligt WCAG 2.1 AA-standard

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
│   │   ├── AdminPanel.jsx           # Admin-dashboard
│   │   ├── AdminLogin.jsx           # Admin-inloggning
│   │   └── PrivateRoute.jsx         # Route-skydd
│   ├── lib/
│   │   └── supabaseClient.js        # Supabase-konfiguration
│   ├── App.jsx                      # Routing
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Tailwind CSS
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql   # Databasschema
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

### 3. Skapa admin-användare

1. Gå till "Authentication" > "Users" i Supabase Dashboard
2. Klicka på "Add user" > "Create new user"
3. Ange email och lösenord för admin
4. Användaren kan nu logga in på `/admin/login`

### 4. Hämta API-nycklar

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

Applikationen använder följande logik för att bedöma om en verksamhet omfattas:

1. **Omfattas om:**
   - Del 1: Statlig/regional/kommunal verksamhet (Q1 eller Q2 = Ja)
   - ELLER Del 2-3: Uppfyller storlek/sektor-krav (Q3-Q12)
   - OCH INTE har undantag (Del 4)

2. **Undantag om:**
   - Uppfyller kriterier för att omfattas
   - MEN bedriver säkerhetskänslig/brottsbekämpande verksamhet (Q13, Q14, Q16, Q17 = Ja)
   - SÅVIDA INTE tillhandahåller betrodda tjänster (Q15 = Ja)

3. **Osäker om:**
   - Användaren svarat "Vet ej" på någon fråga

4. **Omfattas ej om:**
   - Inte uppfyller kriterierna ovan

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
