import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.handleClick}>
    {props.text}
  </button>
}


const StatisticLine = (props) => (
  <p>{props.text} {props.value}</p>
)

const Statistics = (props) => {
      const { good, neutral, bad, total } = props

      return (total === 0) ?
      <p>No feedback so far</p> :
      <>
        <StatisticLine text={"good"} value={good}/>
        <StatisticLine text={"neutral"} value={neutral}/>
        <StatisticLine text={"bad"} value={bad}/>
        <StatisticLine text={"all"} value={total}/>
        <StatisticLine text={"average"} value={total ? Math.round(100 * (good - bad)/total) / 100: ' '} />
        <StatisticLine text={"percent positive"} value={total ? `${Math.round(100*good/total)/100}%` : ' '}/>
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