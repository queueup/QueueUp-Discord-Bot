import { RichEmbed } from 'discord.js'
import Command from '../utils/command'

export default class HelpCommand extends Command {
  constructor(client) {
    super(client)

    this.client.on('ready', () =>
      this.onReady())
    this.client.on('message', message =>
      this.onMessage(message))
  }

  onReady() {}

  onMessage(message) {
    const { author, content } = message
    if (this.isHandledCommand(content, 'help')) {
      author.send(
        '',
        new RichEmbed({
          description: `Hi ${author.username} :wave:,\nHere are all the commands you can use with me!`,
          fields: [
            {
              name: 'Listing all the games',
              value: '`/qup games`',
            },
            {
              name: 'Listing players',
              value: '`/qup lfg <game>`: Lists all the players willing to play that game in the last 5 minutes',
            },
            {
              name: 'Subscribing',
              value: '`/qup lfg <game> <in-game-name> <region|optional>`: Add yourself to the queue for 5 minutes. We will give other players your game informations as well as your DiscordTag so they can add you.'
            },
            {
              name: 'More',
              value: '`/qup more`: We will provide you more informations about us.'
            }
          ]
        })
      )
    }
  }
}
