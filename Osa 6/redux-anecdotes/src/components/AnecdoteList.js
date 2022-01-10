import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import { setMessage, removeMessage } from '../reducers/popupReducer'
import Notification from './Notification'
import Filter from './Filter'


const AnecdoteList = () => {
const anecdotes = useSelector(state => {
  if (state.filter === ""){
    return state.anecdotes
  }
  return state.anecdotes.filter (x => x.content.includes(state.filter))
})
  anecdotes.sort((a,b) =>{return b.votes-a.votes})
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(voteAnecdote(anecdote))
    let alert = anecdotes.find(x => x.id === anecdote.id)
    dispatch (setMessage("you voted '"+alert.content+"'"))
    setTimeout(()=>{dispatch(removeMessage())},5000)
  }
    return (
    <div>
        <h2>Anecdotes</h2>
        <Notification/>
        <Filter/>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default AnecdoteList