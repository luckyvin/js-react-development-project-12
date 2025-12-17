import { Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import AddModal from './modals/AddModal'
import EditModal from './modals/EditModal'
import DeleteModal from './modals/DeleteModal'
import {
  selectActiveChannelId,
  selectChannels,
  setActiveChannelId,
  setAffectedChannel,
} from '../slices/ChannelsSlice'
import { changeAddModal, changeDeleteModal, changeEditModal } from '../slices/ModalSlice'

const Channels = () => {
  const channels = useSelector(selectChannels)
  const activeChannelId = useSelector(selectActiveChannelId)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleDelete = (channel) => {
    dispatch(changeDeleteModal(true))
    dispatch(setAffectedChannel(channel))
  }

  const handleRename = (channel) => {
    dispatch(changeEditModal(true))
    dispatch(setAffectedChannel(channel))
  }

  return (
    <>
      <div className="d-flex justify-content-between mb-2 p-4">
        <b>{t('channels.title')}</b>
        <Button
          variant="outline-primary"
          size="sm"
          className="d-flex p-1"
          onClick={() => dispatch(changeAddModal(true))}
        >
          <Plus/>
        </Button>
      </div>
      <div className="d-flex flex-column px-2 gap-2">
        {
          channels.map((channel) =>
            channel.removable
              ? <Dropdown key={channel.id} as={ButtonGroup}>
                <Button
                  key={channel.id}
                  variant={channel.id === activeChannelId ? 'secondary' : 'text-secondary'}
                  className="text-start"
                  onClick={() => {
                    dispatch(setActiveChannelId(channel.id))
                  }}
                ># {channel.name}</Button>
                <Dropdown.Toggle
                  id="dropdown-split"
                  split
                  style={{flexGrow: 0}}
                  variant={channel.id === activeChannelId ? 'secondary' : 'text-secondary'}>
                  <span className="visually-hidden">{t('channels.actions.trigger')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleDelete(channel)}
                  >{t('channels.actions.delete')}</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleRename(channel)}
                  >{t('channels.actions.rename')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              : <Button
                key={channel.id}
                variant={channel.id === activeChannelId ? 'secondary' : 'text-secondary'}
                className="text-start"
                onClick={() => {
                  dispatch(setActiveChannelId(channel.id))
                }}
              ># {channel.name}</Button>
          )
        }
      </div>
      <AddModal />
      <EditModal />
      <DeleteModal />
    </>
  )
}

export default Channels