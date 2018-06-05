import { get } from 'lodash'

export default class Command {
  constructor(client) {
    this.client = client
  }

  isHandledCommand(message, command) {
    return get(message.split(' '), 1) === command
  }
}
