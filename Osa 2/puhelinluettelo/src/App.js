import React, { useEffect, useState } from 'react'
import service from './services/numbers'
import './index.css'



const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="status">
      {message}
    </div>
  )
}
const ErrorNotification = ({ message2 }) => {
  if (message2 === null) {
    return null
  }

  return (
    <div className="error">
      {message2}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName , setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newFilter,setNewFilter] = useState('')
  const [statusMessage, setStatusMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(()=>{
    console.log('effect')
    service.getAll()
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response)
    })
  },[])

  const addName = (event) => {
    event.preventDefault()    
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.some(personObject=>personObject.name === newName)){
      console.log('duplicate name')
      if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)){
        const iid= (persons.find(({name}) => name === newName).id)

        service.update(iid,personObject).then(response => {setPersons(persons.map(p =>p.id !==iid ? p:response))}).catch(error => {setErrorMessage(`Information for ${newName} has been already deleted`)
        setStatusMessage(null)
        setTimeout(()=>{setErrorMessage(null)},2000)
        setPersons(persons.filter(p=>p.id!==iid))})

        setStatusMessage(`Number for ${newName} was updated`)
        setTimeout(()=>{setStatusMessage(null)},2000)
      }
      setNewName('')
      setNewNumber('')
    }
    else {
        service.create(personObject)
        .then(response => {
        setPersons(persons.concat(response))
        setStatusMessage(`${newName} was added`)
        setTimeout(()=>{setStatusMessage(null)},2000)
        setNewName('')
        setNewNumber('') })
    }
  }
  const deleteNumber=(id,name)=> {
    if (window.confirm(`Are you sure you want to delete ${name}?`)){
    service.del(id).catch(error => {setErrorMessage(`${name} is already deleted from the server`)
    setStatusMessage(null)
    setTimeout(()=>{setErrorMessage(null)},2000)})
    
    setPersons(persons.filter(personObject => personObject.id !== id))
    setStatusMessage(`${name} was deleted`)
    setTimeout(()=>{setStatusMessage(null)},2000)
    }
  }
  
  const handleNameChange = (event)=> {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event)=> {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange =(event)=> {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  const numbersToShow = newFilter ?
    persons.filter(personObject => personObject.name.toLowerCase().includes(newFilter.toLowerCase()) === true):
    persons;
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message ={statusMessage}/>
      <ErrorNotification message2 ={errorMessage}/>
      <h2>Filter</h2>
      <form>
        <div>
        <input value={newFilter} onChange={handleFilterChange}/>
        </div>
      </form>
      <h2>Add new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {numbersToShow.map(personObject =>
      <li key={personObject.id}>
      {personObject.name}---{personObject.number} <button onClick ={()=> deleteNumber(personObject.id,personObject.name)}>delete</button>
      </li>
      )}
      </ul>
    </div>
  )

}

export default App