import React from 'react'
import { Box, Button, TextField } from '@material-ui/core'
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

const checkInputFormat = (target) => {
    let numbersRegEx = /^[0-9]+$/;
    if (!target.value.match(numbersRegEx)) {
        target.value = target.value.slice(0, target.value.length - 1);
    }
    return target;
}

function checkInputValidity (target, id) {
    if (id === "s") {
        console.log(id);
        if (parseInt(target.value) >= 86400) { // 86400 s == 24 h
            target.value = "";
        }
    }
    if (id === "m") {
        console.log(id);
        if (parseInt(target.value) >= 1440) { // 1440 min == 24 h
            target.value = "";
        }
    }
    if (id === "h") {
        console.log(id);
        if (parseInt(target.value) >= 24) { // 24 h max
            target.value = "";
        }
    }
    return target;
}
const checkInput = (target) => {
    let input = checkInputFormat(target);
    let id = input.id;
    return checkInputValidity(input, id);
}
function Timer() {
    const classes = useStyles();
    return (
            <Box className={classes.main}>
                <Box>
                <TextField className={classes.input} onKeyPress={e => checkInput(e.target)} onChange={e => checkInput(e.target)} id="h" label="hours" variant="outlined" />
                <TextField className={classes.input} onKeyPress={e => checkInput(e.target)} onChange={e => checkInput(e.target)} id="m" label="minutes" variant="outlined" />
                <TextField className={classes.input} onKeyPress={e => checkInput(e.target)} onChange={e => checkInput(e.target)} id="s" label="seconds" variant="outlined" />
                </Box>
                <Box className={classes.main}>
                        <Button variant="outlined"><Stop /></Button>
                        <Button variant="outlined"><Pause /></Button>
                        <Button variant="outlined"><PlayArrow /></Button>
                </Box>
            </Box>
    )
}

export default Timer;
