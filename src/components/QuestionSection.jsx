import React from 'react'

/**
 * Återanvändbar komponent för att visa en fråga med svarsalternativ
 * @param {Object} props
 * @param {string} props.question - Frågetexten
 * @param {string} props.questionKey - Nyckel för frågan (t.ex. "q1")
 * @param {string} props.value - Nuvarande svar
 * @param {function} props.onChange - Callback för när svaret ändras
 * @param {string} props.helpText - Valfri hjälptext (sträng)
 * @param {JSX.Element} props.description - Valfri utökad beskrivning (JSX)
 * @param {string} props.type - Typ av fråga: "radio" eller "checkbox"
 * @param {Array} props.options - För checkbox: lista med alternativ
 */
export default function QuestionSection({ 
  question, 
  questionKey, 
  value, 
  onChange, 
  helpText,
  description,
  type = "radio",
  options = []
}) {
  
  // Helper function to render description or helpText
  const renderHelpContent = () => {
    const baseClasses = "text-sm text-gray-600 mb-4"
    
    if (description) {
      return <div className={baseClasses}>{description}</div>
    }
    if (helpText) {
      return <div className={`${baseClasses} italic`}>{helpText}</div>
    }
    return null
  }
  
  if (type === "checkbox") {
    const selectedServices = value || []
    
    const handleCheckboxChange = (option) => {
      const newValue = selectedServices.includes(option)
        ? selectedServices.filter(s => s !== option)
        : [...selectedServices, option]
      onChange(questionKey, newValue)
    }
    
    return (
      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-800 mb-4">
          {question}
        </label>
        {renderHelpContent()}
        <div className="space-y-3">
          {options.map((option) => (
            <label 
              key={option}
              className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-light hover:bg-blue-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedServices.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="mt-1 h-5 w-5 text-primary focus:ring-primary"
              />
              <span className="ml-3 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>
    )
  }
  
  // Radio buttons (Ja/Nej/Vet ej)
  const radioOptions = [
    { value: 'ja', label: 'Ja' },
    { value: 'nej', label: 'Nej' },
    { value: 'vet_ej', label: 'Vet ej' }
  ]
  
  return (
    <div className="mb-8">
      <label className="block text-lg font-semibold text-gray-800 mb-4">
        {question}
      </label>
      {renderHelpContent()}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {radioOptions.map((option) => (
          <label 
            key={option.value}
            className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              value === option.value 
                ? 'border-primary bg-primary text-white font-semibold' 
                : 'border-gray-200 hover:border-primary-light hover:bg-blue-50'
            }`}
          >
            <input
              type="radio"
              name={questionKey}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(questionKey, e.target.value)}
              className="sr-only"
              aria-label={`${question} - ${option.label}`}
            />
            <span className="text-lg">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
