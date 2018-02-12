import Discord from 'discord.js'
import dotenv from 'dotenv'
import QueueUpHandler from './handlers/queueup-handler'

const client = new Discord.Client()

dotenv.config()

client.on('ready', () => {
  console.info('I am ready!')
  client.user.setActivity('queueup.gg', {type: 'PLAYING'})
})

client.on('message', message => {
  if (message.content.startsWith('/qup')) {
    new QueueUpHandler({ message })
  }
})

client.login(process.env.DISCORD_TOKEN)
