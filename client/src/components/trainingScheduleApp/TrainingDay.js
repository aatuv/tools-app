import React from 'react'
import { Typography, Grid, Paper, Modal, Popover, Card, CardContent } from '@material-ui/core'

function Day(props) {

    const handlePopOpen = (event) => {
        props.handlePopoverOpen(event.target, props.data.id);
    }
    const handleModOpen = (event) => {
        props.handleModalOpen(event.target, props.data.id);
    }
    const isPopoverOpen = () => {
        if (props.currentId === props.data.id) {
            return true;
        } else return false;
    }

    const openPopover = isPopoverOpen();
    return (
        <Paper
            className={props.classes.paper}
            aria-owns={openPopover ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopOpen}
            onMouseLeave={props.handlePopoverClose}
            onClick={handleModOpen}
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
                open={openPopover}
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
                            direction="column"
                            justify="center"
                            alignItems="center"
                            spacing={3}
                        >
                            <Grid item xs>
                                <Typography variant="h6">{props.data.day}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Popover>
        </Paper>
    )
}

export default Day;
