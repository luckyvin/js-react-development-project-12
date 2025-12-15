import { configureStore } from '@reduxjs/toolkit'

import authReducer from './AuthSlice.js'
import channelsReducer from './ChannelsSlice.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
  }
})
