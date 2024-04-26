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

const SearchResult = ({ countryName, onClickShow }) => {
  return (
    <div>
      {countryName}
      <button onClick={() => onClickShow(countryName)}>show</button>
    </div>
  )
}

const SearchResults = ({ searchResults, onClickShow }) => {
  const topResults = searchResults.slice(0, 10)

  return (
    <div>
      {topResults.map(name => <SearchResult key={name} countryName={name} onClickShow={onClickShow} />)}
    </div>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital: {country.capital}</div>
      <div>area: {country.area} km^2</div>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} />
      {console.log(country)}
    </div>
  )
}


function App() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [countryToShow, setCountryToShow] = useState({})

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

  useEffect(() => {
    if (searchResults.length === 1) {
      setCountryToShow(getCountryByName(searchResults[0]))
    } else if (Object.keys(countryToShow).length) {
      setCountryToShow({})
    }
  }, [query])

  const handleShowInfo = (countryName) => {
    setCountryToShow(countries.find(country => country.name.common === countryName))
  }

  const getCountryByName = (countryName) => {
    return countries.find(country => country.name.common === countryName)
  }

  return (
    <>
      <SearchBox query={query} onChange={handleSearchChange} />
      {Object.keys(countryToShow).length
        ? <CountryInfo country={getCountryByName(searchResults[0])} />
        : <SearchResults searchResults={searchResults} onClickShow={handleShowInfo} />
      }
    </>
  )
}

export default App
