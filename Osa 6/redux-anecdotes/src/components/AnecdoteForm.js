import React from 'react'
import {addAnecdote} from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setMessage, removeMessage } from '../reducers/popupReducer'

const AnecdoteForm = () => {
    const dispatch= useDispatch()
    const add = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        dispatch(addAnecdote(content))
        dispatch(setMessage("ANECDOTE ADDED"))
        setTimeout(()=> {dispatch(removeMessage())},5000)
    }
    return (
    <div>
        <h2>create new</h2>
        <form onSubmit={add}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
        </form>
    </div>
    )
}
export default AnecdoteForm