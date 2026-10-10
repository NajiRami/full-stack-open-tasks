const Person = (props) => {
  return (<p>
    {props.person.name} {props.person.number} 
    <button onClick={props.handleDelete}>delete</button></p>)
}

export default Person