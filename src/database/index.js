import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const adapter = new FileSync('database.json')
const database = lowdb(adapter)

database.defaults({ players: [] }).write()

export default database
