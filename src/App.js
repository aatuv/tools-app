import React, { useState, useEffect } from 'react'
import Weather from './components/Weather.js'
import Axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'

function App() {
  const [forecastData, setForecast] = useState({ city: { coord: {} }, list: [{ main: {}, weather: [{}], clouds: {}, wind: {}, sys: {} }] });
  const [weatherData, setWeather] = useState({coord: {}, main: {}, weather: [{}], visibility: 0, clouds: {}, wind: {}, dt: 0, sys: {} });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false
    async function fetchWData() {
      !cancelled && setIsLoading(true)
      try {
        const res1 = await Axios.get('https://ipinfo.io/geo?token=651bc5c2e725fb');
        const location = await res1.data;
        const res2 = await Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location.city},${location.country}&units=metric&APPID=e6d8000c0a41bdd5ab549dc1137edec6`);
        !cancelled && setWeather(await res2.data)
      } catch (err) {
        console.log(err);
      } finally {
        !cancelled && setIsLoading(false)
      }
    }
    async function fetchFData() {
      !cancelled && setIsLoading(true)
      try {
        const res1 = await Axios.get('https://ipinfo.io/geo?token=651bc5c2e725fb');
        const location = await res1.data;
        const res3 = await Axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${location.city},${location.country}&units=metric&APPID=e6d8000c0a41bdd5ab549dc1137edec6`);
        !cancelled && setForecast(await res3.data)
      } catch (err) {
        console.log(err);
      } finally {
        !cancelled && setIsLoading(false)
      }
    }
    fetchWData()
    fetchFData()
    return () => { cancelled = true }
  }, []);

  return isLoading ? <CircularProgress /> :
    <Container fluid maxWidth="sm">
      <Weather forecastData={forecastData} weatherData={weatherData} />
    </Container>
}

export default App;
