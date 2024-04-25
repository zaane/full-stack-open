import axios from 'axios'
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

const Result = () => {
  return (
    <>
    result
    </>
  )
}

function App() {
  const [countries, setCountries] = useState('')
  const [query, setQuery] = useState('')

  const getAllCountryNames = (baseUrl) => {
    const request = axios.get(baseUrl)
    return request.then(response => {
      console.log(response.data.map(datum => datum.name.common))})
  }

  getAllCountryNames('https://studies.cs.helsinki.fi/restcountries/api/all')


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
