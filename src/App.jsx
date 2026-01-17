import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WelcomeScreen from './components/WelcomeScreen'
import QuestionnaireForm from './components/QuestionnaireForm'
import PrivateRoute from './components/PrivateRoute'

// Lazy load admin components (only loaded when accessing admin routes)
const AdminPanel = lazy(() => import('./components/AdminPanel'))
const AdminLogin = lazy(() => import('./components/AdminLogin'))

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
        <Route path="/admin/login" element={
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Laddar...</p>
              </div>
            </div>
          }>
            <AdminLogin />
          </Suspense>
        } />
        <Route 
          path="/admin" 
          element={
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Laddar admin-panel...</p>
                </div>
              </div>
            }>
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            </Suspense>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
