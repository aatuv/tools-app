import React, { useState } from 'react'
import { Grid, Paper } from '@material-ui/core'
import Weekdays from './Weekdays.js'
import { makeStyles } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

function TrainingSchedule() {
    const [days, setDays] = useState([{day: 'monday', data:{}, id: 1}, {day: 'tuesday', data:{}, id: 2}]);

    const useStyles = makeStyles(theme => ({
        main: {
            padding: theme.spacing(2),
            backgroundColor: blue[700],
            color: blue[50]
        },
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'stretch',
            padding: theme.spacing(2),
            minHeight: '100%',
            minWidth: '100%'
        },
        paper: {
            minWidth: '100%',
            backgroundColor: blue[300],
            color: '#ffffff',
            padding: theme.spacing(2)
        },
        item: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        typography: {
            textAlign: 'center'
        }
    }));

    const classes = useStyles();
    return (
        <Paper className={classes.main}>
        <Grid className={classes.container} container spacing={1}>
            <Weekdays days={days} classes={classes} />
        </Grid>
        </Paper>
    )
}

export default TrainingSchedule;
