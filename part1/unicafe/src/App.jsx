import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.handleClick}>
    {props.text}
  </button>
}


const StatDisplay = (props) => (
  <p>{props.name} {props.value}</p>
)

const Statistics = (props) => {
      const { good, neutral, bad, total } = props

      return <>
        <StatDisplay name={"good"} value={good}/>
        <StatDisplay name={"neutral"} value={neutral}/>
        <StatDisplay name={"bad"} value={bad}/>
        <StatDisplay name={"all"} value={total}/>
        <StatDisplay name={"average"} value={total ? Math.round(100 * (good - bad)/total) / 100: ' '} />
        <StatDisplay name={"percent positive"} value={total ? `${Math.round(100*good/total)/100}%` : ' '}/>
      </>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad;

  const incrementStat = (stat, setStat) => () => setStat(stat + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementStat(good, setGood)} text={'good'} />
      <Button handleClick={incrementStat(neutral, setNeutral)} text={'neutral'} />
      <Button handleClick={incrementStat(bad, setBad)} text={'bad'} />

      <h1>statistics</h1>
      <Statistics good={good} neutral= {neutral} bad={bad} total={total} />

    </div>
  )
}

export default App