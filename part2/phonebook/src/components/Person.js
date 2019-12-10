import React from 'react';

const Person = ({person, deleteHandler}) => {
    return(
      <div>
        <p>{person.name} {person.number}</p>
        <button onClick={deleteHandler}>delete</button>
      </div>
    );
};

export default Person;