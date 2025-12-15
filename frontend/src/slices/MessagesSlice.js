import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      state.messages = payload
    },
    setMessage(state, { payload }) {
      state.messages = [...state.messages, payload]
    }
  }
})

export const { setMessages, setMessage } = messagesSlice.actions

export const selectMessages = (state) => state.messages.messages

export default messagesSlice.reducer
