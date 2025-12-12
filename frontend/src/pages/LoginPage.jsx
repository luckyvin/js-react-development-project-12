import { useFormik } from 'formik';
import { Button, Card, FloatingLabel, Form, Image } from 'react-bootstrap'

import imageAvatar from '../assets/avatar.jpg'

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <Image src={imageAvatar} alt="Войти" roundedCircle />
            </div>
            <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
              <h1 className="text-center mb-4">Войти</h1>
              <FloatingLabel
                controlId="username"
                label="Ваш ник"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Ваш ник"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="password"
                label="Пароль"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Пароль"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </FloatingLabel>
              <Button
                variant="outline-primary"
                className="w-100 mb-3"
                type="submit"
              >Войти</Button>
            </Form>
          </Card.Body>
          <Card.Footer className="p-4">
            <div className="text-center">
              <span>Нет аккаунта? </span>
              <a href="signup">Регистрация</a>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </div>
  </div>
}

export default LoginPage
