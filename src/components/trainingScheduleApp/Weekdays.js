import React from 'react'
import { Grid } from '@material-ui/core'
import Day from './Day.js'

function Weekdays(props) {
    const week = () => {
        return props.days.map(day => (
            <Grid item xs>
                <Day data={day} key={day.id} classes={props.classes} />
            </Grid>
        ));
    }
    return (
        <Grid className={props.classes.container} container spacing={1}>
            {week()}
        </Grid>
    )
}


export default Weekdays;
