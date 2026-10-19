const express = require('express')
const morgan = require('morgan')

const app = express()


app.use(express.json())

morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response)=> {
  response.send("<h1>hello world</h1>")
})

app.get('/info', (request, response) => {
  const requestTime = new Date()
  const length = persons.length
  response.send(
    `<p>phonebook has info for ${length} people</p>
    <p>${requestTime}</p>
    `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  if (person){
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const id = String(Math.floor(Math.random() * 10000000 + 1))
  const body = request.body

  if (!body || !body.name || !body.number) {
    return response.status(400).json({
      error: "name and number are required"
    })
  }

  if (persons.some(p => p.name === body.name)){
    return response.status(400).json({
      error: "name must be unique value"
    })
  }

  const person = {
    id: id,
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  response.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
 