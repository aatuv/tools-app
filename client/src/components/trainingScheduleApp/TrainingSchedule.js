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
    const [nameData, setNameData] = useState({ id: "", type: "", name: "" })
    const [isLoading, setIsLoading] = useState(false);
    const initialMount = useRef(true);
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // fetch schedule data on initial load. Otherwise fetch whenever new excercises are added
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
        const insertExcercise = async () => {
            !cancelled && setIsLoading(true)
            try {
                await Axios.post('http://localhost:5000/insertExcercise', formData);
                !cancelled && fetchExcercises()
            } catch (err) {
                console.log(err);
            } finally {
                !cancelled && setIsLoading(false)
            }
        }
        const insertExcerciseName = async () => {
            !cancelled && setIsLoading(true)
            try {
                await Axios.post('http://localhost:5000/insertName', nameData);
                !cancelled && fetchExcerciseNames()
            } catch (err) {
                console.log(err);
            } finally {
                !cancelled && setIsLoading(false)
            }
        }
        if (initialMount.current) {
            initialMount.current = false;
            fetchExcercises();
            fetchExcerciseNames();
        } else {
            cancelled = false;
            if (formData.id !== "") {
                insertExcercise();
            }
            if (nameData.id !== "") {
                insertExcerciseName();
            }
        }
        return () => { cancelled = true }
    }, [formData, nameData])

    // set new excercise form
    const handleFormData = (form) => {
        setFormData(form);
    }
    // set new excercise name
    const handleNameData = (form) => {
        setNameData(form);
    }

    // css properties for the components
    const useStyles = makeStyles(theme => ({
        main: {
            padding: theme.spacing(2),
            backgroundColor: blue[700],
            color: blue[50]
        },
        container: {
            justifyContent: 'center',
            alignItems: 'center',
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
        newNameModal: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            position: 'absolute',
            top: '40%',
            left: '35%',
            boxShadow: theme.shadows[5],
            backgroundColor: blue[500],
            color: '#ffffff',
            padding: theme.spacing(4, 4, 4)
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
                handleNameData={handleNameData}
            />
        </Paper>
}

export default TrainingSchedule;
