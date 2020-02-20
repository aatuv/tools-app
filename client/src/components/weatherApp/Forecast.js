import React from 'react'
import Grid from '@material-ui/core/Grid'
import ForecastDay from './ForecastDay.js'

function Forecast({ forecast, weekdays, handlePopoverClose, handlePopoverOpen, anchorEl, currentId }) {


    const returnForecast = () => {
        return forecast.map((day, index) => (
                <ForecastDay
                    key={index}
                    weather={day}
                    weekdays={weekdays}
                    handlePopoverClose={handlePopoverClose}
                    handlePopoverOpen={handlePopoverOpen}
                    anchorEl={anchorEl}
                    currentId={currentId}
                />
        ));
    }
    return (
        <Grid container spacing={1}>
            {returnForecast()}
        </Grid>
    )
}

export default Forecast;
