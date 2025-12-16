import { configureStore } from '@reduxjs/toolkit'

import authReducer from './AuthSlice.js'
import channelsReducer from './ChannelsSlice.js'
import messagesReducer from './MessagesSlice.js'
import modalReducer from './ModalSlice.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  }
})
