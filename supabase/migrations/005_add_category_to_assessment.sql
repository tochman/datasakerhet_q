-- Migration 005: Add category field to track MCFFS 2026:1 classification (väsentlig/viktig)
-- and add Q18, Q19, Q20 for specific compliance criteria
-- Created: 2025-02-XX

-- Add new question columns for MCFFS 2026:1 compliance
ALTER TABLE survey_responses 
ADD COLUMN q18 JSONB,  -- Transport väsentliga (checkbox array)
ADD COLUMN q19 TEXT,   -- Dricksvatten väsentliga (radio: Ja/Nej/Vet ej)
ADD COLUMN q20 JSONB;  -- Kemikalier viktiga (checkbox array)

-- Add category column to track väsentlig/viktig classification
ALTER TABLE survey_responses 
ADD COLUMN assessment_category TEXT;

-- Add comments to explain the columns
COMMENT ON COLUMN survey_responses.q18 IS 
'Transport väsentliga criteria: beredskapsflygplatser, flygkontroll, karantänshamnar, skyddade platser';

COMMENT ON COLUMN survey_responses.q19 IS 
'Dricksvatten väsentliga: ≥20,000 personer eller akutsjukhus';

COMMENT ON COLUMN survey_responses.q20 IS 
'Kemikalier viktiga: >1 ton/år för dricksvatten, livsmedel, vård, kritisk infrastruktur';

COMMENT ON COLUMN survey_responses.assessment_category IS 
'MCFFS 2026:1 classification: "väsentlig" (essential) or "viktig" (important) entity';

-- Create indexes for efficient lookups
CREATE INDEX idx_survey_responses_category ON survey_responses(assessment_category);
CREATE INDEX idx_survey_responses_q19 ON survey_responses(q19);
