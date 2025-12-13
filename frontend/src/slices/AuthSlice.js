import { createSlice } from '@reduxjs/toolkit'

const credentials = JSON.parse(localStorage.getItem('credentials'))

const initialState = {
  username: credentials?.username ?? null,
  token: credentials?.token ?? null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      const { username, token } = payload

      state.username = username
      state.token = token

      localStorage.setItem('credentials', JSON.stringify(payload))
    },
    logoutUser: (state) => {
      state.username = null
      state.token = null

      localStorage.removeItem('credentials')
    },
  },
})

export const { loginUser, logoutUser } = authSlice.actions

export const selectToken = (state) => state.auth.token

export default authSlice.reducer
