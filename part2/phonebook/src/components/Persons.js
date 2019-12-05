import React from 'react';
import Person from './Person';

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

export default Persons;