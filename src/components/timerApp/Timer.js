import React, { useState, useEffect, useRef } from 'react'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import { Pause, PlayArrow, Stop } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

function Timer() {
    const initialMount = useRef(true);
    const [hours, setHours] = useState("0");
    const [minutes, setMinutes] = useState("0");
    const [seconds, setSeconds] = useState("0");
    const [timer, setTimer] = useState(0);
    const [timerOn, setTimerOn] = useState(false);

    const useStyles = makeStyles(theme => ({
        root: {
        },
        main: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        },
        buttons: {
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: '10px'
        },
        input: {
            display: 'table-cell'
        }
    }));

    useEffect(() => {
        if (initialMount.current) {
            initialMount.current = false;
        } else {
            if (timerOn === false) {
                setTimerOn(true);
            }
            const t = setInterval(() => {
                if (timer === 0) {
                    setTimerOn(false);
                    clearInterval(this);
                } else {
                setTimer(timer - 100);
                }
            }, 100);
            return () => {
                clearInterval(t);
            }
        }
    }, [timer]);

    const calculateTime = () => {
        let hMs = (parseInt(hours) * 3600000);
        let mMs = (parseInt(minutes) * 60000);
        let sMs = (parseInt(seconds) * 1000);
        
        return hMs + mMs + sMs;
    }
    const handleTimerOn = () => {
        setTimer(calculateTime()); 
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

    const qsecs = () => {
        let qsecs = (timer / (100) % 10);
        return qsecs;
    }

    const secs = () => {
        let secs = ('0' + Math.floor((timer / (1000))) % 60).slice(-2);
        return secs;
    }
    const mins = () => {
        let mins = ('0' + Math.floor((timer / (1000 * 60)))).slice(-2);
        return mins; 
    }
    const hrs = () => {
        let hrs = ('0' + Math.floor((timer / (1000 * 60 * 60)))).slice(-2);
        return hrs; 
    }

    const classes = useStyles();

    return timerOn ?
        <Box className={classes.main}>
            <Box>
                <Typography variant="h3">{`${hrs()}:${mins()}:${secs()}:${qsecs()}`}</Typography>
            </Box>
            <Box className={classes.buttons}>
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
            <Box className={classes.buttons}>
                <Button variant="outlined"><Stop /></Button>
                <Button variant="outlined"><Pause /></Button>
                <Button variant="outlined" onClick={handleTimerOn}><PlayArrow /></Button>
            </Box>
            </Box>
        </Box>
}

export default Timer;
