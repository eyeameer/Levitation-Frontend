import LoginPage from './pages/login';
import { Routes, Route,  } from "react-router-dom";
import HomePage from './pages/Home';
import { ProtectedRoute } from './ProtectedRoute';
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage/>} index/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path="/home" element={<ProtectedRoute Component={HomePage} />} />
      </Routes>
    </>
  )
}

export default App
