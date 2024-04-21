import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.handleClick}>
    {props.text}
  </button>
}


const StatDisplay = (props) => (
  <p>{props.rating} {props.count}</p>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementStat = (stat, setStat) => () => setStat(stat + 1)
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementStat(good, setGood)} text={'good'}/>
      <Button handleClick={incrementStat(neutral, setNeutral)} text={'neutral'}/>
      <Button handleClick={incrementStat(bad, setBad)} text={'bad'}/>

      <h1>statistics</h1>
      <StatDisplay rating={"good"} count={good}/>
      <StatDisplay rating={"neutral"} count={neutral}/>
      <StatDisplay rating={"bad"} count={bad}/>
    </div>
  )
}

export default App