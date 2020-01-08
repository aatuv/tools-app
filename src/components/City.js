import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import { Typography } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        flexGrow: 1,
    },
}));

function City({ city, classes }) {
    classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <Typography gutterBottom variant="h5" align="center">
                        {`${city.name}, ${city.country}`}
                    </Typography>
                    <Grid
                        container xs={12}
                        direction="row"
                        justify="center">
                        <MyLocationIcon style={{ fontSize: 20 }} />
                        <Typography gutterBottom variant="body2" color="#e0e0e0" align="center">
                            {`${city.coord.lat}, ${city.coord.lon}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default City;
