import axios from 'axios'
import { useFormik } from 'formik'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { Send } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'

import routes from '../routes/routes'
import { selectActiveChannel } from '../slices/ChannelsSlice'
import { selectToken, selectUsername } from '../slices/AuthSlice'
import { selectMessages } from '../slices/MessagesSlice'
import filterProfanity from '../utils/ProfanityFilter.js'

const Messages = () => {
  const token = useSelector(selectToken)
  const username = useSelector(selectUsername)
  const activeChannel = useSelector(selectActiveChannel)
  const messages = useSelector(selectMessages)
  const { t } = useTranslation()

  const activeChannelMessages = useMemo(() => {
    return messages?.filter((message) => message.channelId === activeChannel.id) ?? []
  }, [activeChannel, messages])

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const message = {
          body: filterProfanity(values.message),
          channelId: activeChannel.id,
          username,
        }
        await axios.post(routes.messages(), message, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        resetForm()
      } catch (e) {
        console.error(e)
      }
    }
  })

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b># {activeChannel?.name}</b>
        </p>
        <span className="text-muted">
          {t('messages.counter.count', { count: activeChannelMessages.length })}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {
          activeChannelMessages.length
            ? activeChannelMessages.map((message) => (
              <div key={message.id} className="text-break mb-2">
                <b>{message.username}</b>: {message.body}
              </div>
            ))
            : null
        }
      </div>
      <div className="mt-auto px-5 py-3">
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup>
            <Form.Control
              name="message"
              type="text"
              placeholder={t('messages.placeholder')}
              autoComplete="off"
              value={formik.values.message}
              onChange={formik.handleChange}
            />
            <Button
              id="send"
              variant="outline-secondary"
              type="submit"
              className="d-flex align-items-center"
            >
              <Send />
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  )
}

export default Messages
