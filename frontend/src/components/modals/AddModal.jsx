import axios from 'axios'
import { useFormik } from 'formik'
import { useEffect, useMemo, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import routes from '../../routes/routes'
import { selectToken } from '../../slices/AuthSlice'
import { selectChannels, setActiveChannelId } from '../../slices/ChannelsSlice'
import { changeAddModal, selectIsAddShow } from '../../slices/ModalSlice'
import filterProfanity from '../../utils/ProfanityFilter.js'

const AddModal = () => {
  const token = useSelector(selectToken)
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const isShow = useSelector(selectIsAddShow)
  const channels = useSelector(selectChannels)
  const { t } = useTranslation()

  const channelNames = useMemo(() => {
    return channels.map((channel) => channel.name)
  }, [channels])

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('errors.nameLengthError'))
      .max(20, t('errors.nameLengthError'))
      .notOneOf(channelNames, t('errors.nameUniqueError'))
      .required(t('errors.requiredError'))
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
          name: filterProfanity(values.name),
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
            toast.error(t('errors.unauthorizedError'))
            navigate('/login')
            return
          }
          toast.error(t('errors.dataLoadingError'))
        } else {
          toast.error(t('errors.connectionError'))
        }
        setSubmitting(false)
      }
    }
  })

  useEffect(() => {
    inputRef.current?.focus()
  }, [isShow])

  useEffect(() => {
    if (channels && isShow) {
      dispatch(setActiveChannelId(channels.slice(-1)[0].id))
    }
  }, [channels]);

  const handleClose = () => {
    formik.resetForm()
    dispatch(changeAddModal(false))
  }

  return (
    <Modal show={isShow} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.modals.addTitle')}</Modal.Title>
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
          <label className="visually-hidden" htmlFor="name">
            {t('channels.modals.addLabel')}
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
          >{t('channels.modals.buttons.cancel')}</Button>
          <Button
            type="submit"
            variant="primary"
            disabled={formik.isSubmitting}
          >{t('channels.modals.buttons.send')}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddModal
