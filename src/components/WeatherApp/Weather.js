import React from 'react'
import City from './City.js'
import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import CurrentWeather from './CurrentWeather.js'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Forecast from './Forecast.js'

const useStyles = makeStyles(theme => ({

    main: {
        padding: theme.spacing(2),
        backgroundColor: grey[700],
        color: grey[100]
    },
    paper: {
        backgroundColor: grey[600],
        color: grey[50]
    },
    i: {
        display: 'inline-block',
        width: '100%'
    },
}));
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

function Weather({ forecastData, weatherData, handlePopoverClose, handlePopoverOpen, anchorEl, currentId }) {
    const classes = useStyles();
    const daily = dailyForecast(forecastData.list, weatherData.dt);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const weekdays = ['Sunday', 'Monday', 'Tuesday',
        'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return (
        <div className={classes.root}>
            <Paper className={classes.main}>
                <Grid container spacing={3}>
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
        </div>
    )
}

export default Weather;
