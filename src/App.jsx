import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import './assets/style/main.scss'

import { store } from './store/store'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Admin } from './pages/Admin'
import { GameAdd } from './pages/GameAdd'
import { GameEdit } from './pages/GameEdit'
import { Game } from './pages/Game'
import { GameGroups } from './pages/GameGroups'
import { NavLinks } from './cmps/NavLinks'

import { scrollService } from './services/scroll.service'
import { ScreenOpenContext } from './contexts/ScreenOpenConext'
import { useToggle } from './customHooks/useToggle'


function App() {
  const [isScreenOpen, setIsScreenOpen] = useToggle(false)

  function onOpenScreen() {
    setIsScreenOpen(true)
    scrollService.disableScroll()
  }

  function onCloseScreen() {
    setIsScreenOpen(false)
    scrollService.enableScroll()
  }
  return (
    <Provider store={store}>
      <Router>
      <ScreenOpenContext.Provider value={{ isScreenOpen, onOpenScreen, onCloseScreen }}>
        <section className={'main-layout ' + (isScreenOpen ? 'screen-open' : '')}>
          <section className="screen" onClick={onCloseScreen}></section>
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
                <Route path="/game/group/:gameId" element={<GameGroups />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </div>
          </main>
        </section>
        </ScreenOpenContext.Provider>
      </Router>
    </Provider >

  )
}

export default App
