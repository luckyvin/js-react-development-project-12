import axios from 'axios'
import { useFormik } from 'formik'
import { useEffect, useMemo, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import routes from '../../routes/routes.js'
import { selectToken } from '../../slices/AuthSlice.js'
import { selectChannels } from '../../slices/ChannelsSlice.js'
import { changeAddModal, selectIsAddShow } from '../../slices/ModalSlice.js'

const AddModal = () => {
  const token = useSelector(selectToken)
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const isShow = useSelector(selectIsAddShow)
  const channels = useSelector(selectChannels)

  const channelNames = useMemo(() => {
    return channels.map((channel) => channel.name)
  }, [channels])

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelNames, 'Должно быть уникальным')
      .required('Обязательное поле')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true)
      try {
        const channel = {
          name: values.name,
          removable: true,
        }
        await axios.post(routes.channels(), channel, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setSubmitting(false)
        resetForm()
        dispatch(changeAddModal(false))
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
        setSubmitting(false)
      }
    }
  })

  useEffect(() => {
    inputRef.current?.focus()
  }, [isShow])

  const handleClose = () => {
    formik.resetForm()
    dispatch(changeAddModal(false))
  }

  return (
    <Modal show={isShow} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Control
            id="name"
            ref={inputRef}
            name="name"
            type="text"
            autoComplete="off"
            value={formik.values.name}
            isInvalid={!!formik.errors.name && formik.touched.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="invalid-feedback">{formik.errors.name}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Отменить</Button>
          <Button
            type="submit"
            variant="primary"
            disabled={formik.isSubmitting}
          >Отправить</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddModal
