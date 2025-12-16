import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  channels: [],
  activeChannelId: '1',
  affectedChannel: null,
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload
    },
    setChannel(state, { payload }) {
      state.channels = [...state.channels, payload]
      state.activeChannelId = payload.id
    },
    deleteChannel(state, { payload }) {
      state.channels = state.channels.filter((channel) => channel.id !== payload.id)
      if (payload.id === state.activeChannelId) {
        state.activeChannelId = '1'
      }
    },
    renameChannel(state, { payload }) {
      state.channels = state.channels.map((channel) =>
        channel.id === payload.id ? payload : channel,
      )
    },
    setActiveChannelId(state, { payload }) {
      state.activeChannelId = payload
    },
    setAffectedChannel(state, { payload }) {
      state.affectedChannel = payload
    }
  }
})

export const { setChannels, setChannel, renameChannel, deleteChannel, setActiveChannelId, setAffectedChannel } = channelsSlice.actions

export const selectChannels = (state) => state.channels.channels
export const selectActiveChannelId = (state) => state.channels.activeChannelId
export const selectAffectedChannel = (state) => state.channels.affectedChannel
export const selectActiveChannel = (state) =>
  state.channels.channels.find((channel) =>
    channel.id === state.channels.activeChannelId
  )

export default channelsSlice.reducer