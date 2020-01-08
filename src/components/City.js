import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import FlagIcon from '@material-ui/icons/Flag'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import GpsFixedIcon from '@material-ui/icons/GpsFixed'
import Divider from '@material-ui/core/Divider'


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function City({ city }) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <FlagIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={city.country} secondary="Country" />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <LocationCityIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={city.name} secondary="City name" />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <GpsFixedIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={city.coord.lat} secondary="Latitude" />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <GpsFixedIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={city.coord.lon} secondary="Longitude" />
            </ListItem>
        </List>
    )
}

export default City;
