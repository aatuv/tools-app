import React from 'react'
import { Typography, Grid, Paper, Modal, Popover, Card, CardContent } from '@material-ui/core'

function Day(props) {

    const handlePopOpen = (event) => {
        props.handlePopoverOpen(event.target, props.data.id);
    }
    const handleOpen = () => {
        if (props.currentId === props.data.id) {
            return true;
        } else return false;
    }
    const open = handleOpen();
    return (
        <Paper
            className={props.classes.paper}
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopOpen}
            onMouseLeave={props.handlePopoverClose}
        >
            <Typography variant="body2" align="center">{props.data.day}</Typography>
            <Typography variant="body2" align="center">{props.data.day}</Typography>
            <Typography variant="body2" align="center">{props.data.day}</Typography>
            <Typography variant="body2" align="center">{props.data.day}</Typography>
            <Typography variant="body2" align="center">{props.data.day}</Typography>
            {/*             <Modal aria-labelledby="simple-modal-title" open={alert}>
                <div className={props.classes.modal}>
                    <Typography variant="h4">Content</Typography>
                </div>
            </Modal> */}
            <Popover
                id="mouse-over-popover"
                className={props.classes.popover}
                open={open}
                anchorEl={props.anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                onClose={props.handlePopoverClose}
                keepMounted
            >
                <Card className={props.classes.card}>
                    <CardContent>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={3}
                        >
                        </Grid>
                    </CardContent>
                </Card>
            </Popover>
        </Paper>
    )
}

export default Day;
