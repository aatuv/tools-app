import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import { Typography } from '@material-ui/core'



function City({ city }) {
    return (
        <>
            <Typography gutterBottom variant="h5" align="center">
                {`${city.name}, ${city.country}`}
            </Typography>
            <Typography gutterBottom variant="body2" align="center" >
                <MyLocationIcon style={{ fontSize: 10, align: 'center' }} />
                {` ${city.coord.lat}, ${city.coord.lon}`}
            </Typography>
        </>
    )
}

export default City;
