import React, {useState} from 'react';

const App = () =>  {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState(''); 
  const [searchFilter, setSearchFilter] = useState('');

  const nameChangeHandler = (event) => {
    setNewName(event.target.value);
  };

  const numberChangeHandler = (event) => {
    setNewNumber(event.target.value);
  };

  const filterPersons = (event) => {
    setSearchFilter(event.target.value);

    console.log(searchFilter);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingName = persons.find((person) => person.name === newName);
    if (existingName){
      alert(`${newName} already exists in the phonebook!`);
      return;
    }

    setPersons(persons.concat({name: newName, number: newNumber}));
    setNewName('');
    setNewNumber('');
  };

  // forcing names to lowercase in filtering to make the filter case insensitive
  const filteredPersons = persons.filter(person => 
      person.name.toLowerCase().includes(searchFilter.toLowerCase())
    );
  
  const personRows = () => {
      return filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with <input onChange={filterPersons} value={searchFilter}/>
      </div>
      <h2>Add person</h2>
      <form>
        <div>
          name: <input onChange={nameChangeHandler} value={newName}/>
        </div>
        <div>
          number: <input onChange={numberChangeHandler} value={newNumber}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
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
