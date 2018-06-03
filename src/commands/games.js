import { RichEmbed } from 'discord.js'
import games from '../constants/games.json'
import Command from '../utils/command'

export default class BugReportHandler extends Command {
  constructor(client) {
    super(client)

    this.client.on('ready', () =>
      this.onReady())
    this.client.on('message', message =>
      this.onMessage(message))
  }

  onReady() {}

  onMessage(message) {
    const {
      attachments,
      author,
      content,
      guild,
    } = message
    console.log(content)
    if (this.isHandledCommand(content, 'games')) {
      console.log('is ok')
      message.channel.send('', new RichEmbed({
        fields: games.map(game => ({
          name: game.label,
          value: game.key,
        }))
      }))
    }
  }
}
