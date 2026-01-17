import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get Supabase client with service_role for bypassing RLS
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Parse request body
    const {
      surveyResponseId,
      assessmentResult,
      userAgent,
      language,
      referrer
    } = await req.json()

    // Get real IP address from request headers
    const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown'

    // Get geolocation from IP address using ip-api.com (free, no API key needed)
    let country = null
    let city = null
    if (ipAddress && ipAddress !== 'unknown') {
      try {
        const geoResponse = await fetch(`http://ip-api.com/json/${ipAddress}?fields=status,country,city`)
        if (geoResponse.ok) {
          const geoData = await geoResponse.json()
          if (geoData.status === 'success') {
            country = geoData.country
            city = geoData.city
          }
        }
      } catch (error) {
        console.warn('Geolocation lookup failed:', error)
        // Continue without geolocation data
      }
    }

    // Parse user agent to extract browser/device info
    const browserInfo = parseUserAgent(userAgent || '')

    // Insert download record
    const { data, error } = await supabase
      .from('pdf_downloads')
      .insert({
        survey_response_id: surveyResponseId || null,
        assessment_result: assessmentResult,
        user_agent: userAgent,
        browser_name: browserInfo.browserName,
        browser_version: browserInfo.browserVersion,
        os_name: browserInfo.osName,
        device_type: browserInfo.deviceType,
        ip_address: ipAddress,
        country: country,
        city: city,
        language: language,
        referrer: referrer
      })
      .select()
      .single()

    if (error) {
      console.error('Error logging PDF download:', error)
      throw error
    }

    return new Response(
      JSON.stringify({ success: true, downloadId: data.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

// Simple user agent parser
function parseUserAgent(ua: string): {
  browserName: string
  browserVersion: string
  osName: string
  deviceType: string
} {
  const result = {
    browserName: 'Unknown',
    browserVersion: 'Unknown',
    osName: 'Unknown',
    deviceType: 'desktop'
  }

  if (!ua) return result

  // Detect browser
  if (ua.includes('Chrome') && !ua.includes('Edg')) {
    result.browserName = 'Chrome'
    const match = ua.match(/Chrome\/(\d+)/)
    result.browserVersion = match ? match[1] : 'Unknown'
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    result.browserName = 'Safari'
    const match = ua.match(/Version\/(\d+)/)
    result.browserVersion = match ? match[1] : 'Unknown'
  } else if (ua.includes('Firefox')) {
    result.browserName = 'Firefox'
    const match = ua.match(/Firefox\/(\d+)/)
    result.browserVersion = match ? match[1] : 'Unknown'
  } else if (ua.includes('Edg')) {
    result.browserName = 'Edge'
    const match = ua.match(/Edg\/(\d+)/)
    result.browserVersion = match ? match[1] : 'Unknown'
  }

  // Detect OS
  if (ua.includes('Windows')) {
    result.osName = 'Windows'
  } else if (ua.includes('Mac OS X')) {
    result.osName = 'macOS'
  } else if (ua.includes('Linux')) {
    result.osName = 'Linux'
  } else if (ua.includes('Android')) {
    result.osName = 'Android'
  } else if (ua.includes('iPhone') || ua.includes('iPad')) {
    result.osName = 'iOS'
  }

  // Detect device type
  if (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) {
    result.deviceType = 'mobile'
  } else if (ua.includes('iPad') || ua.includes('Tablet')) {
    result.deviceType = 'tablet'
  }

  return result
}
