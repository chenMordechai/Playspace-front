import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import './assets/style/main.scss'

import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Admin } from './pages/Admin'
import { NavLinks } from './cmps/NavLinks'


function App() {
  return (
    <Router>
      <section className="main-layout">
        <NavLinks />
        <main>
          <div className="main-container">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </main>
      </section>

    </Router>

  )
}

export default App
