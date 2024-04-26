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

const CountryInfo = ({ country }) => {
  return (
    <div>
      {console.log(country)}
    </div>
  )
}

const SearchResults = ({ searchResults }) => {
  const topResults = searchResults.slice(0, 10)

  return (
    <div>
      {topResults.map(name => <SearchResult key={name} countryName={name} />)}
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
      {
        searchResults.length === 1
          ? <CountryInfo country={
            countries.find(country => country.name.common === searchResults[0])
          } />
          : <SearchResults searchResults={searchResults} />
      }


    </>
  )
}

export default App
