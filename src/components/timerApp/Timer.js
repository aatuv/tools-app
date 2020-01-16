import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import { Pause, PlayArrow, Stop, SettingsInputAntenna } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

function Timer() {
    const [hours, setHours] = useState("0");
    const [minutes, setMinutes] = useState("0");
    const [seconds, setSeconds] = useState("0");
    const [timer, setTimer] = useState(0);
    const [timerMs, setTimerMs] = useState(0);
    const [timerOn, setTimerOn] = useState(false);

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

    const putTimerOn = () => {
    }

    const handleTimerOn = () => {
        let hMs = parseInt(hours) * 3600000;
        let mMs = parseInt(minutes) * 60000;
        let sMs = parseInt(seconds) * 1000;
        setTimer(hMs + mMs + sMs);
        setTimerOn(true);
    }
    const handleTimerOff = () => {
        setTimerOn(false);
    }

    const setInput = (target, id) => {
        if (id === "s") {
            setSeconds(target.value);
        }
        if (id === "m") {
            setMinutes(target.value);
        }
        if (id === "h") {
            setHours(target.value);
        }
        return target;
    }

    const checkInputFormat = (target) => {
        let numbersRegEx = /^[0-9]+$/;
        if (!target.value.match(numbersRegEx)) {
            if (target.value.slice(0, 1) === numbersRegEx) {
                target.value = target.value.slice(0, target.value.length - 1);
            } else {
                target.value = "";
            }
        }
        setInput(target, target.id);
        return target;
    }
    const checkInputTime = (target, id) => {
        let combined = 0;
        switch (id) {
            case "h":
                combined = (parseInt(target.value) * 3600) + (parseInt(minutes) * 60) + parseInt(seconds)
                break;
            case "m":
                combined = (parseInt(hours) * 3600) + (parseInt(target.value) * 60) + parseInt(seconds)
                break;
            case "s":
                combined = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseInt(target.value);
                break;
            default:
                break;
        }
        console.log(combined);
        if (combined >= 86400) {
            setHours("23");
            setMinutes("59");
            setSeconds("59");
        }
    }
    const checkInput = (target) => {
        target = checkInputFormat(target);
        target = setInput(target, target.id);
        checkInputTime(target, target.id);
        return target;
    }

    const returnTime = () => {

    }

    const classes = useStyles();

    return timerOn ?
        <Box className={classes.main}>
            <Box>
                <Typography id="h">{returnTime}:</Typography>
                <Typography id="m">{returnTime}:</Typography>
                <Typography id="s">{returnTime}</Typography>
            </Box>
            <Box className={classes.main}>
                <Button variant="outlined"><Stop /></Button>
                <Button variant="outlined"><Pause /></Button>
                <Button variant="outlined"><PlayArrow /></Button>
            </Box>
        </Box>
        :
        <Box className={classes.main}>
            <Box>
                <TextField
                    className={classes.input}
                    value={hours}
                    onPaste={e => checkInput(e.target)}
                    onKeyPress={e => checkInput(e.target)}
                    onChange={e => checkInput(e.target)}
                    id="h"
                    label="hours"
                    variant="outlined"
                />
                <TextField
                    className={classes.input}
                    value={minutes}
                    onPaste={e => checkInput(e.target)}
                    onKeyPress={e => checkInput(e.target)}
                    onChange={e => checkInput(e.target)}
                    id="m"
                    label="minutes"
                    variant="outlined"
                />
                <TextField
                    className={classes.input}
                    value={seconds}
                    onPaste={e => checkInput(e.target)}
                    onKeyPress={e => checkInput(e.target)}
                    onChange={e => checkInput(e.target)}
                    id="s"
                    label="seconds"
                    variant="outlined"
                />
            </Box>
            <Box className={classes.main}>
                <Button variant="outlined"><Stop /></Button>
                <Button variant="outlined"><Pause /></Button>
                <Button variant="outlined" onClick={handleTimerOn}><PlayArrow /></Button>
            </Box>
        </Box>
}

export default Timer;
