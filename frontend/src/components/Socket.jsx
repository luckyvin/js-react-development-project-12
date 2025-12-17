import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { io } from 'socket.io-client'

import { deleteChannel, renameChannel, setChannel } from '../slices/ChannelsSlice'
import { setMessage } from '../slices/MessagesSlice'

const Socket = ({ children }) => {
  const socket = io()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  socket.on('newMessage', (message) => {
    dispatch(setMessage(message))
  })

  socket.on('newChannel', (channel) => {
    dispatch(setChannel(channel))
    toast.success(t('channels.alerts.added'))
  })

  socket.on('removeChannel', (id) => {
    dispatch(deleteChannel(id))
    toast.success(t('channels.alerts.deleted'))
  })

  socket.on('renameChannel', (channel) => {
    dispatch(renameChannel(channel))
    toast.success(t('channels.alerts.renamed'))
  })

  return children
}

export default Socket