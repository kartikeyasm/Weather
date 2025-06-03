import React, { useState } from 'react';

function Searchbar({ weatherData }) {
  const [location, setLocation] = useState('');

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const APIBase = process.env.REACT_APP_API_BASE_URL || "f2f43a7d0f74d4c23683e77418e885fc";
  const APIKey = process.env.REACT_APP_API_KEY || "https://api.openweathermap.org/data/2.5/";
  console.log(`${APIBase}weather?q=${location}&units=metric&APPID=${APIKey}`);

  const search = (e) => {
    if (e.key === 'Enter') {
      fetch(`${APIBase}weather?q=${location}&units=metric&APPID=${APIKey}`)
        .then((response) => {
            if(!response.ok){
                throw new Error("City not found!");
            }
            return response.json()
        })
        .then((response) => {
          weatherData((prev) => response);
          setLocation('');
        })
        .catch((e) => {
          console.error('Error in fetching data: ', e);
          alert("Can't fetch data, try again!");
        });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-6 rounded-xl text-gray-800 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Weather App</h1>
        <div className="relative">
          <label htmlFor='location' className='sr-only'>Search for a city</label>
          <input
            id='location'
            type="text"
            placeholder="Search for a city..."
            onChange={handleChange}
            value={location}
            onKeyDown={search}
            className="w-full px-6 py-3 text-gray-700 bg-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 transition placeholder-gray-400"
          />
          <div className="absolute top-1/2 right-5 transform -translate-y-1/2">
            <span className="text-2xl text-indigo-500">🔍</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
