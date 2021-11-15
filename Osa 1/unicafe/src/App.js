import React, { useState } from 'react'

const StatisticLine =(props)=> {
  return (
    <tr><td>{props.text}</td><td>{props.value} {props.mark}</td></tr>
  )
}

const Statistics=(props)=>{
  if (props.counter4 === 0) {
    return (
      <div>
        <h1>statistics</h1>
       <p> No feedback given</p>
        </div>
    )
  }

  return (
    <div>
    <h1>statistics</h1>
    <table>
      <tbody>
    <StatisticLine text = "good" value = {props.counter1} />
    <StatisticLine text ="neutral" value = {props.counter2} />
    <StatisticLine text ="bad" value = {props.counter3} />
    <StatisticLine text ="all" value ={props.counter4} />
    <StatisticLine text ="average" value ={props.counter5/props.counter4} />
    <StatisticLine text ="positive" value ={100*props.counter1/props.counter4} mark="%" />
    </tbody>
    </table>
   </div>
  )
}

const Button =({handleClick, text})=> ( <button onClick={handleClick}> {text} </button> )

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all,setAll] =useState(0)
  const[average, setAvg] =useState(0)
  const goodReview =()=>{
      setGood(good+1)
      setAll(all+1)
      setAvg(average+1)
  }
  const neutralReview =()=>{
      setNeutral(neutral+1)
      setAll(all+1) 
  }
  const badReview =()=>{
      setBad(bad+1)  
      setAll(all+1)
      setAvg(average-1)    
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodReview}  text='good'></Button>
      <Button handleClick={neutralReview} text ='neutral'></Button>
      <Button handleClick={badReview} text = 'bad' ></Button>
      <Statistics counter1={good} counter2={neutral} counter3={bad} counter4={all} counter5={average}/>
    </div>
  )
}

export default App
