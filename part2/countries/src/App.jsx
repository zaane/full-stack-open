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

const Result = () => {
  return (
    <>
      result
    </>
  )
}

function App() {
  const [countryNames, setCountryNames] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    getAllCountryNames('https://studies.cs.helsinki.fi/restcountries/api')
      .then(loadedNames => setCountryNames(loadedNames))
    console.log('effect called')
  }, [])

  const getAllCountryNames = (baseUrl) => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data.map(country => country.name.common))
  }


  const getCountryByName = (baseUrl, name) => {
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => {
      console.log(response.data)
    })
  }

  // getCountryByName('https://studies.cs.helsinki.fi/restcountries/api', 'kuwait')



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
