import { configureStore } from '@reduxjs/toolkit'

import authReducer from './AuthSlice'
import channelsReducer from './ChannelsSlice'
import messagesReducer from './MessagesSlice'
import modalReducer from './ModalSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  }
})
