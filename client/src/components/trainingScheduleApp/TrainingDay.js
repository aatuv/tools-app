import React, { useState } from 'react'
import { Typography, Grid, Paper } from '@material-ui/core'
import DayModal from './DayModal.js'

function TrainingDay(props) {

    // show schedule for the day as a preview
    const scheduleOfTheDay = () => {
        return props.data.list.map((row) => (
            <Grid item xs key={row.id}>
                <Paper className={props.classes.dayPaper} elevation={3}>
                    <Typography variant="h6">{row.name}, {row.length}x{row.content}</Typography>
                </Paper>
            </Grid>
        ))
    };

    return (
        <Paper
            className={props.classes.paper}
            onClick={props.handleModalOpen}
        >
            <Grid className={props.classes.dayContainer} container spacing={1} >
                <Grid item xs>
                    <Typography variant="h5">{props.data.weekday}</Typography>
                </Grid>
                {scheduleOfTheDay()}
            </Grid>
            <DayModal
                data={props.data}
                classes={props.classes}
                excerciseNames={props.excerciseNames}
                handleFormData={props.handleFormData}
            />
        </Paper>
    )
}

export default TrainingDay;
