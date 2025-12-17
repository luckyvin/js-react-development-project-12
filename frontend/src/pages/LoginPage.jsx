import axios from 'axios'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Button, Card, FloatingLabel, Form, Image } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import imageAvatar from '../assets/avatar_login.jpg'
import routes from '../routes/routes'
import { loginUser } from '../slices/AuthSlice'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [error, setError] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true)

        const response = await axios.post(routes.login(), values)
        const { token } = response.data

        if (token) {
          setError(false)
          dispatch(loginUser({
            username: values.username,
            token,
          }))
          navigate('/')
        }
      }
      catch (e) {
        setError(true)
        if (e.isAxiosError) {
          if (e.response?.status === 401) {
            toast.error(t('errors.authorizationError'))
            return
          }
          toast.error(t('errors.dataLoadingError'))
          return
        }
        toast.error(t('errors.connectionError'))
      }
      finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src={imageAvatar} alt={t('pages.loginPage.login')} roundedCircle />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('pages.loginPage.login')}</h1>
                <FloatingLabel
                  controlId="username"
                  label={t('pages.loginPage.yourNick')}
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder={t('pages.loginPage.yourNick')}
                    autoComplete="off"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={error}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="password"
                  label={t('pages.loginPage.password')}
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder={t('pages.loginPage.password')}
                    autoComplete="off"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={error}
                  />
                </FloatingLabel>
                <Button
                  variant="outline-primary"
                  className="w-100 mb-3"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {t('pages.loginPage.login')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('pages.loginPage.noAccount')}</span>
                <a href="signup">{t('pages.loginPage.registration')}</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
