import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import InvertColorsIcon from '@material-ui/icons/InvertColors'

function dayOrNight(dt, rise, set) {
    if (dt >= rise && dt <= set) {
        return 'd';
    }
    return 'n';
}

function windDirection(deg) {
    switch (true) {
        case (deg > 348.75 || deg < 11.25):
            return 'N';
        case (deg > 11.25 && deg < 33.75):
            return 'NNE';
        case (deg > 33.75 && deg < 56.25):
            return 'NE';
        case (deg > 56.25 && deg < 78.75):
            return 'ENE';
        case (deg > 78.75 && deg < 101.25):
            return 'E';
        case (deg > 101.25 && deg < 123.75):
            return 'ESE';
        case (deg > 123.75 && deg < 146.25):
            return 'SE';
        case (deg > 146.25 && deg < 168.75):
            return 'SSE';
        case (deg > 168.75 && deg < 191.25):
            return 'S';
        case (deg > 191.25 && deg < 213.75):
            return 'SSW';
        case (deg > 213.75 && deg < 236.25):
            return 'SW';
        case (deg > 236.25 && deg < 258.75):
            return 'WSW';
        case (deg > 258.75 && deg < 281.25):
            return 'W';
        case (deg > 281.25 && deg < 293.75):
            return 'WNW';
        case (deg > 293.75 && deg < 326.25):
            return 'NW';
        case (deg > 326.25 && deg < 348.75):
            return 'NNW';
    }
}

function Forecast({ weather, options, weekdays }) {

    const timeOfDay = dayOrNight(weather.dt, weather.sys.sunrise, weather.sys.sunset);

    return (
        <Grid 
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
        >
            <Grid item xs={6}>
            <Typography variant="h5" align="center">
                {`${weekdays[new Date(weather.dt * 1000).getDay()]}`}
            </Typography>
            <Typography variant="subtitle1" align="center">
                {new Date(weather.dt * 1000).toLocaleString('de', options)}
            </Typography>
            <Typography variant="subtitle1" align="center">
                <i className={`owf owf-${weather.weather[0].id}-${timeOfDay} owf-5x`}></i>
            </Typography>
            <Typography variant="subtitle1" align="center">
                {weather.weather[0].description}
            </Typography>
            <Typography variant="h3" align="center">
                {`${weather.main.temp}°C`}
            </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography gutterBottom variant="body1" >
                {`Feels like ${weather.main.feels_like}°C`}
            </Typography>
            <Typography gutterBottom variant="body1" >
                <i className={`owf owf-905 owf-lg`}></i>
                {` ${windDirection(weather.wind.deg)} ${weather.wind.speed} m/s`}
            </Typography>
            <Typography gutterBottom variant="body1" >
                <InvertColorsIcon style={{ fontSize: 14 }} />
                {` ${weather.main.humidity} %`}
            </Typography>
            <Typography gutterBottom variant="body1" >
                {`${weather.main.pressure} hPa`}
            </Typography>
            </Grid>
        </Grid>
    )
}

export default Forecast;
