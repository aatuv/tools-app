import React from 'react'
import { Grid, Typography, Paper } from '@material-ui/core'
import Day from './TrainingDay.js'

function Weekdays(props) {

    const weekdays = () => {
        return props.weekdays.map(weekday => (
            <Grid item xs>
                <Paper className={props.classes.paper}>
                    <Typography key={weekday} variant="h5">{weekday}</Typography>
                </Paper>
            </Grid>
        ))
    }
    const trainingWeek = () => {
        return props.trainingDays.map(trainingDay => (
            <Grid item xs>
                <Day
                    data={trainingDay}
                    key={trainingDay.id}
                    classes={props.classes}
                    anchorEl={props.anchorEl}
                    handlePopoverOpen={props.handlePopoverOpen}
                    handlePopoverClose={props.handlePopoverClose}
                    currentId={props.currentId}
                />
            </Grid>
        ));
    }
    return (
        <>
            <Grid className={props.classes.container} container spacing={2}>
                {weekdays()}
            </Grid>
            <Grid className={props.classes.container} container spacing={2}>
                {trainingWeek()}
            </Grid>
        </>
    )
}


export default Weekdays;
