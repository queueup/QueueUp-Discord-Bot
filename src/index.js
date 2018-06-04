import dotenv from 'dotenv'

import GamesCommand from './commands/games'
import HelpCommand from './commands/help'
import LfgCommand from './commands/lfg'
import MoreCommand from './commands/more'

import DiscordBot from './discord-bot'

dotenv.config()

const bot = new DiscordBot()

new GamesCommand(bot.client)
new HelpCommand(bot.client)
new LfgCommand(bot.client)
new MoreCommand(bot.client)

bot.start()
