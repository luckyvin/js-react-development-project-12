import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { selectActiveChannelId, selectChannels, setActiveChannelId } from '../slices/ChannelsSlice.js'

const Channels = () => {
  const channels = useSelector(selectChannels)
  const activeChannelId = useSelector(selectActiveChannelId)
  const dispatch = useDispatch()

  return (
    <div className="d-flex flex-column px-2 gap-2">
      {
        channels.map((channel) =>
          <Button
            key={channel.id}
            variant={channel.id === activeChannelId ? 'secondary' : 'text-secondary'}
            className="text-start"
            onClick={() => { dispatch(setActiveChannelId(channel.id)) }}
          ># {channel.name}</Button>
        )
      }
    </div>
  )
}

export default Channels