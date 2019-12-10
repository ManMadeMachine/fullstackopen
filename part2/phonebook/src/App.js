import React, {useState, useEffect} from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personsService from './services/persons';

const App = () =>  {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState(''); 
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    personsService.getAll()
        .then(persons => {
            setPersons(persons);
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

  const addOrUpdatePerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    
    if (existingPerson){
      const replace = window.confirm(`${newName} is already added in the phonebook,
                                      replace the old number with a new one?`);
      if (replace) {
        // Update existing persons number
        const changedPerson = {...existingPerson, number: newNumber};
        personsService.updateNumber(existingPerson.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== changedPerson.id ? p : returnedPerson));
            });
      }

      return;
    }

    // Add new person
    const newPerson = {name: newName, number: newNumber};

    personsService.create(newPerson)
        .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson));
            setNewName('');
            setNewNumber('');
        });
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)){
      personsService.deleteById(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id));
      });
    }
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
         submitHandler={addOrUpdatePerson} />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deleteHandler={deletePerson} />
    </div>
  );
}

export default App;
