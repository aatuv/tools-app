import React from 'react'
import { Typography, Paper, Popover, Card, CardContent, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: blue[300],
        color: '#ffffff',
    },
    popover: {
        pointerEvents: 'none'
    },
    card: {
        backgroundColor: blue[500],
        color: '#ffffff',
    }
}));
export default function ForecastDay({ weather, options, weekdays, handlePopoverClose, handlePopoverOpen, anchorEl, currentId }) {

    const classes = useStyles();

    const handlePopOpen = (event) => {
        handlePopoverOpen(event.target, weather.dt);
    }
    const handleOpen = () => {
        if (currentId === weather.dt) {
            return true;
        } else return false;
    }
    const open = handleOpen();

    return (
        <Grid item xs>
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
                            direction="column"
                            justify="center"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid item xs>
                                <Typography variant="h6" align="center">
                                    {`${weekdays[new Date(weather.dt * 1000).getDay()]}`}
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="subtitle1" align="center">
                                    {new Date(weather.dt * 1000).toLocaleDateString('de', options)}
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="subtitle1" align="center">
                                    <i className={`owf owf-${weather.weather[0].id}-${weather.sys.pod} owf-5x`}></i>
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="subtitle1" align="center">
                                    {weather.weather[0].description}
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h6" align="center">
                                    {`${Math.round(weather.main.temp)}°C`}
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography gutterBottom variant="body1" align="center" >
                                    {`Feels like ${Math.round(weather.main.feels_like)}°C`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Popover>
        </Grid>
    )
}
