import { get } from 'lodash'
import moment from 'moment'
import games from '../constants/games.json'
import database from '../database'
import Command from '../utils/command'

export default class LfgCommand extends Command {
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
    const splitContent = content.split(' ')
    if (this.isHandledCommand(content, 'lfg')) {
      const game = get(splitContent, 2)
      const dbGame = games.find(gm => gm.key === game)
      this.updatePlayers()
      if (!dbGame) {
        return channel.send('Invalid game. Please try `/qup games` to list all the games')
      }
      if (splitContent.length > 3) {
        this.subscribePlayer(message, game, dbGame)
      } else {
        this.showPlayers(message, game, dbGame)
      }
    }
  }

  updatePlayers() {
    database
      .get('players')
      .remove(player => moment(new Date(player.createdAt)).diff(moment(), 'minutes') < -5)
      .write()
  }

  showPlayers(message, game, dbGame) {
    const { channel } = message
    const players = database  
      .get('players')
      .filter({ game })
      .value()
    channel.send(`
Here are the **${dbGame.label}** players:
${players.map(player => `- ${player.region ? `**[${player.region.toUpperCase()}]** ` : ''}${player.gameName} (${player.discordId})`).join('\n')}`)
  }

  subscribePlayer(message, game, dbGame) {
    const { author, channel, content } = message
    const splitContent = content.split(' ')

    if (
      database
        .get('players')
        .filter({ discordId: `${author.username}#${author.discriminator}` })
        .value()
        .length > 0
    ) {
      return channel.send('You are already in the waiting list')
    }
    database
      .get('players')
      .push({
        createdAt: moment().toString(),
        discordId: `${author.username}#${author.discriminator}`,
        game: get(splitContent, 2),
        gameName: get(splitContent, 3),
        region: get(splitContent, 4),
      })
      .write()
    channel.send(`We added you to the **${dbGame.label}** players list`)
  }
}
