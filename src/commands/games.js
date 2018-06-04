import { RichEmbed } from 'discord.js'
import games from '../constants/games.json'
import Command from '../utils/command'

export default class GamesCommand extends Command {
  constructor(client) {
    super(client)

    this.client.on('ready', () =>
      this.onReady())
    this.client.on('message', message =>
      this.onMessage(message))
  }

  onReady() {}

  onMessage(message) {
    const { channel, content } = message
    if (this.isHandledCommand(content, 'games')) {
      channel.send('', new RichEmbed({
        fields: games.map(game => ({
          name: game.label,
          value: game.key,
        }))
      }))
    }
  }
}
