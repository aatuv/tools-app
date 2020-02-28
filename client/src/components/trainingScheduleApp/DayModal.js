import React, { useState } from 'react'
import { Modal, Button, Typography, Grid, Paper } from '@material-ui/core'
import NewExcerciseForm from './NewExcerciseForm.js'
import EditExcerciseForm from './EditExcerciseForm.js'

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
                    <EditExcerciseForm 
                    data={row}
                    classes={props.classes}
                    excerciseNames={props.excerciseNames}
                    handleEditExcercise={props.handleEditExcercise}
                    >

                    </EditExcerciseForm>
                    <Button
                        className={props.classes.declineButton}
                        onClick={() => props.handleDeleteID(
                            {
                                id: row.id
                            }
                            )}
                        variant="outlined"
                    >
                        Delete
                    </Button>
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
                onClose={event => handleClose(event)}
            >
                <div className={props.classes.modal}>
                    <h2 id="simple-modal-title">{props.data.weekday}</h2>
                    <Grid className={props.classes.dayContainer} container spacing={1}>
                        {scheduleOfTheDay()}
                        <Grid item xs={12}>
                            <NewExcerciseForm
                                classes={props.classes}
                                data={props.data}
                                excerciseNames={props.excerciseNames}
                                handleFormData={props.handleFormData}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Modal>
        </div>
    );
}
export default DayModal;