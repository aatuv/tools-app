import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Grid, Paper, CircularProgress } from '@material-ui/core'
import Weekdays from './Weekdays.js'
import { makeStyles } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

function TrainingSchedule() {
    const [excercises, setExcercises] = useState([{id:"", weekday:"", name: "", length: "", content: ""}]);
    const [excerciseNames, setExcerciseNames] = useState([{name: "", type_id: ""}]);
    const [isLoading, setIsLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentId, setCurrentId] = useState(0);
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


    useEffect(() => {
        let cancelled = false;
        const fetchExcercises = async () => {
            !cancelled && setIsLoading(true)
            try {
                const response = await Axios.get('http://localhost:5000/schedule');
                !cancelled && setExcercises(await response.data)
            } catch (err) {
                console.log(err);
            } finally {
                !cancelled && setIsLoading(false)
            }
        }
        const fetchExcerciseNames = async () => {
            !cancelled && setIsLoading(true)
            try {
                const response = await Axios.get('http://localhost:5000/excerciseNames');
                !cancelled && setExcerciseNames(await response.data)
            } catch (err) {
                console.log(err);
            } finally {
                !cancelled && setIsLoading(false)
            }
        }
        fetchExcercises()
        fetchExcerciseNames()
        return () => { cancelled = true }
    }, []);
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
    return isLoading ? <CircularProgress />
        : <Paper className={classes.main}>
            <Weekdays
                weekdays={weekdays}
                excercises={excercises}
                excerciseNames={excerciseNames}
                anchorEl={anchorEl}
                classes={classes}
                handlePopoverOpen={handlePopoverOpen}
                handlePopoverClose={handlePopoverClose}
                currentId={currentId}
            />
        </Paper>
}

export default TrainingSchedule;
