import React, { useState, useEffect } from 'react'

/**
 * Kontaktformulär för att samla in information från användare
 * @param {Object} props
 * @param {string} props.surveyResponseId - ID för det associerade formulärsvaret (optional, will use localStorage if not provided)
 */
export default function ContactForm({ surveyResponseId: propSurveyId }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [surveyResponseId, setSurveyResponseId] = useState(propSurveyId)

  // Hämta survey ID från localStorage om det inte finns som prop
  useEffect(() => {
    if (!propSurveyId) {
      const storedId = localStorage.getItem('current_survey_id')
      if (storedId) {
        setSurveyResponseId(storedId)
      }
    }
  }, [propSurveyId])

  // Validera e-postformat
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Validera formulär
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Namn är obligatoriskt'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-post är obligatoriskt'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Ogiltig e-postadress'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Hantera formulärinlämning
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Kontrollera att vi har ett survey ID
    if (!surveyResponseId || surveyResponseId.startsWith('local_')) {
      // Om vi bara har ett lokalt ID, spara kontaktinfo lokalt också
      const localContact = {
        ...formData,
        survey_id: surveyResponseId,
        timestamp: new Date().toISOString()
      }
      localStorage.setItem('contact_backup', JSON.stringify(localContact))
      setSubmitted(true)
      return
    }

    setLoading(true)
    
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      
      if (!supabaseUrl) {
        throw new Error('Supabase URL not configured')
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/save-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surveyResponseId: surveyResponseId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          organization: formData.organization || null,
          message: formData.message || null
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save contact')
      }

      // Rensa localStorage efter framgångsrik sparning
      localStorage.removeItem('current_survey_id')
      
      setSubmitted(true)
      console.log('✅ Kontaktinformation sparad')

    } catch (error) {
      console.error('Fel vid sparande av kontaktinformation:', error)
      // Spara lokalt som backup
      const localContact = {
        ...formData,
        survey_id: surveyResponseId,
        timestamp: new Date().toISOString()
      }
      localStorage.setItem('contact_backup', JSON.stringify(localContact))
      // Visa ändå framgångsmeddelande till användaren
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div id="contact-form" className="max-w-2xl mx-auto bg-green-50 border-2 border-green-300 rounded-sm p-8 text-center">
        <svg className="w-16 h-16 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-green-900 mb-2">
          Tack för ditt intresse!
        </h2>
        <p className="text-green-800">
          Vi har tagit emot din information och kommer att kontakta dig inom kort.
        </p>
      </div>
    )
  }

  return (
    <div id="contact-form" className="max-w-2xl mx-auto bg-white rounded-sm shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Kontaktinformation
      </h2>
      <p className="text-gray-600 mb-6">
        Fyll i dina uppgifter så kontaktar vi dig med mer information om Cybersäkerhetslagen.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Namn */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Namn <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-3 border-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-required="true"
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* E-post */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            E-post <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-3 border-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-required="true"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Telefon */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Telefon
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Organisation */}
        <div>
          <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 mb-2">
            Företag/Organisation
          </label>
          <input
            type="text"
            id="organization"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Meddelande */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            Meddelande/Frågor
          </label>
          <textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-start">
          <input
            type="checkbox"
            id="wantsInfo"
            checked={true}
            readOnly
            className="mt-1 h-5 w-5 text-primary"
          />
          <label htmlFor="wantsInfo" className="ml-3 text-sm text-gray-700">
            Jag vill ha mer information om Cybersäkerhetslagen
          </label>
        </div>

        {/* Submit-knapp */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-sm shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Skickar...
            </span>
          ) : (
            'Skicka'
          )}
        </button>
      </form>
    </div>
  )
}
