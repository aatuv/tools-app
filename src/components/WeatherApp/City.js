import React from 'react'
import Fab from '@material-ui/core/Fab'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import NavigationIcon from '@material-ui/icons/Navigation'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import { Typography } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    icon: {
        fontSize: 20
    },
    paper: {
        padding: theme.spacing(2),
        backgroundColor: grey[600],
        color: grey[50]
    }
}));


function City({ city }) {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Grid 
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            spacing={2}
            >
                <Grid item xs={12}>
                    <Typography gutterBottom variant="h5" align="center">
                        {`${city.name}, ${city.country}`}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography gutterBottom variant="body2" align="center" >
                        <MyLocationIcon style={{ fontSize: 10, align: 'center' }} />
                        {` ${city.coord.lat}, ${city.coord.lon}`}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default City;
