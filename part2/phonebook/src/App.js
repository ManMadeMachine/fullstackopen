import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () =>  {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState(''); 
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data);
      });
  }, []);

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

  // use lowercase names to make the filter case insensitive
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
