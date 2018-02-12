import RootHandler from './root-handler'

import {
  embedCredits,
  embedHelp,
  embedLfg,
  embedProfile,
} from '../helpers/embed-helper'
import {
  updateConfigByDiscord,
  getProfileByDiscord,
  getProfileBySummonerName,
  updateProfileByDiscord,
  createLfgByDiscord,
  getLfg,
} from '../helpers/queueup-api-helper'

export default class QueueUpHandler extends RootHandler {
  constructor(props) {
    super(props)
    this.message.channel.startTyping()

    this.dispatcher()
  }

  dispatcher() {
    switch(this.message.splitContent[1]) {
      case 'config':
        return this.configHandler()
      case 'credits':
        return this.creditsHandler()
      case 'help':
        return this.helpHandler()
      case 'lfg':
        return this.lfgHandler()
      case 'me': 
        return this.meHandler()
      case 'profile':
        return this.profileHandler()
      default:
        this.message.channel.send('Unknown command. Type `/qup help` for a list of commands')
        this.message.channel.stopTyping()
    }
  }

  configHandler() {
    const summonerName = [
      ...this.message.splitContent
    ]
    summonerName.splice(0, 3)
    return updateConfigByDiscord({ region: this.message.splitContent[2], summoner_name: summonerName.join(' ')}, this.message.authorTag)
      .then(() => {
        this.message.channel.send(`\`${summonerName.join(' ')}\` has been linked to \`${this.message.authorTag}\``)
        this.message.channel.stopTyping()
      })
      .catch(() => {
        this.message.channel.send('**Usage:** `/qup config <region> <summoner>`')
        this.message.channel.stopTyping()
      })
  }

  creditsHandler() {
    this.message.channel.stopTyping()
    this.message.author.send(
      `
Hey mate ! :wave:
Here are some places you can find us on. Any like/tweet/share is a huge support for us, so we'd love to see you doing so ! :heart:
`,
      embedCredits())
  }

  helpHandler() {
    this.message.channel.stopTyping()
    this.message.author.send(
      `
Hey mate ! :wave:
I just heard you needed some help, so here it is ! Don't forget that all data is provided by http://queueup.gg, so if you want to improve your profile, go there and take a look !
Oh, last thing, we also have our own Discord server, so if you want to help us improve this bot or our mobile app, come say hi here: http://discord.gg/Zk2fsnN
`,
      embedHelp()
    )
  }

  lfgHandler() {
    if (this.message.splitContent.length < 3) {
      return createLfgByDiscord(this.message.authorTag)
        .then(() => {
          this.message.channel.send('You\'re in the queue')
          this.message.channel.stopTyping()
        })
        .catch(() => {
          getLfg({ region: this.message.splitContent[3]})
            .then(({ data }) => {
              this.message.channel.send(`${data.length} summoners available`, embedLfg(data))
              this.message.channel.stopTyping()
            })
            .catch(r => {
              console.warn(r)
              this.message.channel.send('Error')
              this.message.channel.stopTyping()
            })
        })
    }
  }

  meHandler() {
    this.message.channel.stopTyping()
    switch(this.message.splitContent[2] || '') {
      case 'update':
        return updateProfileByDiscord(this.message.authorTag)
          .then(({ data }) => {
            this.message.author.send('Here is your updated profile. You can update other informations on the QueueUp mobile app if needed: http://queueup.gg/', embedProfile(data))
          })
          .catch(r => {
            console.warn(r)
            this.message.author.send(`No summoner found, please sign up on QueueUp and add \`${this.message.authorTag}\` to your profile Discord: http://queueup.gg or use \`/qup config\``)
          })
      default:
        return getProfileByDiscord(this.message.authorTag)
          .then(({ data }) => {
            this.message.author.send('Here is your profile, you can update your ranked data with `/qup me update` or update other informations on the QueueUp mobile app if needed: http://queueup.gg/', embedProfile(data))
          })
          .catch(r => {
            console.warn(r)
            this.message.author.send(`No summoner found, please sign up on QueueUp and add \`${this.message.authorTag}\` to your profile Discord: http://queueup.gg`)
          })
    }
  }

  profileHandler() {
    if (this.message.splitContent.length > 3) {
      const summonerName = [
        ...this.message.splitContent
      ]
      summonerName.splice(0, 3)
      return getProfileBySummonerName({ region: this.message.splitContent[2], summonerName: summonerName.join(' ')})
        .then(({ data }) => {
          this.message.channel.send(embedProfile(data))
          this.message.channel.stopTyping()
        })
        .catch(r => {
          console.warn(r)
          this.message.channel.send('This summoner doesn\'t exist on QueueUp. If you know him, ask him to sign-up right here: http://queueup.gg')
          this.message.channel.stopTyping()
        })
    } else {
      this.message.channel.stopTyping()
      return this.message.channel.send('**Usage:** `/qup profile <region> <summoner>`')
    }
  }
}
