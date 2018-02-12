import { RichEmbed } from 'discord.js'
import constantChampions from '../constants/queueup/champions'
import {
  getFlagFromLocale
} from '../helpers/emojis-helper'

export const embedCredits = () => new RichEmbed({
  url: 'http://queueup.gg/',
  footer: {
    text: 'Powered by QueueUp'
  },
  fields: [
    {
      name: 'Discord',
      value: 'http://discord.gg/Zk2fsnN',
    },
    {
      name: 'Facebook',
      value: 'https://facebook.com/queueupgg',
    },
    {
      name: 'Twitter',
      value: 'https://twitter.com/queueupgg',
    },
    {
      name: 'Website',
      value: 'http://queueup.gg',
    },
    {
      name: 'Android',
      value: 'https://play.google.com/store/apps/details?id=com.queueup',
    },
    {
      name: 'iOS',
      value: 'https://itunes.apple.com/us/app/queueup-gg/id1308181368?ls=1&mt=8',
    },
  ]
})

export const embedHelp = () => new RichEmbed({
  url: 'http://queueup.gg/',
  footer: {
    text: 'Powered by QueueUp'
  },
  fields: [
    {
      name: 'Asking for help',
      value: '`/qup help`: This message !'
    },
    {
      name: 'Credits',
      value: '`/qup credits`: Learn more about us'
    },
    {
      name: 'Config',
      value: '`/qup config <region> <summoner>`: Links your Discord to your League of Legends summoner'
    },
    {
      name: 'Looking for game',
      value: `
\`/qup lfg\`: Adds you to the queue if you already linked your Discord to your summoner name (read config section) or shows available summoners if you're already in the queue
`
    },
    {
      name: 'Your profile',
      value: `
:warning: Requires a QueueUp account! :warning:

\`/qup me\`: Sends you your profile

\`/qup me update\`: Updates your profile's ranked data
      `
    },
    {
      name: 'Other profiles',
      value: '`/qup profile <region> <summoner>`: Shows the selected summoner'
    }
  ]
})

export const embedProfile = ({
  champions,
  description,
  goals,
  locales,
  rankedData,
  region,
  roles,
  riotUpdatedAt,
  summonerName,
}) => new RichEmbed({
  description,
  timestamp: riotUpdatedAt || new Date(),
  footer: {
    text: 'Data from QueueUp.gg - Last update'
  },
  author: {
    name: `${summonerName} (${region.toUpperCase()})`,
  },
  fields: [
    {
      name: 'Favorite champions',
      value: champions.length > 0 ? champions.map(champion => constantChampions[parseInt(champion, 10)].name).join(', ') : 'None',
    },
    {
      name: 'Favorite roles',
      value: roles.length > 0 ? roles.join(', ') : 'None',
    },
    {
      name: 'Ranks',
      value: rankedData.length > 0 ? rankedData.map(datum => `${datum.queueType}: ${datum.tier} ${datum.rank}`).join(', ') : 'Unranked',
    },
    {
      name: 'Languages',
      value: locales.length > 0 ? locales.map(locale => getFlagFromLocale(locale)).join(' ') : 'Probably english, who knows ? ¯\\_(ツ)_/¯'
    },
    {
      name: 'Goals',
      value: goals.length > 0 ? goals.join(', ') : 'He still doesn\'t know  ¯\\_(⊙︿⊙)_/¯'
    },
  ]
})

export const embedLfg = data => new RichEmbed({
  timestamp: new Date(),
  footer: {
    text: 'Data from QueueUp.gg - Last update'
  },
  fields: data.map(({leagueProfile: {
    champions,
    description,
    goals,
    locales,
    rankedData,
    region,
    roles,
    summonerName,
  }}) => ({
    name: `${summonerName} (${region.toUpperCase()})`,
    value: `
${description}\n
**Favorite champions:** ${champions.length > 0 ? champions.map(champion => constantChampions[parseInt(champion, 10)].name).join(', ') : 'None'}\n
**Favorite roles:** ${roles.length > 0 ? roles.join(', ') : 'None'}\n
**Ranks:** ${rankedData.length > 0 ? rankedData.map(datum => `${datum.queueType}: ${datum.tier} ${datum.rank}`).join(', ') : 'Unranked'}\n
**Languages:** ${locales.length > 0 ? locales.map(locale => getFlagFromLocale(locale)).join(' ') : 'Probably english, who knows ? ¯\\_(ツ)_/¯'}\n
**Goals:** ${goals.length > 0 ? goals.join(', ') : 'He still doesn\'t know  ¯\\_(⊙︿⊙)_/¯'}\n\n
    `
  }))
})
