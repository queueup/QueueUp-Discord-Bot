import Command from '../utils/command'

export default class MoreCommand extends Command {
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
    if (this.isHandledCommand(content, 'more')) {
      author.send(`
Hi ${author.username} :wave:,
I'm really glad you want to learn more about us. This bot has been crafted by the QueueUp team.
You can discover our work here: <https://queueup.gg/>
If you're a developer and you want to help us, you can contribute to any project here: <https://github.com/queueup/>
You can find us on Discord too, so come chat and play with us: http://discord.gg/Zk2fsnN
        `
      )
    }
  }
}
