import React from 'react';
import Person from './Person';

const Persons = ({persons, deleteHandler}) => {
    const personRows = () => {
      return persons.map(person => <Person key={person.id}
                                          person={person}
                                          deleteHandler={() => deleteHandler(person)}/>)
    };
  
    return(
      <div>
        {personRows()}
      </div>
    );
};

export default Persons;