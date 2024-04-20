const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14 
  }

  return (
    <div>
      <Header course={course} />
      <Content 
      part1={part1.name} exercises1={part1.exercises}
      part2={part2.name} exercises2={part2.exercises}
      part3={part3.name} exercises3={part3.exercises} /> 
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}/>

    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.number}</p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part name={props.part1} number={props.exercises1}/>
      <Part name={props.part2} number={props.exercises2}/>
      <Part name={props.part3} number={props.exercises3}/>
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  )
}


export default App