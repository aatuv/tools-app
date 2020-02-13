import React from 'react'
import { Grid, Typography, Paper } from '@material-ui/core'
import Day from './TrainingDay.js'

function Weekdays(props) {

    const returnSchedule = (excercises) => {
        let dailySchedule = [];
        for (let i = 0; i < props.weekdays.length; i++) {
            for (let j = 0; j < excercises.length; j++) {
                if (excercises[j].weekday === props.weekdays[i]) {
                    dailySchedule.push(excercises[j]);
                }
            }
        }
        return dailySchedule;
    }
    const schedule = returnSchedule(props.excercises);
    const trainingWeek = () => {
        return schedule.map(trainingDay => (
            <Grid item xs key={trainingDay.id}>
                <Day
                    data={trainingDay}
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
                {trainingWeek()}
            </Grid>
        </>
    )
}


export default Weekdays;
