import axios from 'axios'
import { useEffect, useState } from 'react'
import countryService from './services/countries'


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
  console.log(countryName);
  return (
    <div>
      {countryName}
      <button onClick={onClickShow}>show</button>
    </div>
  )
}

const SearchResults = ({ searchResults, onClickShow }) => {
  const topResults = searchResults.slice(0, 10)

  return (
    <div>
      {topResults.map(name =>
        <SearchResult
          key={name}
          countryName={name}
          onClickShow={() => onClickShow(name)}
        />)}
    </div>
  )
}

const CountryInfo = ({ country, onClose }) => {
  return (
    <div>
      <h2>{country.name.common} <button onClick={onClose}>close</button></h2>
      <div>capital: {country.capital}</div>
      <div>area: {country.area} km^2</div>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} />
      <WeatherInfo />
    </div>
  )
}

const WeatherInfo = ({ country }) => {
  const api_key = import.meta.env.VITE_SOME_KEY
  const getWeatherInfo = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
      .then(response => response.data)
  }

  return <div>
    weather will go here
  </div>
}


function App() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [countryToShow, setCountryToShow] = useState({})

  useEffect(() => {
    countryService
      .getAllCountries()
      .then(loadedCountries => setCountries(loadedCountries))
  }, [])

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
    console.log(`showing ${countryName}`);
    setCountryToShow(getCountryByName(countryName))
  }

  const getCountryByName = (countryName) => {
    return countries.find(country => country.name.common === countryName)
  }

  return (
    <>
      <SearchBox query={query} onChange={handleSearchChange} />
      {Object.keys(countryToShow).length
        ? <CountryInfo country={countryToShow} onClose={() => setCountryToShow({})} />
        : <SearchResults searchResults={searchResults} onClickShow={handleShowInfo} />
      }
    </>
  )
}

export default App
