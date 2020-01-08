import React from 'react'
import City from './City.js'
import Forecast from './Forecast.js'
import Box from '@material-ui/core/Box'

function Weather({ weatherData }) {

    return (
        <div style={{ width: '100%'}}>
            <Box display="flex" p={1} bgcolor="#03a9f4">
                <City city={weatherData.city} />
                <Forecast forecast={weatherData.list} />
            </Box>
        </div>
    )
}

export default Weather;
