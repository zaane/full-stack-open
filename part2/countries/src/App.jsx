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
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => {
      console.log(response.data.map(datum => datum.name.common))})
  }

  getAllCountryNames('https://studies.cs.helsinki.fi/restcountries/api')

  const getCountryByName = (baseUrl, name) => {
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => {
      console.log(response.data)
    })
  }

  getCountryByName('https://studies.cs.helsinki.fi/restcountries/api', 'kuwait')



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
