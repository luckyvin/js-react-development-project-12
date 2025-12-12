import image404 from '../assets/404.svg'

const ErrorPage = () => {
  return <div className="text-center">
    <img src={image404} alt="Страница не найдена" className="img-fluid h-25" />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">Но вы можете перейти <a href="/">на главную страницу</a></p>
  </div>
}

export default ErrorPage