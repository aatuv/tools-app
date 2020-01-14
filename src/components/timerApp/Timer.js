import React from 'react'
import { Box, Button, ButtonGroup, TextField } from '@material-ui/core'
import { Pause, PlayArrow, Stop } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
    },
    main: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        display: 'table-cell'
    }
}));
function Timer() {
    const classes = useStyles();
    return (
            <Box className={classes.main}>
                <Box>
                <TextField className={classes.input} id="standard-number" label="hours" variant="outlined" />
                <TextField className={classes.input} id="standard-number" label="minutes" variant="outlined" />
                <TextField className={classes.input} id="standard-number" label="seconds" variant="outlined" />
                </Box>
                <Box>
                        <Button variant="outlined"><Stop /></Button>
                        <Button variant="outlined"><Pause /></Button>
                        <Button variant="outlined"><PlayArrow /></Button>
                </Box>
            </Box>
    )
}

export default Timer;
