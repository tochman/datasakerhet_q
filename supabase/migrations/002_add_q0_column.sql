-- =====================================================
-- MIGRATION: Fix RLS policies for existing databases
-- =====================================================
-- Kör denna fil om du har en befintlig databas där
-- inserts inte fungerar (RLS-problem)
-- =====================================================

-- Lägg till q0 kolumn om den saknas
ALTER TABLE survey_responses 
ADD COLUMN IF NOT EXISTS q0 TEXT;

-- Ta bort gamla policies
DROP POLICY IF EXISTS "Enable insert for all users" ON survey_responses;
DROP POLICY IF EXISTS "Enable insert for all users" ON contact_info;
DROP POLICY IF EXISTS "Enable read for authenticated users only" ON survey_responses;
DROP POLICY IF EXISTS "Enable read for authenticated users only" ON contact_info;
DROP POLICY IF EXISTS "Allow anonymous insert" ON survey_responses;
DROP POLICY IF EXISTS "Allow anonymous insert" ON contact_info;
DROP POLICY IF EXISTS "Allow anonymous update" ON survey_responses;
DROP POLICY IF EXISTS "Allow authenticated read" ON survey_responses;
DROP POLICY IF EXISTS "Allow authenticated read" ON contact_info;

-- Skapa korrekta policies för anon-användare

-- INSERT: Tillåt anonyma användare att skapa svar
CREATE POLICY "Allow anonymous insert" ON survey_responses
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow anonymous insert" ON contact_info
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- UPDATE: Tillåt anonyma användare att uppdatera (för wants_contact)
CREATE POLICY "Allow anonymous update" ON survey_responses
  FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- SELECT: Endast autentiserade användare (admin) kan läsa
CREATE POLICY "Allow authenticated read" ON survey_responses
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read" ON contact_info
  FOR SELECT TO authenticated
  USING (true);
