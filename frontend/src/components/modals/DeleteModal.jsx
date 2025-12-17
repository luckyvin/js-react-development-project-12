import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import routes from '../../routes/routes'
import { selectToken } from '../../slices/AuthSlice'
import { selectAffectedChannel } from '../../slices/ChannelsSlice'
import { changeDeleteModal, selectIsDeleteShow } from '../../slices/ModalSlice'

const DeleteModal = () => {
  const token = useSelector(selectToken)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isShow = useSelector(selectIsDeleteShow)
  const affectedChannel = useSelector(selectAffectedChannel)
  const { t } = useTranslation()

  const handleDelete = async () => {
    try {
      await axios.delete(routes.channel(affectedChannel.id), {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      dispatch(changeDeleteModal(false))
    } catch (e) {
      if (e.isAxiosError) {
        if (e.response?.status === 401) {
          toast.error(t('errors.unauthorizedError'))
          navigate('/login')
          return
        }
        toast.error(t('errors.dataLoadingError'))
      } else {
        toast.error(t('errors.connectionError'))
      }
    }
  }

  const handleClose = () => {
    dispatch(changeDeleteModal(false))
  }

  return (
    <Modal show={isShow} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.modals.deleteTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('channels.modals.deleteBody')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
        >{t('channels.modals.buttons.cancel')}</Button>
        <Button
          variant="danger"
          onClick={handleDelete}
        >{t('channels.modals.buttons.delete')}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal
