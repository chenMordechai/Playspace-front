import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import './assets/style/main.scss'

import { store } from './store/store'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'
import { Admin } from './pages/Admin'
import { NavLinks } from './cmps/NavLinks'


function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout">
          <NavLinks />
          <main>
            <div className="main-container">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </div>
          </main>
        </section>

      </Router>
    </Provider >

  )
}

export default App
