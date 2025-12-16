const apiPath = '/api/v1'

export default {
  login: () => `${apiPath}/login`,
  channels: () => `${apiPath}/channels`,
  channel: (id) => `${apiPath}/channels/${id}`,
  messages: () => `${apiPath}/messages`,
}
