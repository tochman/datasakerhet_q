import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WelcomeScreen from './components/WelcomeScreen'
import QuestionnaireForm from './components/QuestionnaireForm'
import AdminPanel from './components/AdminPanel'
import AdminLogin from './components/AdminLogin'
import PrivateRoute from './components/PrivateRoute'

function HomePage() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  if (showQuestionnaire) {
    return <QuestionnaireForm />;
  }

  return <WelcomeScreen onStart={() => setShowQuestionnaire(true)} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
