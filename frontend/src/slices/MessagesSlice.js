import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { deleteChannel } from './ChannelsSlice'

const channelMessagesAdapter = createEntityAdapter()
const initialState = channelMessagesAdapter.getInitialState()

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      state.messages = payload
    },
    setMessage(state, { payload }) {
      state.messages = [...state.messages, payload]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteChannel, (state, action) => {
      const channelId = action.payload.id
      const restEntities = Object.values(state.entities).filter(e => e.channelId !== channelId)

      channelMessagesAdapter.setAll(state, restEntities)
    })
  },
})

export const { setMessages, setMessage } = messagesSlice.actions

export const selectMessages = state => state.messages.messages

export default messagesSlice.reducer
