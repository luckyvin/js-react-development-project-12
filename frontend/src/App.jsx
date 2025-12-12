import { Container, Navbar } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LoginPage from './pages/LoginPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import MainPage from './pages/MainPage.jsx'
import SignupPage from "./pages/SignupPage.jsx"

function App() {
  return (
    <div className="d-flex flex-column h-100">
      <Navbar className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/favicon.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Hexlet Chat
          </Navbar.Brand>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
