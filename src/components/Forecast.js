import React from 'react'
import City from './City.js'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import grey from '@material-ui/core/colors/grey'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 450,
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
        backgroundColor: grey[600],
        color: grey[100]
    },
    i: {
        margin: 'auto',
        display: 'block',
        display: 'inline-block',
        width: '100%'
    },
}));

function Forecast({ city, forecast }) {

    const classes = useStyles();
    const ABS_ZERO = 273.15;
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    justify="center"
                    alignItems="center"
                    margin="auto"
                >
                    <Grid item xs={6}>
                        <City city={city} classes={classes} />
                        <Typography gutterBottom variant="subtitle1" align="center">
                            {new Date(forecast[0].dt * 1000).toLocaleString('de', options)}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" align="center">
                            <i className={`owf owf-${forecast[0].weather[0].id}-${forecast[0].sys.pod} owf-5x`}></i>
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" align="center">
                            {forecast[0].weather[0].description}
                        </Typography>
                        <Typography gutterBottom variant="h3" align="center">
                            {`${(forecast[0].main.temp - ABS_ZERO).toFixed(2)}°C`}
                        </Typography>
                        <Typography gutterBottom variant="body2" align="center">
                            {`Feels like ${(forecast[0].main.feels_like - ABS_ZERO).toFixed(2)}°C`}
                        </Typography>
                        <Typography gutterBottom variant="body2" align="center">
                            {`Wind speed: ${forecast[0].wind.speed} m/s`}
                        </Typography>
                        <Typography gutterBottom variant="body2" align="center">
                            {`Humidity: ${forecast[0].main.humidity} %`}
                        </Typography>
                        <Typography gutterBottom variant="body2" align="center">
                            {`${forecast[0].main.pressure} hPa`}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default Forecast;
