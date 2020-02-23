import React, { useState, forwardRef, useRef } from 'react'
import { Button, TextField, Modal, MenuItem } from '@material-ui/core'
import InputModal from './InputModal.js'

const NewExcerciseName = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = (event) => {
        event.stopPropagation();
        setOpen(false);
    }

    return props.newName === "" ?
        <MenuItem
            onClick={handleOpen}
            value={props.newName}
        >
            Add new excercise name...
            <InputModal classes={props.classes} handleOpen={handleOpen} handleClose={handleClose} open={open} />
        </MenuItem>
        : null

});

export default NewExcerciseName;