import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import City from './City.js'
import { makeStyles } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import CurrentWeather from './CurrentWeather.js'
import { Grid, Paper, CircularProgress, TextField, Typography } from '@material-ui/core'
import Forecast from './Forecast.js'

function Weather() {
  const [forecastData, setForecast] = useState({ city: { coord: {} }, list: [{ main: {}, weather: [{}], clouds: {}, wind: {}, sys: {} }] });
  const [weatherData, setWeather] = useState({ coord: {}, main: {}, weather: [{}], visibility: 0, clouds: {}, wind: {}, dt: 0, sys: {} });
  const [daily, setDaily] = useState([{ main: {}, weather: [{}], clouds: {}, wind: {}, sys: {} }]);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentId, setCurrentId] = useState(0);
  const [apiKey, setApiKey] = useState("");
  const initialMount = useRef(true);

  // fetch weather data on initial load
  useEffect(() => {
    if (initialMount.current) { // prevent on initial load
      initialMount.current = false;
    } else {
      let cancelled = false;
      var location = {};
      async function fetchWData() { // fetch data for current weather
        !cancelled && setIsLoading(true)
        try {
          const res1 = await Axios.get('https://ipapi.co/json/');
          const data = await res1.data;
          location = { lat: data.latitude, lon: data.longitude };
          const res2 = await Axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&APPID=${apiKey}`);
          !cancelled && setWeather(await res2.data)
        } catch (err) {
          console.log(err);
        } finally {
          !cancelled && setIsLoading(false)
        }
      }
      async function fetchFData() { // fetch forecast data
        !cancelled && setIsLoading(true)
        try {
          const res1 = await Axios.get('https://ipapi.co/json/');
          const data = await res1.data;
          location = { lat: data.latitude, lon: data.longitude };
          const res3 = await Axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&APPID=${apiKey}`);
          !cancelled && setForecast(await res3.data)
          !cancelled && setDaily(dailyForecast(await res3.data.list, await weatherData.dt))
        } catch (err) {
          console.log(err);
        } finally {
          !cancelled && setIsLoading(false)
        }
      }
      fetchWData()
      fetchFData()
      return () => { cancelled = true }
    }
  }, [apiKey]);


  // handle the showing of daily forecasts as a popover
  const handlePopoverOpen = (target, targetId) => {
    setAnchorEl(target);
    setCurrentId(targetId);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setCurrentId(0);
  };

  // return the daily forecast for next 5 days
  function dailyForecast(list, today) {
    let daily = [];
    for (let i = 0; i < list.length; i++) {
      let date = new Date(list[i].dt * 1000);
      if (date.getDate() > new Date(today * 1000).getDate()) {
        if (date.getHours() === 11) {
          daily.push(list[i]);
        }
      }
    }
    return daily;
  }
  const useStyles = makeStyles(theme => ({

    main: {
      minHeight: '100%',
      padding: theme.spacing(2),
      backgroundColor: blue[700],
      color: blue[50]
    },
    paper: {
      backgroundColor: blue[300],
      color: '#ffffff',
    },
    i: {
      display: 'inline-block',
      width: '100%'
    },
    input: {
      backgroundColor: blue[50]
  }
  }));

  const classes = useStyles();
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const weekdays = ['Sunday', 'Monday', 'Tuesday',
    'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return isLoading ? 
  <CircularProgress />
  :
    <Paper className={classes.main} elevation={3}>
      <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">Enter a valid free openweathermap.org API key</Typography>
      <TextField className={classes.input} onInput={e => setApiKey(e.target.value)} label="API key" variant="filled"/>
        </Grid>
        <Grid item xs={12}>
          <City city={forecastData.city} />
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <CurrentWeather
              weather={weatherData}
              options={options}
              weekdays={weekdays}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Forecast
            forecast={daily}
            options={options}
            weekdays={weekdays}
            handlePopoverClose={handlePopoverClose}
            handlePopoverOpen={handlePopoverOpen}
            anchorEl={anchorEl}
            currentId={currentId}
          />
        </Grid>
      </Grid>
    </Paper>
}

export default Weather;
