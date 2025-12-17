import { useTranslation } from 'react-i18next'

import image404 from '../assets/404.svg'

const ErrorPage = () => {
  const { t } = useTranslation()

  return <div className="text-center">
    <img src={image404} alt={t('pages.errorPage.notFound')} className="img-fluid h-25" />
    <h1 className="h4 text-muted">{t('pages.errorPage.notFound')}</h1>
    <p className="text-muted">
      {t('pages.errorPage.butYouCanGo')}
      <a href="/">{t('pages.errorPage.toMainPage')}</a>
    </p>
  </div>
}

export default ErrorPage