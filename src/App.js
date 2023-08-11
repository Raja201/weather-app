import React from 'react'
import { useState } from 'react'
import './App.css'
const api = {
  key:"380df0cb7c2ac0a6f8bd3912c2962425",
  base: "https://api.openweathermap.org/data/2.5/"
}
const App = () => {
  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState({});
  const search = evt =>{
    if(evt.key === "Enter")
    {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => 
          {
            
            setWeather(result);
            setQuery('');
            console.log(result);
          });
    }
  }
  const dateBuilder = (d) =>{
      let months = ["January","February","March","April",
      "May","June","July","August","Septrmber","October",
      "November","December"];

      let days = ["Sunday","Monday","Tuesday",
      "Wednesday","Thursday","Friday","Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`

  }
  return (
    <div className='app'>
      <div className={(typeof weather.main !="undefined") ? ((weather.main.temp>16)?'warm':'cool'): 'app'}>
      <main>
        <div className='search-box'>
          <input 
          type="text"
          className="search-bar"
          placeholder='search..'
          onChange={e =>setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          ></input>
        </div>
        {(typeof weather.main != "undefined")?(

          <div>
                    <div className='location-box'>
          <div className='location'>{weather.name},{weather.sys.country}</div>
          <div className='date'>{dateBuilder(new Date())}</div>
        </div>
        <div className='weather-box'>
          <div className='temp'>
            {Math.round(weather.main.temp)}°C
          </div>
          <div className='weather'>{weather.weather[0].main}</div>
        </div>
          </div>
        )

        :('')}
      
      </main>
      </div>
    </div>
  )
}

export default App