import React, { useState, useEffect, useRef } from 'react'
import * as workerTimers from 'worker-timers'
import soundFile from '../../assets/mgs.m4a'
import { Grid, Box, Paper, Button, TextField, Typography, Modal } from '@material-ui/core'
import { Pause, PlayArrow, Stop } from '@material-ui/icons'
import blue from '@material-ui/core/colors/blue'
import { makeStyles } from '@material-ui/core/styles'

function Timer() {
    const [alertSound, setAlertSound] = useState(new Audio(soundFile));
    const initialMount = useRef(true);
    const [hours, setHours] = useState("0");
    const [minutes, setMinutes] = useState("0");
    const [seconds, setSeconds] = useState("0");
    const [timer, setTimer] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [timerPause, setTimerPause] = useState(false);
    const [alert, setAlert] = useState(false);

    // handle logic related to time left in timer
    useEffect(() => {
        if (initialMount.current) { // prevent on initial load
            initialMount.current = false;
        } else {
            let current = Date.now();
            const t = workerTimers.setInterval(() => {
                if (timerOn === false) { // if timer is stopped
                    workerTimers.clearInterval(t);
                } else {
                    if (timer <= 0) { // if timer ran out
                        alertOn();
                        handleTimerOff();
                        workerTimers.clearInterval(t);
                    } else {
                        if (timerPause === true) { // if timer is paused, don't change timer amount
                            setTimer(timer);
                        } else {
                            let elapsed = Date.now() - current;
                            console.log(elapsed);
                            setTimer(timer - elapsed);
                        }
                    }
                }
            }, 100);
            return () => {
                workerTimers.clearInterval(t);
            }
        }
    }, [timer]);

    // dont allow empty input in input fields
    useEffect(() => {
        if (hours === "") {
            setHours("0");
        }
        if (minutes === "") {
            setMinutes("0");
        }
        if (seconds === "") {
            setSeconds("0");
        }
    }, [hours, minutes, seconds]);

    // put timer back on if pause is set back to false (doesnt proc on initial load)
    useEffect(() => {
        if (initialMount.current) {
            initialMount.current = false;
        } else {
            if (!timerPause) {
                setTimer(timer - 100);
            }
        }
    }, [timerPause])

    // handle alert sound
    useEffect(() => {
        if (alert) {
            playAlertSound();
        }
    }, [alert])

    // return time in milliseconds
    const calculateTime = () => {
        let hMs = (parseInt(hours) * 3600000);
        let mMs = (parseInt(minutes) * 60000);
        let sMs = (parseInt(seconds) * 1000);

        return hMs + mMs + sMs;
    }

    const alertOn = () => {
        setAlert(true);
    }

    const alertOff = () => {
        setAlert(false);
        stopAlertSound();
    }

    const playAlertSound = () => {
        alertSound.play();
    }

    const stopAlertSound = () => {
        alertSound.pause();
        alertSound.currentTime = 0;
    }
    // * 
    //handle logic related to timer buttons
    const handleTimerOn = () => {
        if (timerPause && timerOn) {
            setTimer(timer);
        }
        if (!timerPause && timerOn) {
            setTimer(timer);
        } else {
            setTimer(calculateTime());
            setTimerOn(true);
            handleTimerPauseOff();
        }
    }

    const handleTimerOff = () => {
        setTimerOn(false);
        setTimer(0);
        setHours("0");
        setMinutes("0");
        setSeconds("0");
    }

    const handleTimerPauseOn = () => {
        setTimerPause(true);
    }
    const handleTimerPauseOff = () => {
        setTimerPause(false);
    }
    // *

    // set different inputs on change
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

    // check for faulty input
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

    // max time possible 23h 59min 59sec, equals 86399 ms
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
    // handle all logic related to input changes
    const checkInput = (target) => {
        target = checkInputFormat(target);
        target = setInput(target, target.id);
        checkInputTime(target, target.id);
        return target;
    }

    // *
    // return time left in timer in readable form
    const qsecs = () => {
        let qsecs = Math.floor(timer / (100) % 10);
        return qsecs;
    }

    const secs = () => {
        let secs = ('0' + Math.floor((timer / (1000))) % 60).slice(-2);
        return secs;
    }
    const mins = () => {
        let mins = ('0' + Math.floor((timer / (1000 * 60)) % 60)).slice(-2);
        return mins;
    }
    const hrs = () => {
        let hrs = ('0' + Math.floor((timer / (1000 * 60 * 60)))).slice(-2);
        return hrs;
    }
    //*

    const useStyles = makeStyles(theme => ({
        header: {
            textAlign: 'center'
        },
        main: {
            minHeight: '100%',
            padding: theme.spacing(2),
            backgroundColor: blue[700],
            color: blue[50]
        },
        paper: {
            backgroundColor: blue[300],
            color: '#ffffff',
            padding: theme.spacing(2)
        },
        box: {
            backgroundColor: '#ffffff',
            padding: theme.spacing(2)
        },
        buttons: {
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: '10px'
        },
        button: {
            backgroundColor: blue[500],
            color: '#ffffff'
        },
        input: {
            display: 'table-cell',
            backgroundColor: blue[50]
        },
        modal: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            position: 'absolute',
            top: '30%',
            left: '30%',
            width: '20%',
            height: '20%',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        }
    }));

    const classes = useStyles();

    return timerOn ?
        <Paper className={classes.main}>
            <Grid
                container
                spacing={1}
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.header} variant="h3">{`${hrs()}:${mins()}:${secs()}:${qsecs()}`}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Box className={classes.buttons}>
                            <Button className={classes.button} variant="outlined" onClick={handleTimerOff}><Stop /></Button>
                            <Button className={classes.button} variant="outlined" onClick={handleTimerPauseOn}><Pause /></Button>
                            <Button className={classes.button} variant="outlined" onClick={handleTimerPauseOff}><PlayArrow /></Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
        :
        <Paper className={classes.main}>
            <Grid
                container
                spacing={1}
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={3}>
                        <Typography gutterBottom variant="h4">Timer</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={3} >
                        <Paper className={classes.box} >
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
                                <Button className={classes.button} onClick={handleTimerOn} variant="outlined"><PlayArrow /></Button>
                            </Box>
                        </Paper>
                    </Paper>
                </Grid>
            </Grid>
            <Modal aria-labelledby="simple-modal-title" open={alert}>
                <div className={classes.modal}>
                    <Typography variant="h4">Alarm!</Typography>
                    <Button onClick={alertOff} variant="outlined" color="primary">
                        OK
                    </Button>
                </div>
            </Modal>
        </Paper>
}

export default Timer;
