import { useEffect, useState } from 'react'
import Notification from './components/Notification'
import personServices from './services/persons'
import Person from './components/Person'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    personServices.getAll()
    .then(initialData => {
      setPersons(initialData)
    })
    .catch(() => {
      alert('failed to load contacts from the server')
    })
  }, [])

  const handleAdd = (event) => { 
    event.preventDefault()

    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()
    if (!trimmedName || !trimmedNumber){
      alert('Please fill in both name and number')
      return
    }

    const existingPerson = persons.find(
      p => p.name.toLowerCase() === trimmedName.toLowerCase()
    )
    if (existingPerson) {
      const confirmUpdate = window.confirm(`${trimmedName} is already added to the phone book, replace the old number with a new one?`)

      if(confirmUpdate) {
        const updatedPerson = {...existingPerson, number: trimmedNumber}
        personServices.update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id === returnedPerson.id? returnedPerson: p))
          setNewName('')
          setNewNumber('')
          setMessage(`updated the number for ${returnedPerson.name}`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(`information of ${existingPerson.name} has already been removed from the server`)
          setMessageType('error')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== existingPerson.id))
        })
      }
      return
    }

    const newPerson = {
      name: trimmedName,
      number: trimmedNumber,
    }
    personServices.create(newPerson)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setMessage(`Add ${returnedPerson.name}`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    })
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}`)){
      personServices.deletePerson(person.id)
      .then(() => {
        setPersons(persons.filter(x => x.id !== person.id))
      })
      .catch(error => {
        alert(`The person ${person.name} was already deleted from the server`)
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  const personsToShow = (filter.trim().length === 0) 
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(filter.trim().toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />
      <div>
        filter shown with <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <h1>Add a new</h1>
      <form onSubmit={handleAdd}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person => 
        <Person 
         key={person.id}
         person={person}
         handleDelete={() => handleDelete(person)}/>)}
      </div>
    </div>
  )
}

export default App