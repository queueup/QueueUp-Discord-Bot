import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
})

instance.interceptors.request.use(config => {
  config.headers.AUTH_TOKEN = process.env.API_KEY
  return config
}, function (error) {
  return Promise.reject(error)
})

export const getProfileByDiscord = discordTag =>
  instance.get(`league_profiles/by_discord/${encodeURIComponent(discordTag)}`)

export const updateProfileByDiscord = discordTag =>
  instance.patch(`league_profiles/by_discord/${encodeURIComponent(discordTag)}/ranked_data`)

export const updateConfigByDiscord = (params, discordTag) =>
  instance.patch(`discord_users/${encodeURIComponent(discordTag)}`, params)

export const getProfileBySummonerName = ({ region, summonerName}) =>
  instance.get(`league_profiles/by_summoner_name/${encodeURIComponent(region)}/${encodeURIComponent(summonerName)}`)

export const getLfg = params =>
  instance.get('lfg_league_profiles', { params })
  
export const createLfgByDiscord = discordTag =>
  instance.post(`lfg_league_profiles/by_discord/${encodeURIComponent(discordTag)}`)
