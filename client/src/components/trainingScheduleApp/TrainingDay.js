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

    const scheduleOfTheDay = () => {
        return props.data.list.map((row) => (
            <Grid item xs key={row.id}>
                <Paper className={props.classes.dayPaper}>
                    <Typography variant="h6">{row.name}</Typography>
                </Paper>
            </Grid>
        ))
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
            <Grid className={props.classes.dayContainer} container spacing={1} >
                <Paper className={props.classes.paper}>
                    <Typography variant="h5">{props.data.weekday}</Typography>
                </Paper>
                {scheduleOfTheDay()}
            </Grid>
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
                            spacing={2}
                        >
                            <Grid item xs>
                                <Typography variant="h6">{props.data.weekday}</Typography>
                                <Typography variant="h6">{props.data.name}</Typography>
                                <Typography variant="h6">{props.data.length}</Typography>
                                <Typography variant="h6">{props.data.content}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Popover>
        </Paper>
    )
}

export default Day;
