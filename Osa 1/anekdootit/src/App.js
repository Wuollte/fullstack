import React, { useState } from 'react'

const Button =({handleClick, text})=> ( <button onClick={handleClick}> {text} </button> )
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const MostVotes=(props)=> {
  return (
    <div>
    <p>{props.anecd[props.votes.indexOf(Math.max(...props.votes))]}</p>
    <p>has {Math.max(...props.votes)} votes</p>
    </div>
  )
  }

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const points = [0, 0, 0, 0, 0, 0]
  const [selected, setSelected] = useState(0)
  const [allPoints, setPoints] = useState(points)
  const nextAnecdote =()=> {
    setSelected(getRandomInt(0,5))
  }
  const voteFor=()=>{
    const copy =[ ...allPoints]
    copy[selected]+=1
    setPoints(copy)
    console.log(allPoints)
    
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {allPoints[selected]} votes</p>
      <Button handleClick={voteFor} text ='vote' />
      <Button handleClick={nextAnecdote} text='next anecdote' />
      <h1>Anecdote with the most votes</h1>
      <MostVotes votes={allPoints} oldMax={Math.max(allPoints)} anecd={anecdotes}/>
    </div>
  )
}

export default App
