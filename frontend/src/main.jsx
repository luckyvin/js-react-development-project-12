import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.jsx'
import Socket from './components/Socket.jsx'
import store from './slices/ConfigureStore.js'

import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Socket>
        <App />
      </Socket>
    </Provider>
  </StrictMode>,
)
