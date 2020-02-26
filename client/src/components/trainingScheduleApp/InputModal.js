import React, { useState, forwardRef } from 'react'
import { Modal, TextField, Button } from '@material-ui/core'

const InputModal = forwardRef((props, ref) => {
    const [value, setValue] = useState('');

    const handleChange = event => {
        event.stopPropagation();
        setValue(event.target.value.toLowerCase())
    }
    const handleSubmit = (event) => {
        props.setNewName(value);
        props.handleClose(event);
    }

    const validInput = () => {
        if (value !== "" && !props.excerciseNames.includes(value)) return true;
        else return false;
    }


    return (
        <Modal
            id="new-name-modal"
            aria-labelledby="new-name-title"
            aria-describedby="new-modal-description"
            open={props.open}
            disableBackdropClick
            onClose={event => props.handleClose(event)}
        >
            <div className={props.classes.newNameModal}>
                <h2 id="new-name-title">New excercise name</h2>
                <TextField
                    id="name-input"
                    label="Name"
                    type="text"
                    value={value}
                    onChange={event => handleChange(event)}
                    error={value === ""}
                    helperText={value === "" ? 'Enter excercise name!' : ' '}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ color: '#ffffff' }}
                    onClick={event => props.handleClose(event)}
                >
                    Cancel
                    </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={validInput() ? false : true}
                    style={{ color: '#ffffff' }}
                    onClick={event => handleSubmit(event)}
                >
                    Confirm
                    </Button>
            </div>
        </Modal>
    )
});

export default InputModal;