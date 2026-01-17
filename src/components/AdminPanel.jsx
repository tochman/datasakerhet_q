import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { generateIncidentReportPDF } from '../utils/generateIncidentReportPDF'
import { generateIncidentProcessPDF } from '../utils/generateIncidentProcessPDF'

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
  const [activeTab, setActiveTab] = useState('responses') // 'responses' or 'downloads'
  const [downloadFilters, setDownloadFilters] = useState({
    result: '',
    deviceType: '',
    dateFrom: '',
    dateTo: ''
  })
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

  // Track PDF download
  const trackPDFDownload = async (templateTitle) => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const userAgent = navigator.userAgent;
      const language = navigator.language;
      const referrer = document.referrer || window.location.href;

      await fetch(`${supabaseUrl}/functions/v1/track-pdf-download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'apikey': supabaseAnonKey
        },
        body: JSON.stringify({
          surveyResponseId: null,
          assessmentResult: null,
          templateTitle,
          userAgent,
          language,
          referrer
        })
      });
    } catch (error) {
      console.error('Error tracking PDF download:', error);
    }
  }

  // Get download count for a specific survey response
  const getDownloadCount = (surveyId) => {
    return pdfDownloads.filter(d => d.survey_response_id === surveyId).length
  }

  // Filter downloads based on current filters
  const filteredDownloads = pdfDownloads.filter(download => {
    if (downloadFilters.result && download.assessment_result !== downloadFilters.result) {
      return false
    }
    if (downloadFilters.deviceType && download.device_type !== downloadFilters.deviceType) {
      return false
    }
    if (downloadFilters.dateFrom) {
      const downloadDate = new Date(download.created_at)
      const filterDate = new Date(downloadFilters.dateFrom)
      if (downloadDate < filterDate) return false
    }
    if (downloadFilters.dateTo) {
      const downloadDate = new Date(download.created_at)
      const filterDate = new Date(downloadFilters.dateTo)
      filterDate.setHours(23, 59, 59, 999) // Include entire day
      if (downloadDate > filterDate) return false
    }
    return true
  })

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
    link.setAttribute('href', url)
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
    vasentlig: responses.filter(r => r.assessment_category === 'väsentlig').length,
    viktig: responses.filter(r => r.assessment_category === 'viktig').length,
    wantsContact: responses.filter(r => r.wants_contact).length,
    pdfDownloads: pdfDownloads.length
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-sm shadow p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-xs sm:text-sm text-gray-600">Totalt svar</div>
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
          <div className="bg-orange-50 rounded-sm shadow p-4">
            <div className="text-2xl font-bold text-orange-900">{stats.vasentlig}</div>
            <div className="text-sm text-orange-700">Väsentlig</div>
          </div>
          <div className="bg-blue-50 rounded-sm shadow p-4">
            <div className="text-2xl font-bold text-blue-900">{stats.viktig}</div>
            <div className="text-sm text-blue-700">Viktig</div>
          </div>
          <div className="bg-indigo-50 rounded-sm shadow p-4">
            <div className="text-2xl font-bold text-indigo-900">{stats.wantsContact}</div>
            <div className="text-sm text-indigo-700">Vill ha kontakt</div>
          </div>
          <div className="bg-purple-50 rounded-sm shadow p-4 cursor-pointer hover:bg-purple-100 transition-colors"
            onClick={() => setActiveTab('downloads')}>
            <div className="text-2xl font-bold text-purple-900">{stats.pdfDownloads}</div>
            <div className="text-sm text-purple-700">PDF-nedladdningar</div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-gray-200 -mx-4 px-4 sm:mx-0 sm:px-0">
          <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab('responses')}
              className={`pb-3 sm:pb-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
                activeTab === 'responses'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📋 <span className="hidden xs:inline">Undersökningssvar</span><span className="xs:hidden">Svar</span> ({responses.length})
            </button>
            <button
              onClick={() => setActiveTab('downloads')}
              className={`pb-3 sm:pb-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
                activeTab === 'downloads'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📥 <span className="hidden xs:inline">PDF-nedladdningar</span><span className="xs:hidden">PDFs</span> ({pdfDownloads.length})
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`pb-3 sm:pb-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
                activeTab === 'templates'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📄 <span className="hidden xs:inline">Tillgängliga PDF-mallar</span><span className="xs:hidden">Mallar</span>
            </button>
          </nav>
        </div>

        {/* Responses Tab */}
        {activeTab === 'responses' && (
        <div>
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
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Datum
                  </th>
                  <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kontaktperson
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resultat
                  </th>
                  <th className="hidden xl:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plats
                  </th>
                  <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PDF-nedladdningar
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Åtgärd
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredResponses.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      Inga svar att visa
                    </td>
                  </tr>
                ) : (
                  filteredResponses.map((response) => {
                    const contact = response.contact_info && response.contact_info[0];
                    return (
                    <tr key={response.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">
                        <div className="hidden sm:block">{new Date(response.created_at).toLocaleString('sv-SE')}</div>
                        <div className="sm:hidden">{new Date(response.created_at).toLocaleDateString('sv-SE', { month: 'short', day: 'numeric' })}</div>
                      </td>
                      <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
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
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold rounded-full ${
                          response.assessment_result === 'omfattas' ? 'bg-red-100 text-red-800' :
                          response.assessment_result === 'omfattas_ej' ? 'bg-green-100 text-green-800' :
                          response.assessment_result === 'undantag' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          <span className="hidden sm:inline">{response.assessment_result}</span>
                          <span className="sm:hidden">
                            {response.assessment_result === 'omfattas' ? '✓' :
                             response.assessment_result === 'omfattas_ej' ? '✗' :
                             response.assessment_result === 'undantag' ? '!' : '?'}
                          </span>
                        </span>
                      </td>
                      <td className="hidden xl:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                        {response.assessment_category ? (
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            response.assessment_category === 'väsentlig' 
                              ? 'bg-orange-100 text-orange-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {response.assessment_category}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                        {response.city && response.country ? (
                          <span className="text-gray-900">🌍 {response.city}, {response.country}</span>
                        ) : response.country ? (
                          <span className="text-gray-900">🌍 {response.country}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="hidden lg:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                        {(() => {
                          const count = getDownloadCount(response.id)
                          return count > 0 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {count}
                            </span>
                          ) : (
                            <span className="text-gray-400">0</span>
                          )
                        })()}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                        <button
                          onClick={() => viewDetails(response)}
                          className="text-primary hover:text-primary-dark font-medium"
                        >
                          <span className="hidden sm:inline">Visa detaljer</span>
                          <span className="sm:hidden">Visa</span>
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
        )}

      {/* Downloads Tab */}
      {activeTab === 'downloads' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-sm p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Filter nedladdningar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resultat
                </label>
                <select
                  value={downloadFilters.result}
                  onChange={(e) => setDownloadFilters({...downloadFilters, result: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Alla resultat</option>
                  <option value="omfattas">Omfattas</option>
                  <option value="omfattas_ej">Omfattas ej</option>
                  <option value="undantag">Undantag</option>
                  <option value="osäker">Osäker</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enhetstyp
                </label>
                <select
                  value={downloadFilters.deviceType}
                  onChange={(e) => setDownloadFilters({...downloadFilters, deviceType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Alla enheter</option>
                  <option value="desktop">Desktop</option>
                  <option value="mobile">Mobil</option>
                  <option value="tablet">Surfplatta</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Från datum
                </label>
                <input
                  type="date"
                  value={downloadFilters.dateFrom}
                  onChange={(e) => setDownloadFilters({...downloadFilters, dateFrom: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Till datum
                </label>
                <input
                  type="date"
                  value={downloadFilters.dateTo}
                  onChange={(e) => setDownloadFilters({...downloadFilters, dateTo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {(downloadFilters.result || downloadFilters.deviceType || downloadFilters.dateFrom || downloadFilters.dateTo) && (
              <button
                onClick={() => setDownloadFilters({result: '', deviceType: '', dateFrom: '', dateTo: ''})}
                className="mt-4 text-sm text-blue-600 hover:text-blue-800"
              >
                Rensa filter
              </button>
            )}
          </div>

          {/* Downloads Table */}
          <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Datum & Tid
                    </th>
                    <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Webbläsare
                    </th>
                    <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Operativsystem
                    </th>
                    <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enhet
                    </th>
                    <th className="hidden xl:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plats
                    </th>
                    <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP-adress
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resultat
                    </th>
                    <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Undersöknings-ID
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDownloads.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                        Inga nedladdningar hittades
                      </td>
                    </tr>
                  ) : (
                    filteredDownloads.map((download) => (
                      <tr key={download.id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">
                          <div className="hidden sm:block">
                            {new Date(download.created_at).toLocaleString('sv-SE', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                          <div className="sm:hidden">
                            {new Date(download.created_at).toLocaleDateString('sv-SE', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">
                          {download.browser_name || 'Okänd'}
                          {download.browser_version && (
                            <span className="text-gray-500"> v{download.browser_version}</span>
                          )}
                        </td>
                        <td className="hidden lg:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">
                          {download.os_name || 'Okänt'}
                        </td>
                        <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                          <span className="inline-flex items-center">
                            {download.device_type === 'mobile' && '📱'}
                            {download.device_type === 'tablet' && '📱'}
                            {download.device_type === 'desktop' && '💻'}
                            <span className="ml-2 text-gray-900 capitalize hidden lg:inline">
                              {download.device_type || 'Okänd'}
                            </span>
                          </span>
                        </td>
                        <td className="hidden xl:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">
                          {download.city && download.country ? (
                            <span>🌍 {download.city}, {download.country}</span>
                          ) : download.country ? (
                            <span>🌍 {download.country}</span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="hidden lg:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 font-mono">
                          {download.ip_address || 'N/A'}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                          <span className={`inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${download.assessment_result === 'omfattas' ? 'bg-red-100 text-red-800' : ''}
                            ${download.assessment_result === 'omfattas_ej' ? 'bg-green-100 text-green-800' : ''}
                            ${download.assessment_result === 'undantag' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${download.assessment_result === 'osäker' ? 'bg-gray-100 text-gray-800' : ''}
                          `}>
                            <span className="hidden sm:inline">{download.assessment_result || 'N/A'}</span>
                            <span className="sm:hidden">
                              {download.assessment_result === 'omfattas' ? '✓' :
                               download.assessment_result === 'omfattas_ej' ? '✗' :
                               download.assessment_result === 'undantag' ? '!' : '?'}
                            </span>
                          </span>
                        </td>
                        <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 font-mono">
                          {download.survey_response_id ? download.survey_response_id.substring(0, 8) : 'N/A'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

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

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white rounded-sm shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tillgängliga PDF-mallar</h2>
            <p className="text-gray-600">
              Här hittar du alla PDF-dokument som systemet erbjuder för nedladdning. 
              Dessa mallar hjälper användare att dokumentera och hantera cybersäkerhet enligt lagen.
            </p>
          </div>

          {/* PDF Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Incident Report Template */}
            <div className="bg-white rounded-sm shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
                <div className="flex items-center mb-3">
                  <svg className="w-12 h-12 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <h3 className="text-xl font-bold">Händelserapport</h3>
                    <p className="text-red-100 text-sm">Incidentdokumentation</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Beskrivning</h4>
                  <p className="text-gray-600 text-sm">
                    Standardiserad mall för att dokumentera cybersäkerhetsincidenter. 
                    Innehåller alla nödvändiga fält för rapportering enligt Cybersäkerhetslagen.
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Innehåller</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Grundläggande information (datum, rapportör)</li>
                    <li>✓ Beskrivning av händelsen</li>
                    <li>✓ Påverkade system (checkboxar)</li>
                    <li>✓ Bevis och dokumentation</li>
                    <li>✓ Vidtagna åtgärder</li>
                    <li>✓ Allvarlighetsgrad (kritisk/hög/medel/låg)</li>
                    <li>✓ Rapporteringsfrister enligt lagen</li>
                  </ul>
                </div>

                <div className="mb-4 p-3 bg-red-50 rounded border border-red-200">
                  <p className="text-xs text-red-800">
                    <strong>Rapporteringsfrister:</strong><br/>
                    • Tidig varning: 24 timmar<br/>
                    • Incidentrapport: 72 timmar<br/>
                    • Slutrapport: Inom 1 månad
                  </p>
                </div>

                <button
                  onClick={() => {
                    trackPDFDownload('Händelserapport');
                    generateIncidentReportPDF();
                  }}
                  className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-sm shadow transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Ladda ner händelserapport
                </button>

                <div className="mt-3 text-xs text-gray-500 text-center">
                  Filnamn: Händelserapport_ÅÅÅÅ-MM-DD.pdf
                </div>
              </div>
            </div>

            {/* Security Recommendations - Info Card */}
            <div className="bg-white rounded-sm shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <div className="flex items-center mb-3">
                  <svg className="w-12 h-12 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <h3 className="text-xl font-bold">Säkerhetsrekommendationer</h3>
                    <p className="text-blue-100 text-sm">Personaliserad bedömning</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Beskrivning</h4>
                  <p className="text-gray-600 text-sm">
                    Skräddarsydd PDF baserad på användarens bedömning. 
                    Genereras automatiskt efter att formuläret har fyllts i.
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Innehåller</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Bedömningsresultat med färgkodning</li>
                    <li>✓ MCFFS 2026:1 klassificering (väsentlig/viktig)</li>
                    <li>✓ Rekommenderade säkerhetsåtgärder</li>
                    <li>✓ Checklista för implementering</li>
                    <li>✓ Tidsfrister för incidentrapportering</li>
                    <li>✓ Verksamhetstyp och metadata</li>
                  </ul>
                </div>

                <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-xs text-blue-800">
                    <strong>Automatiskt genererad:</strong><br/>
                    Denna PDF skapas unikt för varje användare baserat på deras svar 
                    och bedömning. Tillgänglig efter slutförd undersökning.
                  </p>
                </div>

                <button
                  disabled
                  className="w-full px-4 py-3 bg-gray-300 text-gray-500 font-semibold rounded-sm cursor-not-allowed flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Genereras per användare
                </button>

                <div className="mt-3 text-xs text-gray-500 text-center">
                  Tillgänglig efter slutförd bedömning
                </div>
              </div>
            </div>

            {/* Incident Process Guide Template */}
            <div className="bg-white rounded-sm shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 text-white">
                <div className="flex items-center mb-3">
                  <svg className="w-12 h-12 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <div>
                    <h3 className="text-xl font-bold">Processbeskrivning</h3>
                    <p className="text-indigo-100 text-sm">Incidenthantering</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Beskrivning</h4>
                  <p className="text-gray-600 text-sm">
                    Komplett guide för incidenthantering enligt best practice. 
                    Omfattande processbeskrivning med alla nio faser från upptäckt till avslut.
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Innehåller</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Processöversikt med alla 9 faser</li>
                    <li>✓ Detaljerade aktiviteter per fas</li>
                    <li>✓ Klassificeringsmatris (Kritisk/Hög/Medel/Låg)</li>
                    <li>✓ Containment-åtgärder per incidenttyp</li>
                    <li>✓ Återställningsordning och RTO</li>
                    <li>✓ Post-incident review process</li>
                    <li>✓ Rapporteringsfrister enligt lagen</li>
                    <li>✓ Tabeller och checklistor</li>
                  </ul>
                </div>

                <div className="mb-4 p-3 bg-indigo-50 rounded border border-indigo-200">
                  <p className="text-xs text-indigo-800">
                    <strong>De 9 faserna:</strong><br/>
                    Upptäckt → Bedömning → Klassificering → Aktivera team → 
                    Containment → Eradication → Recovery → Review → Dokumentation
                  </p>
                </div>

                <button
                  onClick={async () => {
                    trackPDFDownload('Processbeskrivning');
                    await generateIncidentProcessPDF();
                  }}
                  className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-sm shadow transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Ladda ner processbeskrivning
                </button>

                <div className="mt-3 text-xs text-gray-500 text-center">
                  Filnamn: Incidenthantering_Processbeskrivning_ÅÅÅÅ-MM-DD.pdf
                </div>
              </div>
            </div>

          </div>

          {/* Statistics */}
          <div className="bg-white rounded-sm shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Användningsstatistik</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-sm">
                <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
                <div className="text-sm text-blue-700">Totala undersökningar</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-sm">
                <div className="text-2xl font-bold text-purple-900">{stats.pdfDownloads}</div>
                <div className="text-sm text-purple-700">Säkerhetsrekommendationer</div>
              </div>
              <div className="p-4 bg-red-50 rounded-sm">
                <div className="text-2xl font-bold text-red-900">∞</div>
                <div className="text-sm text-red-700">Händelserapporter (mall)</div>
              </div>
              <div className="p-4 bg-indigo-50 rounded-sm">
                <div className="text-2xl font-bold text-indigo-900">∞</div>
                <div className="text-sm text-indigo-700">Processbeskrivningar (mall)</div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-sm p-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-indigo-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-semibold text-indigo-900 mb-2">Om PDF-mallarna</h4>
                <p className="text-indigo-800 text-sm mb-2">
                  Alla PDF-dokument genereras lokalt i användarens webbläsare med hjälp av jsPDF. 
                  Ingen data skickas till externa servrar vid PDF-generering.
                </p>
                <p className="text-indigo-800 text-sm">
                  <strong>Händelserapport:</strong> Kan laddas ner oberoende av bedömning och användas som mall vid incidenter.<br/>
                  <strong>Processbeskrivning:</strong> Komplett guide för incidenthantering med alla 9 faser och best practice.<br/>
                  <strong>Säkerhetsrekommendationer:</strong> Genereras endast efter slutförd bedömning med personaliserat innehåll.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  )
}
