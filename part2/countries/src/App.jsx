import axios from 'axios'
import { useEffect, useState } from 'react'

const SearchBox = ({ query, onChange }) => {
  return <div>
    find country:
    <input
      value={query}
      onChange={onChange}
    />
  </div>
}

const SearchResult = ({ countryName }) => {
  return (
    <div>
      {countryName}
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    getAllCountries('https://studies.cs.helsinki.fi/restcountries/api')
      .then(loadedCountries => setCountries(loadedCountries))

      console.log('effect called');
  }, [])

  const getAllCountries = (baseUrl) => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
  }

  const handleSearchChange = (event) => {
    setQuery(event.target.value)
  }

  const searchResults = query 
    ? countries.map(country => country.name.common).filter(name => 
      name.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <>
      <SearchBox query={query} onChange={handleSearchChange} />
      <div>
        {searchResults.slice(0,10).map(name => <SearchResult key={name} countryName={name} />)}
      </div>
    </>
  )
}

export default App
