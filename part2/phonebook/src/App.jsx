import { useState } from 'react'

const Numbers = ({persons}) => 
  persons.map(
    person => <p key={person.id}>{person.name} {person.number}</p>
  )
  
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  const handleAdd = (event) => { 
    event.preventDefault()
    if (persons.some(person => person.name === newName || person.number === newNumber)) {
      alert(`${newName} or them number is already added to phonebook`)
    }
    else if (newNumber.trim().length === 0 || newName.trim().length === 0){
      alert('Invalid input')
    }
    else {
    const newobject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    setPersons(persons.concat(newobject))
    setNewName('')
    setNewNumber('')
    }
  }


  const changeNewName = (event) => setNewName(event.target.value)
  const changeNewNumber = (event) => setNewNumber(event.target.value)
  const changeFilter = (event) => setFilter(event.target.value)


  const personsToShow = (filter.length === 0) 
  ? persons 
  : persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={changeFilter} />
      </div>

      <h1>Add a new</h1>
      <form onSubmit={handleAdd}>
        <div>
          name: <input value={newName} onChange={changeNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={changeNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <Numbers persons={personsToShow}/>
    </div>
  )
}

export default App