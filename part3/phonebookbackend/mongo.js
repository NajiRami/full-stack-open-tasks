const mongoose = require('mongoose')

if (!(process.argv.length === 3 || process.argv.length === 5)){
  console.log('command: node mongo.js yourPassword || node mongo.js yourPassword name number')
  process.exit(1)
} 

const password = process.argv[2]
const url = `mongodb+srv://najyramy111_db_user:${password}@cluster0.ytr8w3q.mongodb.net/phoneBook`

mongoose.set('strictQuery', false)

mongoose.connect(url, {family: 4})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => { 
      console.log(person)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log('person saved')
    mongoose.connection.close()
  })
}