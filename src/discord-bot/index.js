import Discord from 'discord.js'

export default class DiscordBot {
  constructor() {
    this.client = new Discord.Client()

    this.client.on('ready', () =>
      this.onReady())
  }

  start() {
    this.client.login(process.env.DISCORD_TOKEN)
  }

  onReady() {
    this.client.user.setActivity('queueup.gg')
  }
}
