-- =====================================================
-- CYBERSÄKERHETSLAGEN FRÅGEFORMULÄR - DATABASSCHEMA
-- =====================================================
-- OBS: Kör denna fil ENDAST på en tom databas.
-- För befintliga databaser, använd 002_add_q0_column.sql
-- =====================================================

-- Tabell för formulärsvar
CREATE TABLE IF NOT EXISTS survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  q0 TEXT,  -- Grundläggande verksamhetstyp (Offentlig/Privat/Vet ej)
  q1 TEXT,
  q2 TEXT,
  q3 TEXT,
  q4 TEXT,  -- Branscher (JSON-sträng)
  q5 TEXT,
  q6 TEXT,
  q7 TEXT,
  q8_services JSONB,  -- Digitala tjänster
  q9 TEXT,
  q10 TEXT,
  q11 TEXT,
  q12 TEXT,
  q13 TEXT,
  q14 TEXT,
  q15 TEXT,
  q16 TEXT,
  q17 TEXT,
  assessment_result TEXT,
  assessment_message TEXT,
  assessment_details TEXT,
  wants_contact BOOLEAN DEFAULT FALSE
);

-- Tabell för kontaktinformation
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  survey_response_id UUID REFERENCES survey_responses(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  message TEXT
);

-- Index för bättre prestanda
CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at ON survey_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_survey_responses_wants_contact ON survey_responses(wants_contact);
CREATE INDEX IF NOT EXISTS idx_contact_info_survey_response ON contact_info(survey_response_id);

-- Row Level Security (RLS)
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Ta bort gamla policies om de finns
DROP POLICY IF EXISTS "Enable insert for all users" ON survey_responses;
DROP POLICY IF EXISTS "Enable insert for all users" ON contact_info;
DROP POLICY IF EXISTS "Enable read for authenticated users only" ON survey_responses;
DROP POLICY IF EXISTS "Enable read for authenticated users only" ON contact_info;
DROP POLICY IF EXISTS "Enable update for all users" ON survey_responses;

-- Policy: Alla kan skapa (anon och authenticated)
CREATE POLICY "Allow anonymous insert" ON survey_responses
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow anonymous insert" ON contact_info
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Policy: Alla kan uppdatera sina egna svar (för wants_contact)
CREATE POLICY "Allow anonymous update" ON survey_responses
  FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Endast autentiserade användare kan läsa (för admin)
CREATE POLICY "Allow authenticated read" ON survey_responses
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read" ON contact_info
  FOR SELECT TO authenticated
  USING (true);
