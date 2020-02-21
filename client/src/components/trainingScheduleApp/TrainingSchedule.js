import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { Grid, Paper, CircularProgress } from '@material-ui/core'
import Weekdays from './Weekdays.js'
import { makeStyles } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

function TrainingSchedule() {
    const [excercises, setExcercises] = useState([[{ id: "", weekday: "", name: "", length: "", content: "" }]]);
    const [excerciseNames, setExcerciseNames] = useState([{ name: "", type_id: "" }]);
    const [formData, setFormData] = useState({ id: "", weekday: "", name: "", length: "", content: "" })
    const [isLoading, setIsLoading] = useState(false);
    const initialMount = useRef(true);
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

    useEffect(() => {
        if (initialMount.current) {
            initialMount.current = false;
        } else {
            Axios.post('http://localhost:5000/insertExcercise', formData)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [formData])

    const handleFormData = (form) => {
        setFormData(form);
    }
    const useStyles = makeStyles(theme => ({
        main: {
            minHeight: '100%',
            padding: theme.spacing(2),
            backgroundColor: blue[700],
            color: blue[50]
        },
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100%'
        },
        dayContainer: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch'
        },
        paper: {
            backgroundColor: blue[300],
            color: '#ffffff',
            padding: theme.spacing(2)
        },
        modal: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'stretch',
            position: 'absolute',
            top: '20%',
            left: '35%',
            minWidth: '20%',
            minHeight: '20%',
            boxShadow: theme.shadows[5],
            backgroundColor: blue[500],
            color: '#ffffff',
            padding: theme.spacing(4, 4, 4),
        },
        dayPaper: {
            backgroundColor: blue[300],
            color: '#ffffff',
            minWidth: '10vh',
            padding: theme.spacing(1)
        },
        addExcerciseButton: {
            backgroundColor: '#4caf50',
            color: '#ffffff'
        },
        editExcerciseButton: {
            backgroundColor: blue[500],
            color: '#ffffff'
        },
        deleteExcerciseButton: {
            backgroundColor: '#f44336',
            color: '#ffffff'
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: '20%'
        },
        item: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center'
        },
        typography: {
            textAlign: 'center'
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
                classes={classes}
                handleFormData={handleFormData}
            />
        </Paper>
}

export default TrainingSchedule;
