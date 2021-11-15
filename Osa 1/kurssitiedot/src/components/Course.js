import React from 'react'
const Header =(props)=> {
    return(
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  
  const Part =(props)=> {
    console.log({props})
    return (
      <p>{props.name} {props.teht}</p>
    )
  }
  
  const Content =({parts})=> {
    console.log({parts})
    return (
      <div>
       {parts.map(parts => <Part key={parts.id} name={parts.name} teht={parts.exercises} />)}
      </div>
    )
  }
  
  const Total =(props)=> {
    const total = 
      props.parts.reduce((s,p)=> s+p.exercises,0)
    return (
      <div>
        <p>Number of exercises {total}</p>
      </div>
    )
  }
  const Course =({course})=>{
    console.log({course})
    return(
      <div>
        <Header course={course.name}></Header>
        <Content parts ={course.parts}></Content>
        <Total parts ={course.parts}></Total>
      </div>
    )
  }
  export default Course