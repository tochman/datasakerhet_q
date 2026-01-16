import { BrowserRouter, Routes, Route } from 'react-router-dom'
import QuestionnaireForm from './components/QuestionnaireForm'
import AdminPanel from './components/AdminPanel'
import AdminLogin from './components/AdminLogin'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuestionnaireForm />} />
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
