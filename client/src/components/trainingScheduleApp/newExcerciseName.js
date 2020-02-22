import React, { useState, forwardRef } from 'react'
import shortid from 'shortid'
import { Button, TextField, Modal, MenuItem } from '@material-ui/core'

const NewExcerciseName = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');

    // handle opening and closing this modal
    const handleOpen = () => setOpen(true);
    const handleClose = (event) => {
        event.stopPropagation();
        setOpen(false);
    }
    const handleChange = event => setName(event.target.value);
    const handleSubmit = (event, form) => {
        props.handleNameData(form);
        handleClose(event);
    }

    const validInput = () => {
        if (name !== "") return true;
        else return false;
    }

    return (
        <MenuItem
            ref={ref} button={true}
            onClick={handleOpen}
        >
            Add new excercise name...
            <Modal
                id="new-name-modal"
                aria-labelledby="new-name-title"
                aria-describedby="new-modal-description"
                open={open}
                disableBackdropClick
                onClose={event => handleClose(event)}
            >
                <div className={props.classes.newNameModal}>
                    <h2 id="new-name-title">New excercise name</h2>
                    <TextField
                        id="name-input"
                        label="Name"
                        type="text"
                        value={name}
                        onChange={event => handleChange(event)}
                        error={name === ""}
                        helperText={name === "" ? 'Enter excercise name!' : ' '}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ color: '#ffffff' }}
                        onClick={event => handleClose(event)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={validInput() ? false : true}
                        style={{ color: '#ffffff' }}
                        onClick={event => handleSubmit(event,
                            {
                                id: shortid.generate(),
                                type: props.type,
                                name: name
                            }
                        )}
                    >
                        Confirm
                    </Button>
                </div>
            </Modal>
        </MenuItem>
    )

});

export default NewExcerciseName;