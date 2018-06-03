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
    const { content } = message
    if (this.isHandledCommand(content, 'games')) {
      message.channel.send('', new RichEmbed({
        fields: games.map(game => ({
          name: game.label,
          value: game.key,
        }))
      }))
    }
  }
}
