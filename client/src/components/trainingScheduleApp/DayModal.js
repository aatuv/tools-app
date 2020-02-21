import React, { useState } from 'react'
import { Modal, Button, Typography, Grid, Paper } from '@material-ui/core'
import NewExcerciseForm from './NewExcerciseForm.js'


function DayModal(props) {
    const [open, setOpen] = useState(false);

    // handle opening and closing of this modal
    const handleOpen = () => setOpen(true);
    const handleClose = (event) => {
        event.stopPropagation();
        setOpen(false);
    }

    // render the schedule for the specific weekday
    const scheduleOfTheDay = () => {
        return props.data.list.map((row) => (
            <Grid item xs={12} key={row.id}>
                <Paper className={props.classes.dayPaper}>
                    <Typography variant="h6">{row.name}, {row.length}x{row.content}</Typography>
                    <Button className={props.classes.editExcerciseButton} variant="outlined">Edit</Button>
                    <Button className={props.classes.deleteExcerciseButton} variant="outlined">Delete</Button>
                </Paper>
            </Grid>
        ))
    }

    return (
        <div
            className={props.classes.paper}
            onClick={handleOpen}
        >
            <Paper className={props.classes.paper} style={{ backgroundColor: '#3fa5f6' }} elevation={0}>
                <Typography variant="body1">Details</Typography>
            </Paper>
            <Modal
                id="mouse-click-modal"
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={event => { handleClose(event) }}
            >
                <div className={props.classes.modal}>
                    <h2 id="simple-modal-title">{props.data.weekday}</h2>
                    <Grid className={props.classes.dayContainer} container>
                        {scheduleOfTheDay()}
                        <Grid item xs={12}>
<<<<<<< HEAD
                            <NewExcerciseForm
                                classes={props.classes}
                                data={props.data}
                                excerciseNames={props.excerciseNames}
                                handleFormData={props.handleFormData}
                            />
=======
                            <NewExcerciseForm classes={props.classes} data={props.data} excerciseNames={props.excerciseNames} />
>>>>>>> 4a72a5f55450a74e5ad0e7f15db598ddd3f12bcd
                        </Grid>
                    </Grid>
                </div>
            </Modal>
        </div>
    );
}
export default DayModal;