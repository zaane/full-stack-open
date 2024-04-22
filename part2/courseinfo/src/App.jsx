const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><strong>Total of {sum} exercises</strong></p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(part => <Part key={part.key} part={part} />)}
  </>

const Course = ({ course }) =>
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((acc, part) => acc + part.exercises, 0)} />
  </div>

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <>
    <h1>Web Development Curriculum</h1>
    {courses.map(course => <Course course={course} />)}
  </>
}

export default App