import DiscordBot from './discord-bot'
import dotenv from 'dotenv'
import GamesCommand from './commands/games'

dotenv.config()

const bot = new DiscordBot()

new GamesCommand(bot.client)

bot.start()
