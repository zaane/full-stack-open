import { useState } from 'react'

const Filter = (props) => {
  return <div>
    filter contacts by
    <input
      value={props.filter}
      onChange={props.onChange}
    />
  </div>
}

const Contact = (props) => {
  return <div>{props.name} {props.number}</div>
}

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '555-555-5555',
      id: 1
    },
    {
      name: 'Barto Bellas',
      number: '555-555-5555',
      id: 2
    },
    {
      name: 'Darto Dellas',
      number: '555-555-5555',
      id: 3
    },
    {
      name: 'Farto Fellas',
      number: '555-555-5555',
      id: 4
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already in the phonebook!`)
    } else {
      const newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = filter
    ? persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <div>
        filter contacts by
        <input
          value={filter}
          onChange={handleFilterChange}
        />
      </div> */}
      <Filter filter={filter} onChange={handleFilterChange} />
      
      <h2>Save New Contact</h2>
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
      {personsToShow.map(person =>
        <Contact
          key={person.id}
          name={person.name}
          number={person.number}
        />)}
    </div>
  )
}

export default App