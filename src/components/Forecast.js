import React from 'react'
import Grid from '@material-ui/core/Grid'
import ForecastDay from './ForecastDay.js'

function Forecast({forecast, weekdays}) {
    return (
        <Grid container spacing={1} alignItems="stretch">
            {forecast.map(day => (
                <Grid item xs key={day.dt} style={{heigth: '100%'}}>
                    <ForecastDay weather={day} weekdays={weekdays} />
                </Grid>
            ))}
        </Grid>
    )
}

export default Forecast;
