-- Create table for tracking PDF downloads
CREATE TABLE IF NOT EXISTS pdf_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Reference to survey response (optional)
  survey_response_id UUID REFERENCES survey_responses(id) ON DELETE SET NULL,
  
  -- Browser/device information
  user_agent TEXT,
  browser_name TEXT,
  browser_version TEXT,
  os_name TEXT,
  device_type TEXT, -- 'mobile', 'tablet', 'desktop'
  
  -- Location data
  ip_address INET,
  country TEXT,
  city TEXT,
  
  -- Assessment result
  assessment_result TEXT,
  
  -- Additional metadata
  referrer TEXT,
  language TEXT
);

-- Add index for common queries
CREATE INDEX IF NOT EXISTS idx_pdf_downloads_created_at ON pdf_downloads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pdf_downloads_survey_response ON pdf_downloads(survey_response_id);
CREATE INDEX IF NOT EXISTS idx_pdf_downloads_assessment ON pdf_downloads(assessment_result);

-- Enable RLS
ALTER TABLE pdf_downloads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (anyone can log downloads)
CREATE POLICY "Allow anonymous insert downloads"
  ON pdf_downloads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users can read download data
CREATE POLICY "Authenticated users can read downloads"
  ON pdf_downloads
  FOR SELECT
  TO authenticated
  USING (true);

-- Add comment
COMMENT ON TABLE pdf_downloads IS 'Tracks PDF downloads with browser info and IP address';
