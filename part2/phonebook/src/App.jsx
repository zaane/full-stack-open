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

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Contact name={person.name} />)}
    </div>
  )
}

export default App