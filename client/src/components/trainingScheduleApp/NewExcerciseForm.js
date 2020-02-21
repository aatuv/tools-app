import React, { useState, useEffect } from 'react'
<<<<<<< HEAD
import shortid from 'shortid'
=======
>>>>>>> 4a72a5f55450a74e5ad0e7f15db598ddd3f12bcd
import { Modal, Paper, Button, Typography, Grid, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'


function NewExcerciseForm(props) {
    const [open, setOpen] = useState(false);
    const [selectNameOpen, setSelectNameOpen] = useState(false);
    const [selectTypeOpen, setSelectTypeOpen] = useState(false);
    const [isStrength, setIsStrength] = useState(null);
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [length, setLength] = useState('');
    const [reps, setReps] = useState('');
    const [content, setContent] = useState('');
    const [formData, setFormData] = useState({ id: "", weekday: "", name: "", length: "", content: "" })

    useEffect(() => {

    })

    // handle opening and closing the form modal
    const handleOpen = () => setOpen(true);
    const handleClose = (event) => {
        event.stopPropagation();
        setOpen(false);
    }
    // handle opening, closing and value change of the select input for excercise name
    const handleSelectNameOpen = () => setSelectNameOpen(true);
    const handleSelectNameClose = () => setSelectNameOpen(false);
    const handleNameChange = event => setName(event.target.value);
    // handle opening, closing and value change of the select input for excercise type
    const handleSelectTypeOpen = () => setSelectTypeOpen(true);
    const handleSelectTypeClose = () => setSelectTypeOpen(false);
    const handleTypeChange = event => setType(event.target.value);

    // set isStrength value to true or false when type changes
    useEffect(() => {
        if (type === '1') {
            setIsStrength(false);
        } else if (type === '2') {
            setIsStrength(true);
        } else setIsStrength(null);
    }, [type]);

<<<<<<< HEAD
    // set the state for correct field
=======
    // dont allow empty input in input fields
    useEffect(() => {
        if (length === "") {
            setLength("0");
        }
        if (reps === "") {
            setReps("0");
        }
    }, [length, reps]);

>>>>>>> 4a72a5f55450a74e5ad0e7f15db598ddd3f12bcd
    const setInput = (target, id) => {
        if (id === "sets-input") {
            setLength(target.value);
        }
        if (id === "reps-input") {
            setReps(target.value);
        }
        return target;
    }

    // check for faulty input
    const checkInputFormat = (target) => {
        let numbersRegEx = /^[0-9]+$/;
        if (!target.value.match(numbersRegEx)) {
            if (target.value.slice(0, 1) === numbersRegEx) {
                target.value = target.value.slice(0, target.value.length - 1);
            } else {
                target.value = "";
            }
        }
        setInput(target, target.id);
        return target;
    }

    const checkInput = (target) => {
        target = checkInputFormat(target);
        target = setInput(target, target.id);
        return target;
    }

    const handleSubmit = (event, form) => {
        props.handleFormData(form);
        handleClose(event);
    }

    const validForm = () => {
        if (type === "1") {
            if (name === "" || length === "" || content === "")
                return true;
            else return false;
        } else {
            if (name === "" || length === "" || reps === "")
                return true;
            else return false;
        }
    }

    // render content according to selected excercise type
    const returnForm = () => {
        return isStrength ?
            <Grid className={props.classes.dayContainer} container>
                <Grid className={props.classes.item} item xs={12}>
                    <Typography variant="body1">Name</Typography>
                    <FormControl className={props.classes.FormControl}>
                        <InputLabel id="excercise-name-label">Excercise name</InputLabel>
                        <Select
                            labelId="excercise-name-label"
                            id="excercise-name-select"
                            open={selectNameOpen}
                            onClose={handleSelectNameClose}
                            onOpen={handleSelectNameOpen}
                            value={name ? name : ''}
                            onChange={handleNameChange}
<<<<<<< HEAD
                            error={name === ""}
=======
>>>>>>> 4a72a5f55450a74e5ad0e7f15db598ddd3f12bcd
                        >
                            {
                                props.excerciseNames.map(excerciseName => (
                                    <MenuItem key={excerciseName.name} value={excerciseName.name}>{excerciseName.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid className={props.classes.item} item xs>
                    <Typography variant="body1">Number of sets</Typography>
                    <TextField
                        id="sets-input"
                        label="Sets"
<<<<<<< HEAD
                        type="tel"
=======
                        type="number"
>>>>>>> 4a72a5f55450a74e5ad0e7f15db598ddd3f12bcd
                        value={length}
                        onPaste={e => checkInput(e.target)}
                        onKeyPress={e => checkInput(e.target)}
                        onChange={e => checkInput(e.target)}
<<<<<<< HEAD
                        error={length === ""}
                        helperText={length === "" ? 'Enter the amount of sets!' : ' '}
=======
>>>>>>> 4a72a5f55450a74e5ad0e7f15db598ddd3f12bcd
                    />
                </Grid>
                <Grid className={props.classes.item} item xs>
                    <Typography variant="body1">Number of reps</Typography>
                    <TextField
                        id="reps-input"
<<<<<<< HEAD
                        label="Reps"
                        type="tel"
=======
                        label="Sets"
                        type="number"
>>>>>>> 4a72a5f55450a74e5ad0e7f15db598ddd3f12bcd
                        value={reps}
                        onPaste={e => checkInput(e.target)}
                        onKeyPress={e => checkInput(e.target)}
                        onChange={e => checkInput(e.target)}
<<<<<<< HEAD
                        error={length === ""}
                        helperText={length === "" ? 'Enter the amount of reps!' : ' '}
=======
>>>>>>> 4a72a5f55450a74e5ad0e7f15db598ddd3f12bcd
                    />
                </Grid>
            </Grid>
            :
            <Grid className={props.classes.dayContainer} container>
                <Grid className={props.classes.item} item xs={12}>
                    <Typography variant="body1">Excercise</Typography>
                    <FormControl className={props.classes.FormControl}>
                        <InputLabel id="excercise-name-label">Excercise name</InputLabel>
                        <Select
                            labelId="excercise-name-label"
                            id="excercise-name-select"
                            open={selectNameOpen}
                            onClose={handleSelectNameClose}
                            onOpen={handleSelectNameOpen}
                            value={name ? name : ''}
                            onChange={handleNameChange}
                            error={name === ""}
                        >
                            {
                                props.excerciseNames.map(excerciseName => (
                                    <MenuItem key={excerciseName.name} value={excerciseName.name}>{excerciseName.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid className={props.classes.item} item xs>
                    <Typography variant="body1">Number of sets</Typography>
                    <TextField
                        id="sets-input"
                        label="Sets"
                        type="tel"
                        value={length}
                        onPaste={e => checkInput(e.target)}
                        onKeyPress={e => checkInput(e.target)}
                        onChange={e => checkInput(e.target)}
                        error={length === ""}
                        helperText={length === "" ? 'Enter the amount of sets!' : ' '}
                    />
                </Grid>
                <Grid className={props.classes.item} item xs>
                    <Typography variant="body1">Number of reps</Typography>
                    <TextField
                        id="reps-input"
                        label="Sets"
                        type="tel"
                        value={reps}
                        onPaste={e => checkInput(e.target)}
                        onKeyPress={e => checkInput(e.target)}
                        onChange={e => checkInput(e.target)}
                        error={length === ""}
                        helperText={length === "" ? 'Enter the amount of reps!' : ' '}
                    />
                </Grid>
            </Grid>
    }
    return (
        <Button
            variant="outlined"
            className={props.classes.addExcerciseButton}
            onClick={handleOpen}
        >
            ADD EXCERCISE
            <Modal
                id="mouse-click-modal"
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={event => { handleClose(event) }}
            >
                <div className={props.classes.modal}>
                    <h2 id="simple-modal-title">New excercise</h2>
                    <Typography variant="body1">Type</Typography>
                    <FormControl className={props.classes.FormControl}>
                        <InputLabel id="excercise-type-label">Excercise type</InputLabel>
                        <Select
                            labelId="excericise-type-label"
                            id="excercise-type-select"
                            open={selectTypeOpen}
                            onClose={handleSelectTypeClose}
                            onOpen={handleSelectTypeOpen}
                            value={type}
                            onChange={handleTypeChange}
                        >
                            <MenuItem value={"1"}>Stamina</MenuItem>
                            <MenuItem value={"2"}>Strength</MenuItem>
                        </Select>
                    </FormControl>
                    {returnForm()}
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={validForm() ? true : false}
                        style={{ color: '#ffffff' }}
                        onClick={event => handleSubmit(event,
                            {
                                id: shortid.generate(),
                                weekday: props.data.weekday,
                                name: name,
                                length: length,
                                content: type === "1" ? content : reps
                            })}
                    >
                        Confirm
                    </Button>
                </div>
            </Modal>
        </Button>
    );
}
export default NewExcerciseForm;