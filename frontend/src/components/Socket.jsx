import { io } from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { deleteChannel, renameChannel, setChannel } from '../slices/ChannelsSlice.js'
import { setMessage } from '../slices/MessagesSlice.js'

const Socket = ({ children }) => {
  const socket = io()
  const dispatch = useDispatch()

  socket.on('newMessage', (message) => {
    dispatch(setMessage(message))
  })

  socket.on('newChannel', (channel) => {
    dispatch(setChannel(channel))
    toast.success('Канал создан')
  })

  socket.on('removeChannel', (id) => {
    dispatch(deleteChannel(id))
    toast.success('Канал удалён')
  })

  socket.on('renameChannel', (channel) => {
    dispatch(renameChannel(channel))
    toast.success('Канал переименован')
  })

  return children
}

export default Socket