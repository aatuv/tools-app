import React, { useState, useEffect } from 'react'
import Weather from './components/Weather.js'
import Axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'

function App() {
  const [weatherData, setWeather] = useState({ city: { coord: {} }, list: [{ main: {}, weather: [{}], clouds: {}, wind: {}, sys: {} }] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false
    async function fetchData() {
      !cancelled && setIsLoading(true)
      try {
        const res1 = await Axios.get('https://ipinfo.io/geo?token=651bc5c2e725fb');
        const location = await res1.data;
        const res2 = await Axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${location.city},${location.country}&APPID=e6d8000c0a41bdd5ab549dc1137edec6`);
        !cancelled && setWeather(await res2.data)
      } catch (err) {
        console.log(err);
      } finally {
        !cancelled && setIsLoading(false)
      }
    }
    fetchData()
    return () => { cancelled = true }
  }, []);

  return isLoading ? <CircularProgress /> :
    <>
      <Weather weatherData={weatherData} />
    </>
}

export default App;
