import { useState } from 'react'

const SearchBox = ({ query, onChange }) => {
  return <div>
    find country: 
    <input 
    value={query}
    onChange={onChange}
     />
  </div>
}

function App() {
  const [query, setQuery] = useState('')

  const handleSearchChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <>
    <SearchBox query={query} onChange={handleSearchChange} />
    </>
  )
}

export default App
