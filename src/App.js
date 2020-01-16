import React, { useState, useEffect, Fragment } from 'react'
import Weather from './components/weatherApp/Weather.js'
import Timer from './components/timerApp/Timer.js'
import Axios from 'axios'
import { Grid, CircularProgress } from '@material-ui/core'

function App() {
  const [forecastData, setForecast] = useState({ city: { coord: {} }, list: [{ main: {}, weather: [{}], clouds: {}, wind: {}, sys: {} }] });
  const [weatherData, setWeather] = useState({ coord: {}, main: {}, weather: [{}], visibility: 0, clouds: {}, wind: {}, dt: 0, sys: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    let cancelled = false;
    var location = {};
    async function fetchWData() {
      !cancelled && setIsLoading(true)
      try {
        const res1 = await Axios.get('https://ipapi.co/json/');
        const data = await res1.data;
        location = { lat: data.latitude, lon: data.longitude };
        const res2 = await Axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&APPID=e6d8000c0a41bdd5ab549dc1137edec6`);
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
        const res1 = await Axios.get('https://ipapi.co/json/');
        const data = await res1.data;
        location = { lat: data.latitude, lon: data.longitude };
        const res3 = await Axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&APPID=e6d8000c0a41bdd5ab549dc1137edec6`);
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


  const handlePopoverOpen = (target, targetId) => {
    setAnchorEl(target);
    setCurrentId(targetId);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setCurrentId(0);
  };

  function gridRow() {
    return (
      <Fragment>
        <Grid item xs={4}>
          <Weather
            forecastData={forecastData}
            weatherData={weatherData}
            handlePopoverClose={handlePopoverClose}
            handlePopoverOpen={handlePopoverOpen}
            anchorEl={anchorEl}
            currentId={currentId}
          />
        </Grid>
        <Grid item xs={4}>
          <Timer />
        </Grid>
        <Grid item xs={4}>
        </Grid>
      </Fragment>
    )
  }

  return isLoading ? <CircularProgress /> :
    <Grid container spacing={1}>
      <Grid container item xs={12} spacing={1}>
        {gridRow()}
      </Grid>
      <Grid container item xs={12} spacing={1}>
      </Grid>
    </Grid>
}

export default App;
