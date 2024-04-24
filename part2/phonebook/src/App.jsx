import { useEffect, useState } from 'react'
import contactService from './services/contacts'

const Filter = (props) => {
  return <div>
    filter contacts by
    <input
      value={props.filter}
      onChange={props.onChange}
    />
  </div>
}

const ContactForm = (props) => {
  return <form>
    <div>
      name: <input
        value={props.newName}
        onChange={props.handleNameChange}
      />
    </div>
    <div>
      number: <input
        value={props.newNumber}
        onChange={props.handleNumberChange}
      />
    </div>
    <div>
      <button
        onClick={props.addContact}
        type="submit">
        add
      </button>
    </div>
  </form>
}

const Contacts = (props) => {
  return <div>
    {
      props.persons.map(person =>
        <Contact
          key={person.id}
          name={person.name}
          number={person.number}
        />)
    }
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
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then(loadedContacts => setPersons(loadedContacts))
  }, [])

  const addContact = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already in the phonebook!`)
    } else {
      const newPerson = { name: newName, number: newNumber, id: (persons.length + 1).toString() }
      contactService
        .create(newPerson)
        .then(response => setPersons(persons.concat(response)))
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
      <Filter filter={filter} onChange={handleFilterChange} />

      <h2>Save New Contact</h2>

      <ContactForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addContact={addContact}
      />

      <h2>Numbers</h2>

      <Contacts persons={personsToShow} />
      {/* {personsToShow.map(person =>
        <Contact
          key={person.id}
          name={person.name}
          number={person.number}
        />)} */}
    </div>
  )
}

export default App