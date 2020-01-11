import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: grey[600],
        color: grey[50]
    }
}));
export default function ForecastDay({ weather, options, weekdays }) {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.paper}>
            <Typography variant="body2" align="center">
                {`${weekdays[new Date(weather.dt * 1000).getDay()]}`}
            </Typography>
            <Typography variant="body2" align="center">
                {new Date(weather.dt * 1000).toLocaleDateString('de', options)}
            </Typography>
            <Typography variant="body2" align="center">
                <i className={`owf owf-${weather.weather[0].id}-${weather.sys.pod} owf-3x`}></i>
            </Typography>
            <Typography variant="body2" align="center">
                {weather.weather[0].main}
            </Typography>
            <Typography variant="body1" align="center">
                {`${Math.round(weather.main.temp)}°C`}
            </Typography>
            </Paper>
        </div>
    )
}
