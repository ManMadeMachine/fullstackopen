import React, {useState} from 'react';

const Filter = (props) => {
  const {changeHandler, searchFilter} = props;
  return (
    <div>
      filter shown with <input onChange={changeHandler} value={searchFilter}/>
    </div>
  );
};

const PersonForm = (props) => {
  const {nameChangeHandler, name, numberChangeHandler, number, submitHandler} = props;
  return(
    <form>
      <div>
        name: <input onChange={nameChangeHandler} value={name}/>
      </div>
      <div>
        number: <input onChange={numberChangeHandler} value={number}/>
      </div>
      <div>
        <button type="submit" onClick={submitHandler}>add</button>
      </div>
    </form>
  );
};

const Persons = ({persons}) => {
  const personRows = () => {
    return persons.map(person => <Person key={person.name} person={person} />)
  };

  return(
    <div>
      {personRows()}
    </div>
  );
};

const Person = ({person}) => {
  return(
    <p>{person.name} {person.number}</p>
  );
};

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

  const filterChangeHandler = (event) => {
    setSearchFilter(event.target.value);
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter changeHandler={filterChangeHandler} searchFilter={searchFilter} />

      <h3>Add person</h3>
      <PersonForm
         nameChangeHandler={nameChangeHandler}
         name={newName}
         numberChangeHandler={numberChangeHandler}
         number={newNumber}
         submitHandler={addPerson} />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
}

export default App;
