import React, { useState, useRef } from 'react'
import shortid from 'shortid'
import { Modal, Button, Typography, Grid, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'

function NewExcerciseForm(props) {
    const [open, setOpen] = useState(false);
    const [selectNameOpen, setSelectNameOpen] = useState(false);
    const [selectTypeOpen, setSelectTypeOpen] = useState(false);
    const [selectIntensityOpen, setSelectIntensityOpen] = useState(false);
    const [nameInputOpen, setNameInputOpen] = useState(false);
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [length, setLength] = useState('');
    const [reps, setReps] = useState('');
    const [intensity, setIntensity] = useState('');
    const [newName, setNewName] = useState('');
    const [nameInput, setNameInput] = useState('');


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
    const handleTypeChange = event => {
        setType(event.target.value);
        setName('');
        setLength('');
        setReps('');
        setIntensity('');
    }
    // handle opening, closing and value change of the select input for intensity level
    const handleSelectIntensityOpen = () => setSelectIntensityOpen(true);
    const handleSelectIntensityClose = () => setSelectIntensityOpen(false);
    const handleIntensityChange = event => setIntensity(event.target.value);

    const handleNameInputOpen = (event) => {
        event.stopPropagation();
        setNameInputOpen(true);
    }
    const handleNameInputClose = () => {
        setNewName("");
        setNameInputOpen(false);
    }
    const handleNameInputChange = event => setNameInput(event.target.value);
    const handleNameInputError = () => {
        if (nameInput === "") return true;
        if (props.excerciseNames.includes(nameInput)) return true;
        return false;
    }
    const handleNameInputSubmit = (value) => {
        setNewName(value);
        setNameInputOpen(false);
    }


    // set the state for correct field
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
        setNewName("");
        handleClose(event);
    }

    // make sure all fields have valid data before submitting
    const validForm = () => {
        if (type === "1") {
            if (name === "" || length === "" || intensity === "")
                return true;
            else return false;
        } else {
            if (name === "" || length === "" || reps === "")
                return true;
            else return false;
        }
    }

    const validNameInput = () => {
        if (nameInput !== "" && props.excerciseNames.includes(nameInput) === false)
            return true;
        else return false;
    }

    // show content based on chosen type 
    const returnForm = () => {
        return type === '' ? null
            :
            staminaOrStrength();
    }
    // render content according to selected excercise type
    const staminaOrStrength = () => {
        return type === "2" ? // TYPE = STRENGTH
            <Grid className={props.classes.dayContainer} container>
                <Grid className={props.classes.item} item xs={12}>
                    <Typography variant="body1">Name</Typography>
                    {
                        nameInputOpen ?
                            <div>
                                <TextField
                                    id="name-input"
                                    label="Name"
                                    type="text"
                                    value={nameInput}
                                    onChange={event => handleNameInputChange(event)}
                                    error={handleNameInputError ? true : false}
                                    helperText={nameInput === "" ? 'Enter excercise name!' : ''}
                                />
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    style={{ color: '#ffffff' }}
                                    onClick={handleNameInputClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    disabled={validNameInput() ? false : true}
                                    style={{ color: '#ffffff' }}
                                    onClick={() => handleNameInputSubmit(nameInput)}
                                >
                                    Confirm
                                </Button>
                            </div>
                            : null
                    }
                    <Button
                        variant="outlined"
                        className={props.classes.generalButton1}
                        onClick={handleNameInputOpen}
                    >
                        ADD NEW EXCERCISE NAME
                    </Button>
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
                                newName !== "" ? <MenuItem value={newName}>{newName}</MenuItem>
                                    : null
                            }
                            {
                                props.excerciseNames.map(excerciseName => {
                                    if (excerciseName.type_id === "2") {
                                        return (
                                            <MenuItem key={excerciseName.name} value={excerciseName.name}>{excerciseName.name}</MenuItem>
                                        )
                                    }
                                    else return null;
                                })
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
                        label="Reps"
                        type="tel"
                        value={reps}
                        onPaste={e => checkInput(e.target)}
                        onKeyPress={e => checkInput(e.target)}
                        onChange={e => checkInput(e.target)}
                        error={reps === ""}
                        helperText={reps === "" ? 'Enter the amount of reps!' : ' '}
                    />
                </Grid>
            </Grid>
            : // TYPE = STAMINA
            <Grid className={props.classes.dayContainer} container>
                <Grid className={props.classes.item} item xs={12}>
                    <Typography variant="body1">Name</Typography>
                    {
                        nameInputOpen ?
                            <div>
                                <TextField
                                    id="name-input"
                                    label="Name"
                                    type="text"
                                    value={nameInput}
                                    onChange={event => handleNameInputChange(event)}
                                    error={handleNameInputError ? true : false}
                                    helperText={nameInput === "" ? 'Enter excercise name!' : ''}
                                />
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    style={{ color: '#ffffff' }}
                                    onClick={handleNameInputClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    disabled={validNameInput() ? false : true}
                                    style={{ color: '#ffffff' }}
                                    onClick={() => handleNameInputSubmit(nameInput)}
                                >
                                    Confirm
                                </Button>
                            </div>
                            : null
                    }
                    <Button
                        variant="contained"
                        className={props.classes.generalButton2}
                        onClick={handleNameInputOpen}
                    >
                        ADD NEW EXCERCISE NAME
                    </Button>
                    <FormControl className={props.classes.FormControl}>
                        <InputLabel id="excercise-name-label">Excercise name</InputLabel>
                        <Select
                            labelId="excercise-name-label"
                            id="excercise-name-select"
                            open={selectNameOpen}
                            onClose={handleSelectNameClose}
                            onOpen={handleSelectNameOpen}
                            value={name ? name : ''}
                            disableAutoFocus={true}
                            onChange={handleNameChange}
                            error={name === ""}
                        >
                            {
                                newName !== "" ? <MenuItem value={newName}>{newName}</MenuItem>
                                    : null
                            }
                            {
                                props.excerciseNames.map(excerciseName => {
                                    if (excerciseName.type_id === "1") {
                                        return (
                                            <MenuItem key={excerciseName.name} value={excerciseName.name}>{excerciseName.name}</MenuItem>
                                        )
                                    }
                                    else return null;
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid className={props.classes.item} item xs>
                    <Typography variant="body1">Minutes</Typography>
                    <TextField
                        id="sets-input"
                        label="Minutes"
                        type="tel"
                        value={length}
                        onPaste={e => checkInput(e.target)}
                        onKeyPress={e => checkInput(e.target)}
                        onChange={e => checkInput(e.target)}
                        error={length === ""}
                        helperText={length === "" ? 'Enter minutes!' : ' '}
                    />
                </Grid>
                <Grid className={props.classes.item} item xs>
                    <Typography variant="body1">Intensity</Typography>
                    <FormControl className={props.classes.FormControl}>
                        <InputLabel id="excercise-content-label">Intensity level</InputLabel>
                        <Select
                            labelId="excercise-content-label"
                            id="excercise-content-select"
                            open={selectIntensityOpen}
                            onClose={handleSelectIntensityClose}
                            onOpen={handleSelectIntensityOpen}
                            value={intensity ? intensity : ''}
                            onChange={handleIntensityChange}
                            error={intensity === ""}
                        >
                            <MenuItem value={"low"}>low</MenuItem>
                            <MenuItem value={"moderate"}>moderate</MenuItem>
                            <MenuItem value={"high"}>high</MenuItem>
                            <MenuItem value={"interval"}>interval</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
    }
    return (
        <Button
            variant="outlined"
            className={props.classes.generalButton1}
            onClick={handleOpen}
        >
            ADD EXCERCISE
            <Modal
                id="add-excercise-modal"
                aria-labelledby="add-excercise-title"
                open={open}
                onClose={event => handleClose(event)}
            >
                <div className={props.classes.modal}>
                    <h2 id="add-excercise-title">New excercise</h2>
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
                        className={props.classes.generalButton1}
                        variant="outlined"
                        disabled={validForm() ? true : false}
                        onClick={event => handleSubmit(event,
                            {
                                form: {
                                    id: shortid.generate(),
                                    weekday: props.data.weekday,
                                    name: name,
                                    length: length,
                                    content: type === "1" ? intensity : reps
                                },
                                name: newName !== "" ?
                                    {
                                        id: shortid.generate(),
                                        type: type,
                                        name: newName
                                    }
                                    :
                                    {
                                        id: "",
                                        type: "",
                                        name: ""
                                    }
                            }
                        )}
                    >
                        Confirm
                    </Button>
                </div>
            </Modal>
        </Button >
    );
}
export default NewExcerciseForm;