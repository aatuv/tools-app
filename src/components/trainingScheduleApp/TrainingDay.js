import React from 'react'
import { Typography, Paper, Modal } from '@material-ui/core'

function Day(props) {
    return (
        <Paper className={props.classes.paper}>
            <Typography variant="body2" align="center">{props.data.day}</Typography>
            <Typography variant="body2" align="center">{props.data.day}</Typography>
            <Typography variant="body2" align="center">{props.data.day}</Typography>
            <Typography variant="body2" align="center">{props.data.day}</Typography>
            <Typography variant="body2" align="center">{props.data.day}</Typography>
            <Modal aria-labelledby="simple-modal-title" open={alert}>
                <div className={props.classes.modal}>
                    <Typography variant="h4">Content</Typography>
                </div>
            </Modal>
        </Paper>
    )
}

export default Day;
