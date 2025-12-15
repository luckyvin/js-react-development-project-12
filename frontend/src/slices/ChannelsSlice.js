import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  channels: [],
  activeChannelId: '1',
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload
    },
    setActiveChannelId(state, { payload }) {
      state.activeChannelId = payload
    },
  }
})

export const { setChannels, setActiveChannelId } = channelsSlice.actions

export const selectChannels = (state) => state.channels.channels
export const selectActiveChannelId = (state) => state.channels.activeChannelId
export const selectActiveChannel = (state) =>
  state.channels.channels.find((channel) =>
    channel.id === state.channels.activeChannelId
  )

export default channelsSlice.reducer