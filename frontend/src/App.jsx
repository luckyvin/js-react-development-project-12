import { Button, Container, Navbar } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import LoginPage from './pages/LoginPage'
import ErrorPage from './pages/ErrorPage'
import MainPage from './pages/MainPage'
import SignupPage from './pages/SignupPage'
import { logoutUser, selectToken } from './slices/AuthSlice'

function App() {
  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

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
            {t('navbar.title')}
          </Navbar.Brand>
        </Container>
        {
          token &&
          <Button
            variant="primary"
            className="me-3"
            onClick={handleLogout}
          >{t('navbar.logout')}</Button>
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
