import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import routes from '../../routes/routes.js';
import { selectToken } from '../../slices/AuthSlice.js';
import { selectAffectedChannel } from '../../slices/ChannelsSlice.js';
import { changeDeleteModal, selectIsDeleteShow } from '../../slices/ModalSlice.js';

const DeleteModal = () => {
  const token = useSelector(selectToken)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isShow = useSelector(selectIsDeleteShow)
  const affectedChannel = useSelector(selectAffectedChannel)

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
          toast.error('Этот пользователь не авторизован')
          navigate('/login')
          return
        }
        toast.error('Ошибка загрузки данных')
      } else {
        toast.error('Ошибка соединения')
      }
    }
  }

  const handleClose = () => {
    dispatch(changeDeleteModal(false))
  }

  return (
    <Modal show={isShow} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Отменить</Button>
        <Button variant="danger" onClick={handleDelete}>Отправить</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal
