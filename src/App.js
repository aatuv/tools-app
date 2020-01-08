import React, { useState, useEffect } from 'react'
import Weather from './components/Weather.js'
import Axios from 'axios'

function App() {
  const [weatherData, setWeather] = useState({city:{coord:{}}, list:[{main:{}, weather:[{}], clouds:{}, wind:{}}]});

  useEffect(() => {
    Axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=650225&APPID=e6d8000c0a41bdd5ab549dc1137edec6`)
    .then(res => setWeather(res.data));
}, []);

  return (
    <>
    <Weather weatherData={weatherData}/>
    </>
  )
}

export default App;
