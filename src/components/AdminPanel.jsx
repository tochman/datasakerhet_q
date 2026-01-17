import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

// Question labels for displaying in admin panel
const QUESTION_LABELS = {
  q0: 'Typ av verksamhet',
  q1: 'Statlig myndighet?',
  q2: 'Kommunal/regional verksamhet?',
  q3: 'Svenskt säte?',
  q4: 'NIS2-omfattad sektor',
  q5: 'Stort företag? (>50 anställda eller >10M€)',
  q6: 'Utbildningsanordnare?',
  q7: 'DNS-tjänst eller TLD-registrar?',
  q8: 'Tillhandahåller betrodda tjänster?',
  q9: 'Kritisk samhällsfunktion?',
  q10: 'Viktig för samhället?',
  q11: 'Allvarlig störning vid incident?',
  q12: 'E-legitimation?',
  q13: 'Domstols-/säkerhetstjänst eller utrikesrepresentation?',
  q14: 'Underrättelseverksamhet eller försvarsmateriel?',
  q15: 'Följer betrodda tjänster EU-förordningar?',
  q16: 'Mikroföretag?',
  q17: 'Internationellt eller regionalt organ?'
}

/**
 * Admin-panel för att hantera och visa formulärsvar
 */
export default function AdminPanel() {
  const [responses, setResponses] = useState([])
  const [filteredResponses, setFilteredResponses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedResponse, setSelectedResponse] = useState(null)
  const [contactInfo, setContactInfo] = useState(null)
  const [pdfDownloads, setPdfDownloads] = useState([])
  const [showDownloads, setShowDownloads] = useState(false)
  const [filters, setFilters] = useState({
    wantsContact: 'all',
    result: 'all',
    searchTerm: '',
    dateFrom: '',
    dateTo: ''
  })
  const navigate = useNavigate()

  // Hämta alla svar vid laddning
  useEffect(() => {
    fetchResponses()
    fetchPDFDownloads()
  }, [])

  // Applicera filter när responses eller filters ändras
  useEffect(() => {
    applyFilters()
  }, [responses, filters])

  const fetchResponses = async () => {
    try {
      // Hämta survey_responses med relaterad contact_info
      const { data, error } = await supabase
        .from('survey_responses')
        .select(`
          *,
          contact_info (
            id,
            name,
            email,
            phone,
            organization,
            message,
            created_at
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setResponses(data || [])
    } catch (error) {
      console.error('Fel vid hämtning av svar:', error)
      alert('Kunde inte hämta svar')
    } finally {
      setLoading(false)
    }
  }

  const fetchPDFDownloads = async () => {
    try {
      const { data, error } = await supabase
        .from('pdf_downloads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)

      if (error) throw error
      setPdfDownloads(data || [])
    } catch (error) {
      console.error('Fel vid hämtning av PDF-nedladdningar:', error)
    }
  }

  const applyFilters = () => {
    let filtered = [...responses]

    // Filter: Vill ha kontakt
    if (filters.wantsContact === 'yes') {
      filtered = filtered.filter(r => r.wants_contact)
    } else if (filters.wantsContact === 'no') {
      filtered = filtered.filter(r => !r.wants_contact)
    }

    // Filter: Resultat
    if (filters.result !== 'all') {
      filtered = filtered.filter(r => r.assessment_result === filters.result)
    }

    // Filter: Datum från
    if (filters.dateFrom) {
      filtered = filtered.filter(r => new Date(r.created_at) >= new Date(filters.dateFrom))
    }

    // Filter: Datum till
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo)
      toDate.setHours(23, 59, 59, 999)
      filtered = filtered.filter(r => new Date(r.created_at) <= toDate)
    }

    setFilteredResponses(filtered)
  }

  // Visa detaljer för ett svar
  const viewDetails = async (response) => {
    setSelectedResponse(response)
    // contact_info is already included in the response from the join query
    if (response.contact_info && response.contact_info.length > 0) {
      setContactInfo(response.contact_info[0])
    } else {
      setContactInfo(null)
    }
  }

  // Stäng detaljvy
  const closeDetails = () => {
    setSelectedResponse(null)
    setContactInfo(null)
  }

  // Logga ut
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  // Exportera till CSV
  const exportToCSV = () => {
    const headers = [
      'ID', 'Datum', 'Resultat', 
      'Kontaktnamn', 'E-post', 'Telefon', 'Organisation',
      'Q0', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12', 'Q13', 'Q14', 'Q15', 'Q16', 'Q17',
      'Vill ha kontakt'
    ]

    const csvData = filteredResponses.map(r => {
      const contact = r.contact_info && r.contact_info[0];
      return [
        r.id,
        new Date(r.created_at).toLocaleString('sv-SE'),
        r.assessment_result,
        contact?.name || '',
        contact?.email || '',
        contact?.phone || '',
        contact?.organization || '',
        r.q0 || '',
        r.q1 || '', r.q2 || '', r.q3 || '', r.q4 || '', r.q5 || '', r.q6 || '', r.q7 || '',
        r.q8_services ? JSON.stringify(r.q8_services) : '',
        r.q9 || '', r.q10 || '', r.q11 || '', r.q12 || '', r.q13 || '', r.q14 || '', r.q15 || '', r.q16 || '', r.q17 || '',
        r.wants_contact ? 'Ja' : 'Nej'
      ]
    })

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url),
    pdfDownloads: pdfDownloads.length
    link.setAttribute('download', `cybersakerhet_svar_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Statistik
  const stats = {
    total: responses.length,
    omfattas: responses.filter(r => r.assessment_result === 'omfattas').length,
    omfattasEj: responses.filter(r => r.assessment_result === 'omfattas_ej').length,
    undantag: responses.filter(r => r.assessment_result === 'undantag').length,
    osaker: responses.filter(r => r.assessment_result === 'osäker').length,
    wantsContact: responses.filter(r => r.wants_contact).length
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Laddar...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin-panel</h1>
            <p className="text-gray-600">Cybersäkerhetslagen - Formulärsvar</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-sm transition-colors"
          >
            Logga ut
          </button>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-8">
          <div className="bg-white rounded-sm shadow p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Totalt svar</div>
          </div>
          <div className="bg-red-50 rounded-sm shadow p-4">
            <div className="text-2xl font-bold text-red-900">{stats.omfattas}</div>
            <div className="text-sm text-red-700">Omfattas</div>
          </div>
          <div className="bg-green-50 rounded-sm shadow p-4">
            <div className="text-2xl font-bold text-green-900">{stats.omfattasEj}</div>
            <div className="text-sm text-green-700">Omfattas ej</div>
          </div>
          <div className="bg-yellow-50 rounded-sm shadow p-4">
            <div className="text-2xl font-bold text-yellow-900">{stats.undantag}</div>
            <div className="text-sm text-yellow-700">Undantag</div>
          </div>
          <div className="bg-gray-50 rounded-sm shadow p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.osaker}</div>
            <div className="text-sm text-gray-700">Osäker</div>
          </div>
          <div className="bg-blue-50 rounded-sm shadow p-4">
            <div className="text-2xl font-bold text-blue-900">{stats.wantsContact}</div>
            <div className="text-sm text-blue-700">Vill ha kontakt</div>
          </div>
          <div className="bg-purple-50 rounded-sm shadow p-4 cursor-pointer hover:bg-purple-100 transition-colors"
            onClick={() => setShowDownloads(!showDownloads)}>
            <div className="text-2xl font-bold text-purple-900">{stats.pdfDownloads}</div>
            <div className="text-sm text-purple-700">PDF-nedladdningar</div>
          </div>
        </div>

        {/* PDF Downloads Modal */}
        {showDownloads && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowDownloads(false)}>
            <div className="bg-white rounded-sm shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">PDF-nedladdningar</h2>
                    <p className="text-sm text-gray-600">
                      Totalt {pdfDownloads.length} nedladdningar
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDownloads(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Datum</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Webbläsare</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">OS</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enhet</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resultat</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pdfDownloads.map((download) => (
                        <tr key={download.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {new Date(download.created_at).toLocaleString('sv-SE')}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {download.browser_name} {download.browser_version}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {download.os_name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {download.device_type}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 font-mono text-xs">
                            {download.ip_address}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              download.assessment_result === 'omfattas' ? 'bg-red-100 text-red-800' :
                              download.assessment_result === 'omfattas_ej' ? 'bg-green-100 text-green-800' :
                              download.assessment_result === 'undantag' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {download.assessment_result}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter */}
        <div className="bg-white rounded-sm shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vill ha kontakt
              </label>
              <select
                value={filters.wantsContact}
                onChange={(e) => setFilters({ ...filters, wantsContact: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Alla</option>
                <option value="yes">Ja</option>
                <option value="no">Nej</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resultat
              </label>
              <select
                value={filters.result}
                onChange={(e) => setFilters({ ...filters, result: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Alla</option>
                <option value="omfattas">Omfattas</option>
                <option value="omfattas_ej">Omfattas ej</option>
                <option value="undantag">Undantag</option>
                <option value="osäker">Osäker</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Från datum
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Till datum
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={exportToCSV}
              disabled={filteredResponses.length === 0}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Exportera till CSV ({filteredResponses.length} svar)
            </button>
          </div>
        </div>

        {/* Tabell med svar */}
        <div className="bg-white rounded-sm shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Datum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kontaktperson
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resultat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vill ha kontakt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Åtgärd
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredResponses.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      Inga svar att visa
                    </td>
                  </tr>
                ) : (
                  filteredResponses.map((response) => {
                    const contact = response.contact_info && response.contact_info[0];
                    return (
                    <tr key={response.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(response.created_at).toLocaleString('sv-SE')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {contact ? (
                          <div>
                            <div className="font-medium text-gray-900">{contact.name}</div>
                            <div className="text-gray-500 text-xs">{contact.email}</div>
                            {contact.organization && (
                              <div className="text-gray-400 text-xs">{contact.organization}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">Ej angiven</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          response.assessment_result === 'omfattas' ? 'bg-red-100 text-red-800' :
                          response.assessment_result === 'omfattas_ej' ? 'bg-green-100 text-green-800' :
                          response.assessment_result === 'undantag' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {response.assessment_result}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {response.wants_contact ? (
                          <span className="text-green-600 font-semibold">Ja</span>
                        ) : (
                          <span className="text-gray-400">Nej</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => viewDetails(response)}
                          className="text-primary hover:text-primary-dark font-medium"
                        >
                          Visa detaljer
                        </button>
                      </td>
                    </tr>
                  )})
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detaljvy Modal */}
      {selectedResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-sm shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Detaljer för svar</h2>
                  <p className="text-sm text-gray-600">
                    {new Date(selectedResponse.created_at).toLocaleString('sv-SE')}
                  </p>
                </div>
                <button
                  onClick={closeDetails}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Bedömning */}
              <div className="mb-6 p-4 bg-gray-50 rounded-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Bedömning</h3>
                <p className="text-lg font-medium text-gray-900">{selectedResponse.assessment_message}</p>
                <p className="text-sm text-gray-600 mt-1">{selectedResponse.assessment_details}</p>
              </div>

              {/* Svar på frågor */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Svar på frågor</h3>
                <div className="space-y-3">
                  {/* Always show Q0 first if present */}
                  {selectedResponse.q0 && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                      <div className="text-sm font-medium text-blue-900 mb-1">
                        {QUESTION_LABELS.q0}
                      </div>
                      <div className="text-base font-semibold text-blue-950">
                        {selectedResponse.q0}
                      </div>
                    </div>
                  )}
                  
                  {/* Show all answered questions */}
                  {Object.entries(selectedResponse)
                    .filter(([key, value]) => {
                      // Include questions q1-q17 that have answers
                      if (key === 'q8_services') return value !== null && value !== undefined
                      if (!key.match(/^q\d+$/)) return false
                      if (key === 'q0') return false // Already shown above
                      return value !== null && value !== undefined && value !== ''
                    })
                    .sort((a, b) => {
                      // Sort by question number
                      const numA = parseInt(a[0].replace('q', ''))
                      const numB = parseInt(b[0].replace('q', ''))
                      return numA - numB
                    })
                    .map(([key, value]) => {
                      let displayValue = value
                      
                      // Handle Q4 which is stored as JSON string
                      if (key === 'q4' && typeof value === 'string') {
                        try {
                          const parsed = JSON.parse(value)
                          displayValue = Array.isArray(parsed) ? parsed.join(', ') : value
                        } catch {
                          displayValue = value
                        }
                      }
                      
                      // Handle Q8 services array
                      if (key === 'q8_services' && Array.isArray(value)) {
                        displayValue = value.join(', ')
                        key = 'q8' // Display as q8
                      }
                      
                      return (
                        <div key={key} className="p-4 bg-white border border-gray-200 rounded hover:border-gray-300 transition-colors">
                          <div className="text-sm font-medium text-gray-700 mb-1">
                            {QUESTION_LABELS[key] || `Fråga ${key.replace('q', '')}`}
                          </div>
                          <div className="text-base text-gray-900">
                            {displayValue}
                          </div>
                        </div>
                      )
                    })}
                  
                  {/* Show message if no questions answered */}
                  {!selectedResponse.q0 && 
                   Object.keys(selectedResponse).filter(k => 
                     k.match(/^q\d+$/) && selectedResponse[k]
                   ).length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      Inga svar registrerade
                    </div>
                  )}
                </div>
              </div>

              {/* Kontaktinformation */}
              {contactInfo && (
                <div className="mb-6 p-4 bg-blue-50 rounded-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">Kontaktinformation</h3>
                  <div className="space-y-2">
                    <p><strong>Namn:</strong> {contactInfo.name}</p>
                    <p><strong>E-post:</strong> {contactInfo.email}</p>
                    {contactInfo.phone && <p><strong>Telefon:</strong> {contactInfo.phone}</p>}
                    {contactInfo.organization && <p><strong>Organisation:</strong> {contactInfo.organization}</p>}
                    {contactInfo.message && (
                      <div>
                        <strong>Meddelande:</strong>
                        <p className="mt-1 text-gray-700">{contactInfo.message}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={closeDetails}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-sm transition-colors"
                >
                  Stäng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
