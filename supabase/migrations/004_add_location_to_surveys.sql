-- Add IP and location tracking to survey responses
ALTER TABLE survey_responses
ADD COLUMN IF NOT EXISTS ip_address INET,
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS city TEXT;

-- Add index for location queries
CREATE INDEX IF NOT EXISTS idx_survey_responses_country ON survey_responses(country);
CREATE INDEX IF NOT EXISTS idx_survey_responses_city ON survey_responses(city);

-- Add comment
COMMENT ON COLUMN survey_responses.ip_address IS 'IP address of survey respondent';
COMMENT ON COLUMN survey_responses.country IS 'Country from IP geolocation';
COMMENT ON COLUMN survey_responses.city IS 'City from IP geolocation';
