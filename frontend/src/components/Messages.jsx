import { useFormik } from 'formik'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { Send } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'

import { selectActiveChannel } from '../slices/ChannelsSlice.js'

const Messages = () => {
  const activeChannel = useSelector(selectActiveChannel)

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values) => {
      console.log(values)
    }
  })

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b># {activeChannel?.name}</b>
        </p>
        <span className="text-muted">0 сообщений</span> { /* TODO: msg count */ }
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 "></div>
      <div className="mt-auto px-5 py-3">
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup>
            <Form.Control
              name="message"
              type="text"
              placeholder="Введите сообщение..."
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
