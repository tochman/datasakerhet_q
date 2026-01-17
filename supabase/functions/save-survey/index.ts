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

    const { answers, assessment } = await req.json()

    // Insert survey response
    const { data, error } = await supabaseClient
      .from('survey_responses')
      .insert([{
        q0: answers.q0 || null,
        q1: answers.q1 || null,
        q2: answers.q2 || null,
        q3: answers.q3 || null,
        q4: answers.q4 ? JSON.stringify(answers.q4) : null,
        q5: answers.q5 || null,
        q6: answers.q6 || null,
        q7: answers.q7 || null,
        q8_services: answers.q8 || null,
        q9: answers.q9 || null,
        q10: answers.q10 || null,
        q11: answers.q11 || null,
        q12: answers.q12 || null,
        q13: answers.q13 || null,
        q14: answers.q14 || null,
        q15: answers.q15 || null,
        q16: answers.q16 || null,
        q17: answers.q17 || null,
        assessment_result: assessment.result,
        assessment_message: assessment.message,
        assessment_details: assessment.details,
        wants_contact: false
      }])
      .select('id')
      .single()

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
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
