import { Provider, ErrorBoundary } from '@rollbar/react'
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

const rollbarConfig = {
  accessToken: '79a2c12845a64c8bb031a5a77ea81fd7edf2f056cfd952c38f5d1d5f3aed902ef5114108cad46214d8ce4986df518d66',
  environment: 'production',
}

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
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
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
          <ToastContainer/>
        </div>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
