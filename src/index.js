import Discord from 'discord.js'
import dotenv from 'dotenv'
import QueueUpHandler from './handlers/queueup-handler'

const client = new Discord.Client()

dotenv.config()



client.on('ready', () =>
  client.user.setActivity('queueup.gg', {type: 'PLAYING'}))

client.on('guildCreate', guild => 
  guild.createChannel('queueup-bot')
    .then(channel => channel.send(`
Hi ! :wave:
You can start using me by typing \`/qup help\`
`)))

client.on('message', message => 
  message.channel.name === 'queueup-bot' && message.content.startsWith('/qup') && new QueueUpHandler({ message }))

client.login(process.env.DISCORD_TOKEN)
