const Country = ({country}) => {
  const languages = country.languages
  const flagUrl = country.flags.png
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital.join(' ')}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.entries(languages).map(([key, value]) => <li key={key}>{value}</li>)}
      </ul>
      <img src={flagUrl} />
    </div>
  )
}


const Countries = ({countries, filter, handleButtonClick}) => {
  const tirmmedFilter = filter.trim()
  const countriesToShow = 
  tirmmedFilter.length > 0? 
  countries.filter(country => country.name.common.toLowerCase().includes(tirmmedFilter.toLowerCase()))
  : countries

  if (tirmmedFilter.length ===0) {
    return
  }
  else if (countriesToShow.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  }
  else if (countriesToShow.length > 1) {
    return (
      <div>
        {countriesToShow.map(country =>
           <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => handleButtonClick(country.name.common)}>show</button>
            </div>
           )}
      </div>
    )
  }
  else if (countriesToShow.length === 1) {
    return (
      <Country country={countriesToShow[0]} />
    )
  }
}

export default Countries