-- Migration: Add q0 column for existing databases
-- This adds the q0 column for the basic organization type question

-- Add q0 column if it doesn't exist
ALTER TABLE survey_responses 
ADD COLUMN IF NOT EXISTS q0 TEXT;

-- Add comment for documentation
COMMENT ON COLUMN survey_responses.q0 IS 'Grundläggande verksamhetstyp: Offentlig, Privat, eller Vet ej';
