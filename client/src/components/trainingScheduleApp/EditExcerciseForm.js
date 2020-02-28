import React, { useState, useRef } from 'react'
import shortid from 'shortid'
import { Modal, Button, Typography, Grid, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'

function EditExcerciseForm(props) {
    const [open, setOpen] = useState(false);
    const [selectIntensityOpen, setSelectIntensityOpen] = useState(false);
    const [length, setLength] = useState(props.data.length);
    const [reps, setReps] = useState(props.data.content);
    const [intensity, setIntensity] = useState(props.data.content);


    // handle opening and closing the form modal
    const handleOpen = () => setOpen(true);
    const handleClose = (event) => {
        event.stopPropagation();
        setOpen(false);
    }
    // handle opening, closing and value change of the select input for intensity level
    const handleSelectIntensityOpen = () => setSelectIntensityOpen(true);
    const handleSelectIntensityClose = () => setSelectIntensityOpen(false);
    const handleIntensityChange = event => setIntensity(event.target.value);



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
        props.handleEditExcercise(form);
        handleClose(event);
    }

    // make sure all fields have valid data before submitting
    const validForm = () => {
        if (props.data.type === "Stamina") {
            if (length === "" || intensity === "")
                return true;
            else return false;
        } else {
            if (length === "" || reps === "")
                return true;
            else return false;
        }
    }

    // render content according to selected excercise type
    const returnForm = () => {
        return props.data.type === "Strength" ? // TYPE = STRENGTH
            <Grid className={props.classes.dayContainer} container>
                <Grid className={props.classes.item} item xs>
                    <Typography variant="h3">{props.data.name}</Typography>
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
                <Grid className={props.classes.item} item xs>
                    <Typography variant="h4">{props.data.name}</Typography>
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
                            value={intensity}
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
            className={props.classes.generalButton2}
            onClick={handleOpen}
        >
            EDIT
            <Modal
                id="add-excercise-modal"
                aria-labelledby="add-excercise-title"
                open={open}
                onClose={event => handleClose(event)}
            >
                <div className={props.classes.modal}>
                    {returnForm()}
                    <Button
                        className={props.classes.generalButton1}
                        variant="outlined"
                        disabled={validForm() ? true : false}
                        onClick={event => handleSubmit(event,
                            {
                                id: props.data.id,
                                weekday: props.data.weekday,
                                name: props.data.name,
                                length: length,
                                content: props.data.type === "Stamina" ? intensity : reps
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
export default EditExcerciseForm;