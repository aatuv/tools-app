import React from 'react'
import { Typography, Paper } from '@material-ui/core'

function Day(props) {
    return (
        <Paper className={props.classes.paper}>
        <Typography>{props.data.day}</Typography>
        </Paper>
    )
}

export default Day;
