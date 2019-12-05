import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');

  const loadCountriesHook = () => {
      axios.get('https://restcountries.eu/rest/v2/all')
          .then(res => {
              console.log(res.data);
              setCountries(res.data);
          });
  };

  useEffect(loadCountriesHook, []);

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(searchFilter.toLowerCase()));

  const countryRows = () => {
    if (countriesToShow.length > 10){
      return (<p>Too many matches, specify another filter</p>);
    }

    // Only one match, show additional data
    if (countriesToShow.length === 1){
      const country = countriesToShow[0]; // Array has exactly one element, so we can extract it from the array

      return (
        <div>
          <h1>{country.name}</h1>
          <p>Capital {country.capital}</p>
          <p>Population {country.population}</p>

          <h2>Languages</h2>
          <ul>
              {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
          </ul>

          <img src={country.flag} width='240' height='240' />
        </div>
      );
    }

    return countriesToShow.map(country => <p key={country.name}>{country.name}</p>);
  };

  const filterChangeHandler = (event) => {
    setSearchFilter(event.target.value);
  };

  return (
    <div>
      <div>
          find countries: <input value={searchFilter} onChange={filterChangeHandler} />
      </div>
      {countryRows()}
    </div>
  );
}

export default App;
