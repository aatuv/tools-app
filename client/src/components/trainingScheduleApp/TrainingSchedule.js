import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { Paper, CircularProgress } from '@material-ui/core'
import Weekdays from './Weekdays.js'
import { makeStyles } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

function TrainingSchedule() {
    const initialForm = { form: { id: "", weekday: "", name: "", length: "", content: "" }, name: { id: "", type: "", name: "" } };
    const [excercises, setExcercises] = useState([[{ id: "", weekday: "", name: "", length: "", content: "" }]]);
    const [excerciseNames, setExcerciseNames] = useState([{ name: "", type_id: "" }]);
    const [formData, setFormData] = useState(initialForm);
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
                await Axios.post('http://localhost:5000/insertExcercise', formData.form);
                !cancelled && fetchExcercises()
            } catch (err) {
                console.log(err);
            } finally {
                !cancelled && setIsLoading(false)
            }
        }
        const insertExcerciseWithNewName = async () => {
            !cancelled && setIsLoading(true)
            try {
                await Axios.post('http://localhost:5000/insertExcerciseWithNewName', formData);
                !cancelled && fetchExcercises()
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
            if (formData.form.id !== "") {
                if (formData.form.name !== "" && !excerciseNames.includes(formData.form.name)) {
                    insertExcerciseWithNewName();
                    setFormData(initialForm);
                } else {
                    insertExcercise();
                    fetchExcerciseNames();
                    setFormData(initialForm);
                }
            } else {
                fetchExcercises();
                fetchExcerciseNames();
            }
        }
        return () => { cancelled = true }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData])

    // set new excercise form
    const handleFormData = (form) => {
        setFormData(form);
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
            left: '15%',
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
            />
        </Paper>
}

export default TrainingSchedule;
