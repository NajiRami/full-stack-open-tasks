import { useEffect, useState } from "react"
import axios from "axios"
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => {
      setCountries(response.data)
    })

  }, [])


  const handleFilterChange = (event) => {setFilter(event.target.value)}


  const handleButtonClick = (countryName) => {
    setFilter(countryName)
  }

  return (
    <div>
      <div>
        find countries
        <input value={filter} onChange={handleFilterChange} />
      </div>
      <div>
        <Countries countries={countries} filter={filter} handleButtonClick={handleButtonClick}/>
      </div>
    </div>
  )
}

export default App
