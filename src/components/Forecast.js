import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ScheduleIcon from '@material-ui/icons/Schedule'
import LooksIcon from '@material-ui/icons/Looks'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function Forecast({ forecast }) {

    const classes = useStyles();
    const ABS_ZERO = 273.15;

    return (
        <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ScheduleIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={new Date(forecast[0].dt * 1000).toUTCString()} secondary="Time" />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <LooksIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={forecast[0].weather[0].main} secondary={forecast[0].weather[0].description} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <EqualizerIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={(forecast[0].main.temp - ABS_ZERO).toFixed(2)} secondary="°C" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <EqualizerIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={(forecast[0].main.feels_like - ABS_ZERO).toFixed(2)} secondary="°C" />
            </ListItem>
        </List>

    )
}

export default Forecast;
