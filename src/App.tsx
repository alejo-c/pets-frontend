import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import PetDetailsPage from './pages/PetDetailsPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  const appStyle = 'bg-light-subtle text-white pt-5'
  return <>
    <div className={appStyle} data-bs-theme='dark' >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/pets/:id' element={<PetDetailsPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  </>
}

export default App
