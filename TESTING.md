# Testplan för adaptivt formulär

## Översikt

Detta dokument beskriver testscenarier för att verifiera att det adaptiva frågeformuläret fungerar korrekt efter omarbetningen av logiken.

## Scenario 1: Statlig myndighet
**Förväntade frågor:** Q1, Q13-Q17 (6 frågor totalt)

### Steg:
1. Starta formuläret
2. Q1: "Är din verksamhet en statlig myndighet?" → **Ja**
3. Förväntat: Hoppa direkt till Q13 (undantagsfrågor)
4. Svara på Q13-Q17
5. Se resultat: "Omfattas" (om inga undantag gäller)

### Verifiering:
- [ ] Endast 6 frågor visas totalt
- [ ] Q2-Q12 hoppas över automatiskt
- [ ] Progress visar: "Fråga X av 6"
- [ ] Resultat visas korrekt efter sista frågan

---

## Scenario 2: Kommun eller Region
**Förväntade frågor:** Q1, Q2, Q13-Q17 (7 frågor totalt)

### Steg:
1. Starta formuläret
2. Q1: "Är din verksamhet en statlig myndighet?" → **Nej**
3. Q2: "Är din verksamhet en region, en kommun eller ett kommunalförbund?" → **Ja**
4. Förväntat: Hoppa direkt till Q13 (undantagsfrågor)
5. Svara på Q13-Q17
6. Se resultat

### Verifiering:
- [ ] Endast 7 frågor visas totalt
- [ ] Q3-Q12 hoppas över automatiskt
- [ ] Progress visar: "Fråga X av 7"
- [ ] Resultat visas korrekt

---

## Scenario 3: Privat utan svenskt säte (EARLY EXIT)
**Förväntade frågor:** Q1, Q2, Q3 (3 frågor + resultat direkt)

### Steg:
1. Q1: "Är din verksamhet en statlig myndighet?" → **Nej**
2. Q2: "Är din verksamhet en region, en kommun eller ett kommunalförbund?" → **Nej**
3. Q3: "Har din verksamhet sitt huvudsakliga säte eller etablering i Sverige?" → **Nej**
4. **STOP** - Formuläret ska visa resultat direkt

### Verifiering:
- [ ] Endast 3 frågor visas
- [ ] Resultat visas direkt efter Q3 (ingen Q4)
- [ ] Resultat: "Din verksamhet omfattas inte av Cybersäkerhetslagen"
- [ ] Förklaring: Privata verksamheter måste ha sitt huvudsakliga säte i Sverige

---

## Scenario 4: Privat litet företag
**Förväntade frågor:** Q1-Q8, Q12-Q17 (cirka 14 frågor)

### Steg:
1. Q1 → **Nej**
2. Q2 → **Nej**
3. Q3 → **Ja** (har svenskt säte)
4. Q4: "Omfattas er verksamhet av NIS 2?" → **Nej** (eller lämna tom)
5. Q5: "Är din verksamhet ett medelstort eller större företag?" → **Nej**
6. Fortsätt med Q6-Q8 (utbildning, telenät, digitala tjänster)
7. **Observera:** Q9-Q11 ska hoppas över
8. Q12 visas (betrodda tjänster)
9. Q13-Q17 visas (undantag)

### Verifiering:
- [ ] Q9-Q11 hoppas över (kritiska samhällsfunktioner)
- [ ] Cirka 14 frågor totalt visas
- [ ] Progress tracking är korrekt

---

## Scenario 5: Privat stort företag eller NIS 2-omfattad
**Förväntade frågor:** Q1-Q5, Q7-Q8, Q12-Q17 (cirka 13 frågor)

### Steg:
1. Q1 → **Nej**
2. Q2 → **Nej**
3. Q3 → **Ja** (har svenskt säte)
4. Q4: "Omfattas er verksamhet av NIS 2?" → **Ja** (välj minst en bransch)
5. Q5: "Är din verksamhet ett medelstort eller större företag?" → **Ja**
6. **Observera:** Q6 ska hoppas över (utbildningsanordnare, redan omfattad)
7. Q7-Q8 visas (telenät, digitala tjänster)
8. **Observera:** Q9-Q11 ska hoppas över (redan omfattad av NIS 2)
9. Q12 visas (betrodda tjänster)
10. Q13-Q17 visas (undantag)

### Verifiering:
- [ ] Q6 hoppas över
- [ ] Q9-Q11 hoppas över
- [ ] Cirka 13 frågor totalt visas
- [ ] Progress tracking är korrekt

---

## Scenario 6: Privat osäker om NIS 2/storlek
**Förväntade frågor:** Q1-Q17 (alla frågor, cirka 17 frågor)

### Steg:
1. Q1 → **Nej**
2. Q2 → **Nej**
3. Q3 → **Ja**
4. Q4 → **Vet ej**
5. Q5 → **Vet ej**
6. Alla återstående frågor Q6-Q17 ska visas

### Verifiering:
- [ ] Alla frågor Q1-Q17 visas (ingen hoppar över)
- [ ] Progress visar "Fråga X av 17"
- [ ] Resultat kan visa "osäker" beroende på andra svar

---

## Test av Supabase-felhantering

### Scenario A: Supabase fungerar
1. Slutför ett formulär
2. **Förväntat:** Ingen gul varningsruta visas
3. Data sparas i databasen

### Scenario B: Supabase fungerar inte (simulerad)
För att testa detta, kan man tillfälligt ändra Supabase-konfigurationen till ogiltiga värden.

1. Slutför ett formulär
2. **Förväntat:** 
   - Gul varningsruta visas: "Observera: Dina svar kunde inte sparas i databasen..."
   - Resultat visas ändå
   - Data sparas i localStorage (kontrollera med browser DevTools)
   - Användaren kan fortsätta använda applikationen

### Verifiering:
- [ ] Applikationen kraschar INTE vid databasfel
- [ ] Ingen blockande alert() visas
- [ ] Vänlig varningstext på svenska visas
- [ ] Resultat visas korrekt trots databasfel
- [ ] Data finns i localStorage under nyckeln "survey_backup"

---

## Debug-läge

### Aktivering:
- Debug-läge aktiveras automatiskt i development mode (`npm run dev`)
- Debug-panelen visas i nedre högra hörnet

### Verifiering:
- [ ] Debug-panel visas med aktuell information:
  - User type (t.ex. "PRIVAT_LITEN", "OFFENTLIG_STATLIG")
  - Current Q (aktuell fråge-ID)
  - Visible Q's (lista över synliga frågor)
  - Progress (X/Y)
  - Antal besvarade frågor
- [ ] Console.log visar detaljerad information om flödet
- [ ] Debug-panelen uppdateras när man svarar på frågor

---

## Regression Testing

Testa att befintlig funktionalitet fortfarande fungerar:

- [ ] Bakåt-knappen fungerar korrekt
- [ ] Framåt-knappen är inaktiverad tills frågan besvarats
- [ ] Checkbox-frågor är alltid valfria (kan lämnas tomma)
- [ ] Radio-frågor kräver svar
- [ ] Section titles visas när man kommer till en ny sektion
- [ ] Progress bar uppdateras korrekt
- [ ] "Slutför"-knappen visas på sista frågan
- [ ] Kontaktformulär visas när man klickar på "Vill ha mer information"
- [ ] SecurityMeasures visas endast när resultat är "omfattas"

---

## Checklista för slutlig verifiering

- [ ] Alla 6 testscenarier körs igenom
- [ ] Supabase-felhantering fungerar
- [ ] Debug-läge fungerar i development
- [ ] Ingen regressionsbuggar hittade
- [ ] Applikationen bygger utan fel (`npm run build`)
- [ ] Alla console.warn meddelanden är tydliga och på svenska
- [ ] Användaren kan alltid se sitt resultat, även vid databasfel
