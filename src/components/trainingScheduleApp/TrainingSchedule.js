import React, { useState } from 'react'
import { Grid, Paper } from '@material-ui/core'
import Weekdays from './Weekdays.js'
import { makeStyles } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

function TrainingSchedule() {
    const [trainingDays, setTrainingDays] = useState([
        { day: 'monday', data: {}, id: 1 },
        { day: 'tuesday', data: {}, id: 2 },
        { day: 'wednesday', data: {}, id: 3 },
        { day: 'thursday', data: {}, id: 4 },
        { day: 'friday', data: {}, id: 5 },
        { day: 'saturday', data: {}, id: 6 },
        { day: 'sunday', data: {}, id: 7 }
    ]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentId, setCurrentId] = useState(0);
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // handle the showing of daily forecasts as a popover
    const handlePopoverOpen = (target, targetId) => {
        setAnchorEl(target);
        setCurrentId(targetId);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setCurrentId(0);
    };

    const useStyles = makeStyles(theme => ({
        main: {
            padding: theme.spacing(2),
            backgroundColor: blue[700],
            color: blue[50]
        },
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100%'
        },
        paper: {
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
        },
        modal: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3)
        },
        popover: {
            pointerEvents: 'none'
        },
        card: {
            minWidth: 300,
            minHeight: 300,
            backgroundColor: blue[500],
            color: '#ffffff',
        }
    }));

    const classes = useStyles();
    return (
        <Paper className={classes.main}>
            <Weekdays
                weekdays={weekdays}
                trainingDays={trainingDays}
                anchorEl={anchorEl}
                classes={classes}
                handlePopoverOpen={handlePopoverOpen}
                handlePopoverClose={handlePopoverClose}
                currentId={currentId}
            />
        </Paper>
    )
}

export default TrainingSchedule;
