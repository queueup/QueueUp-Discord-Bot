const axios = require('axios')
const fs = require('fs')

let version = ''

function writeIndex(champions) {
  let buffer = 'const champions = {\n'
  Object.keys(champions).forEach(function(key) {
    const c = champions[key]
    buffer += '  ' + c.key + ': {\n'
    buffer += '    id: '+ c.key+',\n'
    buffer += '    key: \''+ c.id.toLowerCase()+'\',\n'
    buffer += '    name: \''+ c.name.replace('\'', '\\\'')+'\',\n'
    buffer += '    title: \''+ c.title.replace('\'', '\\\'')+'\',\n'
    buffer += '  },\n'
  })
  buffer += '}\n\nexport default champions'
  fs.writeFile('src/constants/queueup/champions.js', buffer)
}


axios
  .get('https://ddragon.leagueoflegends.com/api/versions.json')
  .then(vr => {
    version = vr.data[0]
    console.log('Ddragon version:', version)
    axios
      .get('http://ddragon.leagueoflegends.com/cdn/'+ version +'/data/en_US/champion.json')
      .then(function(r) {
        writeIndex(r.data.data)
      })
  })

