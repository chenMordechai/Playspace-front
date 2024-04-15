import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import './assets/style/main.scss'

import { store } from './store/store'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'
import { GameAdd } from './pages/GameAdd'
import { GameEdit } from './pages/GameEdit'
import { Game } from './pages/Game'
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
                {/* <Route path="/signup/:gameId/:groupId" element={<Signup />} /> */}
                <Route path="/signup/:gameId/" element={<Signup />} />
                <Route path="/game/add/" element={<GameAdd />} />
                <Route path="/game/edit/:gameId?" element={<GameEdit />} />
                <Route path="/game/:gameId" element={<Game />} />
                <Route path="/home" element={<Home />} />
              </Routes>
            </div>
          </main>
        </section>

      </Router>
    </Provider >

  )
}

export default App
