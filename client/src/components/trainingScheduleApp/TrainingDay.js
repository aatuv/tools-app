import React from 'react'
import { Typography, Grid, Paper, Modal, Button } from '@material-ui/core'

function TrainingDay(props) {
    const handleModOpen = (event) => {
        props.handleModalOpen(event.target, props.data.weekday);
    }
    const handleModClose = () => {
        props.handleModalClose();
    }

    const checkModalOpen = () => {
        if (props.currentId === props.data.weekday) {
            return props.modalOpen;
        } else return false;
    }
    const open = checkModalOpen();
    const scheduleOfTheDay = () => {
        return props.data.list.map((row) => (
            <Grid item xs key={row.id}>
                <Paper className={props.classes.dayPaper}>
                    <Typography variant="h6">{row.name}, {row.length}x{row.content}</Typography>
                </Paper>
            </Grid>
        ))
    }

    const scheduleOfTheDayModal = () => {
        return props.data.list.map((row) => (
            <Grid item xs key={row.id}>
                <Paper className={props.classes.dayPaper}>
                    <Typography variant="h6">{row.name}, {row.length}x{row.content}</Typography>
                </Paper>
            </Grid>
        ))
    }
    return (
        <Paper
            className={props.classes.paper}
            onClick={handleModOpen}
            aria-owns={open ? 'mouse-click-modal' : undefined}
        >
            <Grid className={props.classes.dayContainer} container spacing={1} >
                <Grid item xs>
                    <Typography variant="h5">{props.data.weekday}</Typography>
                </Grid>
                {scheduleOfTheDay()}
            </Grid>
            <Modal 
            id="mouse-click-modal"
            aria-labelledby="simple-modal-title" 
            aria-describedby="simple-modal-description"
            open={open}
            onClose={props.handleModalClose}
            >
                <div className={props.classes.modal}>
                    <h2 id="simple-modal-title">Text in a modal</h2>
                    <Button onClick={props.handleModalClose} variant="outlined" color="primary">Close</Button>
                </div>
            </Modal>
        </Paper>
    )
}

export default TrainingDay;
