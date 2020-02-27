import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { Paper, CircularProgress } from '@material-ui/core'
import Weekdays from './Weekdays.js'
import { makeStyles } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

function TrainingSchedule() {
    const initialForm = { form: { id: "", weekday: "", name: "", length: "", content: "" }, name: { id: "", type: "", name: "" } };
    const initialDeleteID = { id: "" };
    const [excercises, setExcercises] = useState([[{ id: "", weekday: "", name: "", length: "", content: "" }]]);
    const [excerciseNames, setExcerciseNames] = useState([{ name: "", type_id: "" }]);
    const [formData, setFormData] = useState(initialForm);
    const [deleteID, setDeleteID] = useState(initialDeleteID);
    const [isLoading, setIsLoading] = useState(false);
    const initialMount1 = useRef(true);
    const initialMount2 = useRef(true);
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // fetch schedule data on initial load. Otherwise fetch whenever new excercises are added
    useEffect(() => {
        // * define functions for api calls
        const insertExcercise = () => {
            Axios.post('http://localhost:5000/insertExcercise', formData.form)
                .then(response => {
                    console.log(response.data);
                    setFormData(initialForm);
                })
                .catch(error => {
                    console.lof(error.response.data);
                });
        }
        const insertExcerciseWithNewName = () => {
            Axios.post('http://localhost:5000/insertExcerciseWithNewName', formData)
                .then(response => {
                    console.log(response.data);
                    setFormData(initialForm);
                })
                .catch(error => {
                    console.lof(error.response.data);
                });
        }
        const fetchExcercises = () => {
            Axios.get('http://localhost:5000/schedule')
                .then(response => {
                    setExcercises(response.data);
                })
                .catch(error => {
                    console.log(error.response.data);
                });
        }
        const fetchExcerciseNames = () => {
            Axios.get('http://localhost:5000/excerciseNames')
                .then(response => {
                    setExcerciseNames(response.data);
                })
                .catch(error => {
                    console.log(error.response.data);
                })
        }
        //define functions for api calls *

        // gets called, when there's a new name to be inserted with the new excercise
        const insertNameAndFetch = async () => {
            setIsLoading(true);
            const insert = await insertExcerciseWithNewName();
            const fetche = await fetchExcercises(insert);
            const fetchn = await fetchExcerciseNames(fetche);
            setIsLoading(false);
        }

        // gets called, when there's a new excercise to be inserted
        const insertAndFetch = async () => {
            setIsLoading(true);
            const insert = await insertExcercise();
            const fetche = await fetchExcercises(insert);
            const fetchn = await fetchExcerciseNames(fetche);
            setIsLoading(false);
        }

        // gets called on initial page load
        const fetch = async () => {
            setIsLoading(true);
            const fetche = await fetchExcercises(true);
            const fetchn = await fetchExcerciseNames(fetche);
            setIsLoading(false);
        }

        // handle logic to insert and fetch data properly
        if (initialMount1.current) {
            initialMount1.current = false;
            fetch();
        } else {
            if (formData.form.id !== "") {
                if (formData.name.id !== "" && excerciseNames.includes(formData.name.name) === false) {
                    insertNameAndFetch();
                } else {
                    insertAndFetch();
                }
            } else {
                fetch();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]) // useEffect

    useEffect(() => {
        if (initialMount2.current) {
            initialMount2.current = false;
        } else {
            const deleteExcercise = () => {
                Axios.delete('http://localhost:5000/deleteExcercise', {
                    params: {
                        id: deleteID
                    }
                })
                    .then(response => {
                        console.log(response.data);
                        setDeleteID(initialDeleteID);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
            const fetchExcercises = () => {
                Axios.get('http://localhost:5000/schedule')
                    .then(response => {
                        console.log(response.data);
                        setExcercises(response.data);
                    })
                    .catch(error => {
                        console.log(error.response.data);
                    });
            }

            // gets called, when excercise is about to be deleted
            const deleteAndFetch = async () => {
                setIsLoading(true);
                const del = await deleteExcercise();
                const fetche = await fetchExcercises(del);
                setIsLoading(false);
            }
            const fetch = async () => {
                setIsLoading(true);
                const fetche = await fetchExcercises();
                setIsLoading(false);
            }
            if (deleteID.id !== "") {
                deleteAndFetch();
            } else {
                fetch();
            }
        }
    }, [deleteID]); // useEffect

    // set new excercise form
    const handleFormData = (form) => {
        setFormData(form);
    }

    const handleDeleteID = (id) => {
        setDeleteID(id);
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
        generalButton1: {
            backgroundColor: blue[300],
            color: '#ffffff'
        },
        generalButton2: {
            backgroundColor: blue[500],
            color: '#ffffff'
        },
        declineButton: {
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
                handleDeleteID={handleDeleteID}
            />
        </Paper>
}

export default TrainingSchedule;
