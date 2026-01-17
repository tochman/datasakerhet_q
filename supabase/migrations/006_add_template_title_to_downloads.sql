-- Migration 006: Add template_title column to track which PDF template was downloaded
-- Created: 2025-01-17

-- Add template_title column
ALTER TABLE pdf_downloads 
ADD COLUMN template_title TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN pdf_downloads.template_title IS 
'Title of the PDF template downloaded: "Säkerhetsrekommendationer", "Händelserapport", or "Processbeskrivning"';

-- Create index for efficient lookups by template
CREATE INDEX idx_pdf_downloads_template ON pdf_downloads(template_title);
