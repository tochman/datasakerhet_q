-- Tabell för formulärsvar
CREATE TABLE survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  q1 TEXT,
  q2 TEXT,
  q3 TEXT,
  q4 TEXT,
  q5 TEXT,
  q6 TEXT,
  q7 TEXT,
  q8_services JSONB,
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
CREATE TABLE contact_info (
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
CREATE INDEX idx_survey_responses_created_at ON survey_responses(created_at DESC);
CREATE INDEX idx_survey_responses_wants_contact ON survey_responses(wants_contact);
CREATE INDEX idx_contact_info_survey_response ON contact_info(survey_response_id);

-- Row Level Security (RLS)
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Policy: Alla kan skapa
CREATE POLICY "Enable insert for all users" ON survey_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for all users" ON contact_info
  FOR INSERT WITH CHECK (true);

-- Policy: Endast autentiserade användare kan läsa (för admin)
CREATE POLICY "Enable read for authenticated users only" ON survey_responses
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read for authenticated users only" ON contact_info
  FOR SELECT USING (auth.role() = 'authenticated');
