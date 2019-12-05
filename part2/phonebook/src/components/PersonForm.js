import React from 'react';

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

export default PersonForm;