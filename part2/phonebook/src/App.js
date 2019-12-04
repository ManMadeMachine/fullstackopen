import React, {useState} from 'react';

const App = () =>  {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ]);
  const [newName, setNewName] = useState('');

  const nameChangeHandler = (event) => {
    console.log("Change");
    setNewName(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    setPersons(persons.concat({name: newName}));
    setNewName('');
  };

  const personRows = () => {
    return persons.map(person => <p>{person.name}</p>)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
          name: <input onChange={nameChangeHandler} value={newName}/>
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personRows()}
      </div>
    </div>
  );
}

export default App;
