import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
const [countries,setCountries]=useState([])
const [newFilter,setNewFilter] = useState('')

useEffect(()=>{
console.log('effect')
axios.get('https://restcountries.com/v3.1/all')
.then(response =>{
  console.log('promise fulfilled')
  setCountries(response.data)
})
},[])

const handleFilterChange =(event)=> {
  console.log(event.target.value)
  setNewFilter(event.target.value)
}
const countriesToShow = newFilter ?
countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()) === true):
countries

if (countriesToShow.length>10) {
  return(
    <div>
      <form>
        <div>
          filter countries: <input value={newFilter} onChange={handleFilterChange}/>
        </div>
      </form>
      <h2>Countries</h2>
      <ul>
        Too many matches
      </ul>
    </div>
    )
}
if (countriesToShow.length===1){
  console.log(countriesToShow[0].languages['prs'])
  return(
    <div>
      <form>
        <div>
          filter countries: <input value={newFilter} onChange={handleFilterChange}/>
        </div>
      </form>
      <h2>{countriesToShow[0].name.common}</h2>
      <p>Capital: {countriesToShow[0].capital}</p>
      <p>Population: {countriesToShow[0].population}</p>
      <h2>Languages</h2>
      <ul>{Object.entries(countriesToShow[0].languages).map(([key, value])=>
      <li key={key}>{value}</li>)}
      </ul>
      <img src={countriesToShow[0].flags.png} alt='404'/>
    </div>
  )
  }
if (countriesToShow.length<=10) {
  return(
    <div>
      <form>
        <div>
          filter countries: <input value={newFilter} onChange={handleFilterChange}/>
        </div>
      </form>
      <h2>Countries</h2>
      <ul>
        {countriesToShow.map(country => <li key={country.name.common} >{country.name.common}</li>)}
      </ul>
    </div>
    )
}



}

export default App
