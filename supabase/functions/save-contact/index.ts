import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { surveyResponseId, name, email, phone, organization, message } = await req.json()

    // Validate required fields
    if (!surveyResponseId || !name || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: surveyResponseId, name, email' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Insert contact info
    const { error: contactError } = await supabaseClient
      .from('contact_info')
      .insert([{
        survey_response_id: surveyResponseId,
        name: name,
        email: email,
        phone: phone || null,
        organization: organization || null,
        message: message || null
      }])

    if (contactError) {
      console.error('Contact insert error:', contactError)
      return new Response(
        JSON.stringify({ error: contactError.message }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Update survey response to mark wants_contact = true
    const { error: updateError } = await supabaseClient
      .from('survey_responses')
      .update({ wants_contact: true })
      .eq('id', surveyResponseId)

    if (updateError) {
      console.error('Update error:', updateError)
      // Don't fail - contact info was saved
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (err) {
    console.error('Server error:', err)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
