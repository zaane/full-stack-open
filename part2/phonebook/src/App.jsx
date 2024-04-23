import { useState } from 'react'

const Contact = (props) => {
  return <div>{props.name}</div>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Barto Bellas' },
    { name: 'Darto Dellas' },
    { name: 'Farto Fellas' }
  ])
  const [newName, setNewName] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already in the phonebook!`)
    } else {
      const newPerson = { name: newName }
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input
            value={newName}
            onChange={handleInputChange}
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
      {persons.map(person => <Contact key={person.name} name={person.name} />)}
    </div>
  )
}

export default App