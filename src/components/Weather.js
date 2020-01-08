import React from 'react'
import Forecast from './Forecast.js'
import Container from '@material-ui/core/Container'

function Weather({ weatherData }) {

    return (
        <Container maxWidth="xs">
            <Forecast city={weatherData.city} forecast={weatherData.list} />
        </Container>
    )
}

export default Weather;
