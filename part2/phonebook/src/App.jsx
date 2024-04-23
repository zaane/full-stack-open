import { useState } from 'react'

const Contact = (props) => {
  return <div>{props.name} {props.number}</div>
}

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '555-555-5555'
    },
    {
      name: 'Barto Bellas',
      number: '555-555-5555'
    },
    {
      name: 'Darto Dellas',
      number: '555-555-5555'
    },
    {
      name: 'Farto Fellas',
      number: '555-555-5555'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already in the phonebook!`)
    } else {
      const newPerson = { name: newName, number: newNumber }
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button
            onClick={addContact}
            type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Contact
          key={person.name}
          name={person.name}
          number={person.number}
        />)}
    </div>
  )
}

export default App