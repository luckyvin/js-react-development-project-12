import { configureStore } from '@reduxjs/toolkit'

import authReducer from './AuthSlice.js'

export default configureStore({
  reducer: {
    auth: authReducer,
  }
})
