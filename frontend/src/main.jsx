import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
// eslint-disable-next-line no-unused-vars
import i18next from './i18n'
import Socket from './components/Socket'
import store from './slices/ConfigureStore'

import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Socket>
          <App />
        </Socket>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
