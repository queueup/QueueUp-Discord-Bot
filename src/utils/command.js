export default class Command {
  constructor(client) {
    this.client = client
  }

  isHandledCommand(message, command) {
    return message.split(' ')[1] === command
  }
}
