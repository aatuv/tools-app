import React from 'react'
import { Paper, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
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
