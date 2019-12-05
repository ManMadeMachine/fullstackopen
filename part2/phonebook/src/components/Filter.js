import React from 'react';

const Filter = (props) => {
    const {changeHandler, searchFilter} = props;
    return (
      <div>
        filter shown with <input onChange={changeHandler} value={searchFilter}/>
      </div>
    );
};

export default Filter;