import React, { useState, useEffect } from 'react';
import './CountriesSearch.css';

const CountriesSearch = ()=> {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(()=> {
        fetchCountries();
    },[]);

    const fetchCountries = ()=> {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.error('Error fetching countries:', error));
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="CountriesSearch">
            <h1>Country Search</h1>
            <input 
                type="text"
                placeholder='Search for a country...'
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="cards">
                {filteredCountries.map(country => (
                    <div className="countryCard" key={country.cca2}>
                        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
                        <p>{country.name.common}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default CountriesSearch;