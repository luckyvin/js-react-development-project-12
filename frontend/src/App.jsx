import { Button, Container, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import LoginPage from './pages/LoginPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import MainPage from './pages/MainPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import { logoutUser, selectToken } from './slices/AuthSlice.js'

function App() {
  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <div className="d-flex flex-column h-100">
      <Navbar className="shadow-sm justify-content-between">
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
        {
          token &&
          <Button
            variant="primary"
            className="me-3"
            onClick={handleLogout}
          >Выйти</Button>
        }
      </Navbar>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/" element={<MainPage/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
