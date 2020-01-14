import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Popover from '@material-ui/core/Popover'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: grey[600],
        color: grey[50]
    },
    popover: {
        pointerEvents: 'none'
    },
    card: {
        minWidth: 300,
        minHeight: 300,
        backgroundColor: grey[800],
        color: grey[100]
      }
}));
export default function ForecastDay({ weather, options, weekdays, handlePopoverClose, handlePopoverOpen, anchorEl, currentId }) {

    const classes = useStyles();

    function handlePopOpen(event) {
        handlePopoverOpen(event.target, weather.dt);
    }
    function handleOpen() {
        if (currentId === weather.dt) {
            return true;
        } else return false;
    }
    const open = handleOpen();
    
    return (
        <div>
            <Paper
                className={classes.paper}
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopOpen}
                onMouseLeave={handlePopoverClose}
            >
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
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                open={open}
                anchorEl={anchorEl}
                currentId={currentId}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                onClose={handlePopoverClose}
                keepMounted
            >
                <Card className={classes.card}>
                    <CardContent>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={3}
                        >
                            <Grid item xs={6}>
                                <Typography variant="h6" align="center">
                                    {`${weekdays[new Date(weather.dt * 1000).getDay()]}`}
                                </Typography>
                                <Typography variant="subtitle1" align="center">
                                    {new Date(weather.dt * 1000).toLocaleDateString('de', options)}
                                </Typography>
                                <Typography variant="subtitle1" align="center">
                                    <i className={`owf owf-${weather.weather[0].id}-${weather.sys.pod} owf-5x`}></i>
                                </Typography>
                                <Typography variant="subtitle1" align="center">
                                    {weather.weather[0].description}
                                </Typography>
                                <Typography variant="h6" align="center">
                                    {`${weather.main.temp}°C`}
                                </Typography>
                                <Typography gutterBottom variant="body1" align="center" >
                                    {`Feels like ${weather.main.feels_like}°C`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Popover>
        </div>
    )
}
