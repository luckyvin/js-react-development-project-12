import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Channels from '../components/Channels'
import Messages from '../components/Messages'
import routes from '../routes/routes'
import { selectToken } from '../slices/AuthSlice'
import { setChannels } from '../slices/ChannelsSlice'
import { setMessages } from '../slices/MessagesSlice'

const MainPage = () => {
  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getChannels = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` }

      const channels = await axios.get(routes.channels(), { headers })
      dispatch(setChannels(channels.data))

      const messages = await axios.get(routes.messages(), { headers })
      dispatch(setMessages(messages.data))
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/login')
    } else {
      getChannels()
    }
  }, [])

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white d-flex-md-row">
        <div className="col-4 col-md-3 border-end px-0 bg-light flex-column h-100 d-flex">
          <Channels />
        </div>
        <div className="col p-0 h-100">
          <Messages />
        </div>
      </div>
    </div>
  )
}

export default MainPage
