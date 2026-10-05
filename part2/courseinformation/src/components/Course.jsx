const Header = ({name}) => {
  return(
  <h2>{name}</h2>
  )
}

const Content = ({course}) => {
  return (
    course.parts.map(part => <Part key={part.id} part={part}/>)
  )
}

const Part = ({part}) => {
  return <p>{part.name} {part.exercises}</p>
}

const Course = ({course}) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises , 0)
  return (
    <div>
      <Header name={course.name} />
      <Content course={course}/>
      <p>total of {total} exercises</p>
    </div>
  )
}

export default Course