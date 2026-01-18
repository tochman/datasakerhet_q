# Dokumentation: Frågeformulär för Cybersäkerhetslagen (2025:1506)

## Översikt

Detta frågeformulär är utformat för att hjälpa verksamheter bedöma om de omfattas av den svenska Cybersäkerhetslagen (2025:1506). Formuläret använder en adaptiv logik som anpassar vilka frågor som visas baserat på användarens tidigare svar.

---

## Frågestruktur

Formuläret är indelat i **4 delar** med totalt **20 frågor**:

### Del 1: Grundläggande verksamhetstyp (Q0)

| Fråge-ID | Fråga | Typ | Alternativ |
|----------|-------|-----|------------|
| Q0 | Är din verksamhet huvudsakligen offentlig eller privat? | Radio | Offentlig, Privat, Vet ej |

**Syfte:** Avgör den övergripande verksamhetstypen för att anpassa efterföljande frågor.

---

### Del 2: Offentlig verksamhet (Q1-Q2)

*Visas endast om Q0 = "Offentlig" eller "Vet ej"*

| Fråge-ID | Fråga | Typ | Alternativ |
|----------|-------|-----|------------|
| Q1 | Är din verksamhet en statlig myndighet som fattar viktiga beslut som påverkar människor eller företag över Sveriges gränser? | Radio | Ja, Nej, Vet ej |
| Q2 | Är din verksamhet en region, en kommun eller ett kommunalförbund? | Radio | Ja, Nej, Vet ej |

**Syfte:** Identifiera offentliga verksamheter som direkt omfattas av lagen.

---

### Del 3: Etablering, storlek och generella kriterier (Q3-Q12, Q18-Q20)

| Fråge-ID | Fråga | Typ | Visningsvillkor | Alternativ |
|----------|-------|-----|-----------------|------------|
| Q3 | Har din verksamhet sitt huvudsakliga säte eller etablering i Sverige? | Radio | Alla | Ja, Nej, Vet ej |
| Q12 | Tillhandahåller din verksamhet "betrodda tjänster"? | Radio | Alla | Ja, Nej, Vet ej |
| Q5 | Är din verksamhet ett medelstort eller större företag? | Radio | Privat/Vet ej | Ja, Nej, Vet ej |
| Q4 | Inom vilka branscher är din organisation verksam? | Checkbox | Alla | Se branschlista nedan |
| Q6 | Är din verksamhet en privat utbildningsanordnare med examensrätt? | Radio | Utbildning valt i Q4 | Ja, Nej, Vet ej |
| Q7 | Tillhandahåller din verksamhet allmänna telenät eller elektronisk kommunikation? | Radio | Telecom valt i Q4 | Ja, Nej, Vet ej |
| Q8 | Erbjuder din verksamhet digitala tjänster? | Checkbox | Digitala leverantörer valt i Q4 | Se lista nedan |
| **Q18** | **Är er verksamhet inom transport någon av följande?** | **Checkbox** | **Transport valt i Q4** | **Se lista nedan** |
| **Q19** | **Producerar eller distribuerar ni dricksvatten till minst 20 000 personer ELLER till akutsjukhus?** | **Radio** | **Dricksvatten valt i Q4** | **Ja, Nej, Vet ej** |
| **Q20** | **Tillverkar, producerar eller distribuerar ni kemikalier som överstiger 1 ton per år OCH används inom vissa områden?** | **Checkbox** | **Tillverkning valt i Q4** | **Se lista nedan** |
| Q9 | Är din verksamhet den enda leverantören i Sverige av en kritisk tjänst? | Radio | Privat/Vet ej | Ja, Nej, Vet ej |
| Q10 | Skulle ett avbrott i er tjänst allvarligt kunna påverka samhället? | Radio | Alla | Ja, Nej, Vet ej |
| Q11 | Är er verksamhet extra viktig på nationell eller regional nivå? | Radio | Alla | Ja, Nej, Vet ej |

**Branschalternativ för Q4:**
- Energi (el, gas, fjärrvärme/kyla, olja, vätgas)
- Transport (flyg, järnväg, sjöfart, vägtransporter)
- Bank och finans
- Hälso- och sjukvård
- Dricksvatten och avlopp
- Post och kurirtjänster
- Avfallshantering
- Tillverkning (medicinteknik, fordon, elektronik, maskiner, kemikalier, livsmedel)
- Digitala leverantörer (molntjänster, datacenter, sökmotorer)
- Forskning (universitet, forskningsorganisationer)
- Utbildning
- Telecom
- Ingen av ovanstående

**Digitala tjänster för Q8:**
- Molntjänster (cloud services)
- Datacentraltjänster (datacenter services)
- Nätverk för leverans av innehåll (CDN)
- Utlokaliserade driftstjänster
- Utlokaliserade säkerhetstjänster
- Marknadsplatser online
- Sökmotorer
- Plattformar för sociala nätverkstjänster
- Registreringsenhet för toppdomäner
- DNS-tjänster
- Domännamnsregistreringstjänster
- Ingen av ovanstående

**Transportkriterier för Q18 (Väsentliga verksamhetsutövare enligt MCFFS 2026:1):**
- Beredskapsflygplats (flygplats med avtal med Trafikverket)
- Tillhandahåller flygkontrolltjänster
- Karantänshamn (hamn utpekad av Folkhälsomyndigheten)
- Skyddad plats (hamn, kaj eller skyddat område utpekat av Transportstyrelsen)
- Ingen av ovanstående

**Dricksvattenkritierier för Q19 (Väsentliga verksamhetsutövare enligt MCFFS 2026:1):**
- Producerar eller distribuerar dricksvatten till minst 20 000 personer ELLER till akutsjukhus

**Kemikaliekriterier för Q20 (Viktiga verksamhetsutövare enligt MCFFS 2026:1):**
Tillverkar, producerar eller distribuerar kemikalier som överstiger 1 ton per år OCH används inom:
- Dricksvattenrening
- Livsmedelsproduktion
- Hälso- och sjukvård (inklusive läkemedel)
- Kritisk infrastruktur (energi, transport, etc.)
- Ingen av ovanstående

---

### Del 4: Undantag (Q13-Q17)

| Fråge-ID | Fråga | Typ | Visningsvillkor | Alternativ |
|----------|-------|-----|-----------------|------------|
| Q13 | Bedriver din verksamhet huvudsakligen säkerhetskänslig eller brottsbekämpande verksamhet? | Radio | Alla | Ja, Nej, Vet ej |
| Q14 | Är din verksamhet en privat aktör som sysslar med säkerhetskänslig verksamhet? | Radio | Privat/Vet ej | Ja, Nej, Vet ej |
| Q15 | Även om ni bedriver säkerhetskänslig verksamhet: Tillhandahåller ni också "betrodda tjänster"? | Radio | Q13=Ja ELLER Q14=Ja | Ja, Nej, Vet ej |
| Q16 | Är din verksamhet Regeringen, domstol eller liknande statligt organ? | Radio | Offentlig/Vet ej | Ja, Nej, Vet ej |
| Q17 | Är din verksamhet en fullmäktigeförsamling eller kommunstyrelse? | Radio | Offentlig/Vet ej | Ja, Nej, Vet ej |

**Viktigt om Q12 och Q15:**
- **Q12** frågar om betrodda tjänster i Del 3 (för att avgöra om verksamheten omfattas)
- **Q15** visas ENDAST om användaren svarat "Ja" på Q13 eller Q14 (undantagsfrågor)
- Om Q12 = "Ja", omfattas verksamheten alltid, även om undantag annars skulle gälla
- Q15 är en bekräftelse för dem som angett undantagsgrunder

---

## Bedömningslogik

Bedömningen av om en verksamhet omfattas av Cybersäkerhetslagen görs i slutet av formuläret baserat på alla insamlade svar. Logiken är uppdelad i fyra steg:

### Steg 1: Analys av Potentiell Omfattning

#### A. Direkt Offentlig Omfattning
En verksamhet omfattas direkt om:
- Q0 = "Offentlig" ELLER Q0 = "Vet ej"
- OCH (Q1 = "Ja" ELLER Q2 = "Ja")

#### B. Potentiell Privat/Övrig Omfattning
En verksamhet kan omfattas om:
- Har svenskt säte (Q3 = "Ja")
- OCH uppfyller minst ETT av följande kriterier:
  - Q12 = "Ja" (Betrodda tjänster)
  - Q5 = "Ja" (Medelstort/större företag)
  - Q4 innehåller NIS2-branscher (ej "Ingen av ovanstående")
  - Q6 = "Ja" (Privat utbildningsanordnare)
  - Q7 = "Ja" (Telenät)
  - Q8 innehåller digitala tjänster (ej "Ingen av ovanstående")
  - Q9 = "Ja" (Enda leverantör av kritisk tjänst)
  - Q10 = "Ja" (Avbrott påverkar samhället)
  - Q11 = "Ja" (Extra viktig verksamhet)

### Steg 2: Klassificering enligt MCFFS 2026:1

Om verksamheten omfattas analyseras om den klassificeras som **väsentlig** eller **viktig** verksamhetsutövare:

#### Väsentlig verksamhetsutövare
Verksamheten klassificeras som väsentlig om något av följande stämmer:
- **Q18** (Transport): Minst ett alternativ valt (utom "Ingen av ovanstående")
  - Beredskapsflygplats (flygplats med avtal med Trafikverket)
  - Tillhandahåller flygkontrolltjänster
  - Karantänshamn (hamn utpekad av Folkhälsomyndigheten)
  - Skyddad plats (hamn, kaj eller skyddat område utpekat av Transportstyrelsen)
- **Q19** (Dricksvatten): "Ja"
  - Producerar eller distribuerar dricksvatten till ≥20 000 personer eller akutsjukhus

**Konsekvenser för väsentliga verksamhetsutövare:**
- Strängare krav på cybersäkerhetsstyrning
- Obligatorisk incidentrapportering till tillsynsmyndighet
- Krav på registrering hos tillsynsmyndighet
- Högre krav på riskanalys och kontinuitetsplaner

**Meddelande i resultat:** "Du är en **väsentlig verksamhetsutövare** enligt MCFFS 2026:1, vilket innebär höga cybersäkerhetskrav inklusive obligatorisk registrering och incidentrapportering till tillsynsmyndighet."

#### Viktig verksamhetsutövare
Verksamheten klassificeras som viktig om den inte är väsentlig men:
- **Q20** (Kemikalier): Minst ett alternativ valt (utom "Ingen av ovanstående")
  - Tillverkar/distribuerar kemikalier >1 ton/år för:
    - Dricksvattenrening
    - Livsmedelsproduktion
    - Hälso- och sjukvård (inklusive läkemedel)
    - Kritisk infrastruktur (energi, transport, etc.)

**Konsekvenser för viktiga verksamhetsutövare:**
- Grundläggande krav på cybersäkerhetsstyrning
- Incidentrapportering vid allvarliga incidenter
- Lägre krav än för väsentliga verksamhetsutövare

**Meddelande i resultat:** "Du är en **viktig verksamhetsutövare** enligt MCFFS 2026:1, vilket innebär förhöjda cybersäkerhetskrav men inte lika strikta som för väsentliga verksamhetsutövare."

#### Övriga omfattade verksamheter
Om verksamheten omfattas men varken är väsentlig eller viktig:
- Grundkrav på cybersäkerhet enligt Cybersäkerhetslagen
- Dokumentationskrav
- Incidentrapportering vid väsentliga incidenter
- `category: null` i resultatet

### Steg 3: Analys av Undantag

Ett undantag kan gälla om MINST ETT av följande stämmer:
- Q13 = "Ja" (Säkerhetskänslig/brottsbekämpande)
- Q14 = "Ja" (Privat säkerhetskänslig)
- Q16 = "Ja" (Regering, domstolar etc.)
- Q17 = "Ja" (Fullmäktige/församlingar)

**Undantaget UPPHÄVS om:**
- Q15 = "Ja" (Betrodda tjänster trumpfar undantag)

### Steg 4: Hantering av Osäkerhet

Bedömningen markeras som "Osäker" om:
1. Q0 = "Vet ej" OCH inga klargörande svar på Q1, Q2, Q3
2. Q3 = "Vet ej" för privat verksamhet
3. ≥3 "Vet ej"-svar på kritiska frågor (Q4-Q12, Q18-Q20)
4. ≥2 "Vet ej"-svar på undantagsfrågor (Q13-Q17)

---

## Möjliga Bedömningsresultat

| Resultat | Färgkod | Beskrivning | Klassificering |
|----------|---------|-------------|----------------|
| **omfattas** | 🔴 Röd | Verksamheten omfattas sannolikt av Cybersäkerhetslagen | Kan vara väsentlig, viktig eller övrig |
| **undantag** | 🟡 Gul | Verksamheten kan vara undantagen trots att den annars skulle omfattas | - |
| **osäker** | ⚪ Grå | Bedömningen är osäker på grund av "Vet ej"-svar | - |
| **omfattas_ej** | 🟢 Grön | Verksamheten omfattas sannolikt inte av lagen | - |

### Klassificering i resultatet

När en verksamhet bedöms omfattas av lagen, inkluderas även ett `category`-fält i resultatet:

- **"väsentlig"**: Verksamheten är en väsentlig verksamhetsutövare enligt MCFFS 2026:1
  - Baseras på Q18 (transport) eller Q19 (dricksvatten)
  - Visas i resultattexten: "Du är en **väsentlig verksamhetsutövare** enligt MCFFS 2026:1"
  - Innebär strängare krav på rapportering och styrning

- **"viktig"**: Verksamheten är en viktig verksamhetsutövare enligt MCFFS 2026:1
  - Baseras på Q20 (kemikalier)
  - Visas i resultattexten: "Du är en **viktig verksamhetsutövare** enligt MCFFS 2026:1"
  - Innebär grundläggande krav med något lägre rapporteringskrav

- **null**: Verksamheten omfattas av Cybersäkerhetslagen men är varken väsentlig eller viktig
  - Omfattas av grundkraven i Cybersäkerhetslagen
  - Ingen särskild MCFFS 2026:1-klassificering

---

## Flödesdiagram för Bedömning

```
                           START
                             │
                             ▼
                    ┌─────────────────┐
                    │  Q0: Offentlig/ │
                    │  Privat/Vet ej  │
                    └─────────────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
         Offentlig        Privat        Vet ej
              │              │              │
              ▼              │              │
         ┌────────┐          │              │
         │ Q1=Ja? │──Ja──────┼──────────────┤
         └────────┘          │              │
              │Nej           │              │
              ▼              │              │
         ┌────────┐          │              │
         │ Q2=Ja? │──Ja──────┼──────────────┤
         └────────┘          │              │
              │Nej           │              │
              └──────┬───────┘              │
                     │                      │
                     ▼                      │
              ┌────────────┐                │
              │ Q3: Svenskt│                │
              │    säte?   │                │
              └────────────┘                │
                     │                      │
              ┌──────┴──────┐               │
              ▼             ▼               │
             Ja           Nej              │
              │             │               │
              ▼             ▼               │
         Del 3 frågor   OMFATTAS EJ         │
         (Q4-Q12)                           │
              │                             │
              ▼                             │
         ┌────────────┐                     │
         │ Uppfyller  │                     │
         │ kriterier? │                     │
         └────────────┘                     │
              │                             │
       ┌──────┴──────┐                      │
       ▼             ▼                      │
      Ja           Nej                      │
       │             │                      │
       ▼             ▼                      │
  Del 4 frågor  OMFATTAS EJ                 │
   (Q13-Q17)                                │
       │                                    │
       ▼                                    │
  ┌─────────────┐                           │
  │  Undantag   │◄──────────────────────────┘
  │   gäller?   │
  └─────────────┘
       │
 ┌─────┴─────┐
 ▼           ▼
Ja          Nej
 │           │
 ▼           ▼
Q15=Ja?   OMFATTAS
 │           
 ▼           
Ja ──► OMFATTAS
 │
 ▼
UNDANTAG
```

---

## Datalagring

### Supabase-tabeller

#### `survey_responses`
Lagrar alla formulärsvar och bedömningsresultat:

| Kolumn | Typ | Beskrivning |
|--------|-----|-------------|
| id | UUID | Primärnyckel |
| created_at | TIMESTAMP | Skapad tidpunkt |
| q0-q17 | TEXT | Svar på respektive fråga |
| q4, q8_services | JSONB | Flervalssvar som JSON |
| assessment_result | TEXT | Bedömningsresultat |
| assessment_message | TEXT | Bedömningsmeddelande |
| assessment_details | TEXT | Detaljerad beskrivning |
| wants_contact | BOOLEAN | Vill användaren bli kontaktad |

#### `contact_info`
Lagrar kontaktinformation:

| Kolumn | Typ | Beskrivning |
|--------|-----|-------------|
| id | UUID | Primärnyckel |
| survey_response_id | UUID | FK till survey_responses |
| name | TEXT | Namn (obligatorisk) |
| email | TEXT | E-post (obligatorisk) |
| phone | TEXT | Telefon (valfri) |
| organization | TEXT | Organisation (valfri) |
| message | TEXT | Meddelande (valfri) |

### Fallback till localStorage

Om Supabase inte är tillgängligt sparas data lokalt:
```javascript
{
  id: "local_<timestamp>",
  answers: { ... },
  assessment: { ... },
  timestamp: "ISO-8601"
}
```

---

## PDF-generering

När användaren väljer att ladda ner en PDF genereras ett dokument som innehåller:

1. **Header** - Titel och datum
2. **Verksamhetstyp** - Baserat på svar
3. **Bedömning** - Resultat med färgkodning
4. **Säkerhetsåtgärder** - Kategoriserade rekommendationer
5. **Checklista** - Konkreta uppgifter att implementera
6. **Disclaimer** - Juridisk friskrivning

---

## Säkerhetsåtgärder vid "omfattas"

När en verksamhet bedöms omfattas av lagen visas rekommenderade säkerhetsåtgärder enligt 2 kap. 3-4 §§:

### Säkerhetsåtgärder (2 kap. 3-4 §§)
1. Riskanalys och säkerhetsstrategier
2. Incidenthantering
3. Kontinuitets- och krishantering
4. Säkerhet i leveranskedjan
5. Säkerhet vid förvärv, utveckling och underhåll
6. Bedömning av åtgärdernas effektivitet
7. Cyberhygien och utbildning
8. Kryptografi och kryptering
9. Personalsäkerhet, åtkomstkontroll och tillgångsförvaltning
10. Autentisering och säkrad kommunikation
11. Utbildning av ledningen

### Incidentrapportering (2 kap. 5-10 §§)
1. Anmälningsskyldighet (14 dagar)
2. Omedelbar upplysning (24 timmar)
3. Incidentanmälan (24-72 timmar)
4. Delrapportering (på begäran)
5. Slutrapportering (1 månad)
6. Information till tjänstemottagare vid incidenter
7. Information till tjänstemottagare vid cyberhot

---

## Lagliga referenser

Formuläret och bedömningslogiken baseras på:

- **1 kap. 4-7 §§** - Tillämpningsområde och omfattning
- **2 kap. 2 §** - Anmälningsskyldighet
- **2 kap. 3-4 §§** - Säkerhetsåtgärder
- **2 kap. 5-10 §§** - Incidentrapportering
- **2 kap. 14 §** - Föreskriftsrätt

---

## Teknisk implementation

### Komponenter
- `QuestionnaireForm.jsx` - Huvudformulär med adaptiv logik
- `QuestionSection.jsx` - Enskild frågevisning
- `ResultsSummary.jsx` - Resultatvisning
- `SecurityMeasures.jsx` - Säkerhetsåtgärder och checklista
- `ContactForm.jsx` - Kontaktformulär
- `generateSecurityPDF.js` - PDF-generering

### Beroenden
- React 18
- Supabase JS Client
- jsPDF + jspdf-autotable
- React Router DOM

---

*Senast uppdaterad: Januari 2026*
