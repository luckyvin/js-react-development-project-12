import axios from 'axios'
import { useState } from 'react'
import { Button, Card, FloatingLabel, Form, Image } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import imageAvatar from '../assets/avatar_signup.jpg'
import routes from '../routes/routes.js'
import { loginUser } from '../slices/AuthSlice.js'

const SignupPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
  })
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true)

        const { username, password } = values
        const response = await axios.post(routes.signup(), { username, password })
        const { token } = response.data

        if (token) {
          setError(false)
          dispatch(loginUser({ username, token }))
          navigate('/')
        }
      } catch (e) {
        setError(true)
        if (e.isAxiosError) {
          if (e.response?.status === 409) {
            toast.error('Такой пользователь уже существует')
            return
          }
          toast.error('Ошибка загрузки данных')
          return
        }
        toast.error('Ошибка соединения')
      } finally {
        setSubmitting(false)
      }
    }
  })

  return <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <Image src={imageAvatar} alt="Войти" roundedCircle/>
            </div>
            <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
              <h1 className="text-center mb-4">Регистрация</h1>
              <FloatingLabel
                controlId="username"
                label="Имя пользователя"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Имя пользователя"
                  autoComplete="off"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  isInvalid={(formik.errors.username && formik.touched.username) || error}
                ></Form.Control>
                {formik.errors.username && formik.touched.username && (
                  <div className="invalid-feedback">{formik.errors.username}</div>
                )}
              </FloatingLabel>
              <FloatingLabel
                controlId="password"
                label="Пароль"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Пароль"
                  autoComplete="off"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  isInvalid={(formik.errors.password && formik.touched.password) || error}
                ></Form.Control>
                {formik.errors.password && formik.touched.password && (
                  <div className="invalid-feedback">{formik.errors.password}</div>
                )}
              </FloatingLabel>
              <FloatingLabel
                controlId="passwordConfirmation"
                label="Подтвердите пароль"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Подтвердите пароль"
                  autoComplete="off"
                  value={formik.values.passwordConfirmation}
                  onChange={formik.handleChange}
                  isInvalid={(formik.errors.passwordConfirmation && formik.touched.passwordConfirmation) || error}
                ></Form.Control>
                {formik.errors.passwordConfirmation && formik.touched.passwordConfirmation && (
                  <div className="invalid-feedback">{formik.errors.passwordConfirmation}</div>
                )}
              </FloatingLabel>
              <Button
                variant="outline-primary"
                className="w-100 mb-3"
                type="submit"
                disabled={formik.isSubmitting}
              >Зарегистрироваться</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  </div>
}

export default SignupPage