import React from 'react'
import { Paper, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import MyLocationIcon from '@material-ui/icons/MyLocation'


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
        backgroundColor: blue[300],
        color: '#ffffff',
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
                    <Typography gutterBottom variant="h4" align="center">
                        {`${city.name}, ${city.country}`}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography gutterBottom variant="h6" align="center" >
                        <MyLocationIcon style={{ fontSize: 10, align: 'center' }} />
                        {` ${city.coord.lat}, ${city.coord.lon}`}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default City;
