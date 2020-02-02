import React, { useState, useEffect, useRef } from 'react'
import { useSpring, animated, config } from 'react-spring'
import * as workerTimers from 'worker-timers'
import { Paper, Grid, Typography } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import { makeStyles } from '@material-ui/core/styles'
import './clock.css'

function Clock() {
    const initialMount = useRef(true);
    const [hours, setHour] = useState(new Date(Date.now()).getHours());
    const [minutes, setMinutes] = useState(new Date(Date.now()).getMinutes());
    const [seconds, setSeconds] = useState(new Date(Date.now()).getSeconds());
    const [degrees, setDegrees] = useState({
        sec: -90 + (new Date(Date.now()).getSeconds() * 6),
        min: -90 + (new Date(Date.now()).getMinutes() * 6) + (new Date(Date.now()).getSeconds() * 0.1),
        hr: -90 + (new Date(Date.now()).getHours() * 30) + ((new Date(Date.now()).getMinutes() / 60) * 30)
    });

    const secHand = useSpring({ // handle movement of seconds hand
        config: config.wobbly,
        from: { transform: 'rotate(-90deg)' },
        to: async next => {
            await next({ transform: `rotate(${degrees.sec}deg)` });
        }
    });
    const minHand = useSpring({ // handle movement of minutes hand 
        config: config.wobbly,
        from: { transform: 'rotate(-90deg)' },
        to: async next => {
            await next({ transform: `rotate(${degrees.min}deg)` });
        }
    });
    const hrHand = useSpring({ // handle movement of hours hand
        config: config.wobbly,
        from: { transform: 'rotate(-90deg)' },
        to: async next => {
            await next({ transform: `rotate(${degrees.hr}deg)` });
        }
    });
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const weekdays = ['Sunday', 'Monday', 'Tuesday',
        'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        const t = workerTimers.setInterval(() => { // update time every second
            let current = new Date(Date.now());
            setHour(current.getHours());
            setMinutes(current.getMinutes());
            setSeconds(current.getSeconds());
        }, 100);
        return () => workerTimers.clearInterval(t);
    }, [hours, minutes, seconds]);

    useEffect(() => { // when seconds update: update clock hand degrees
        if (initialMount.current) {
            initialMount.current = false;
        } else setDegrees({ sec: degrees.sec + 6, min: degrees.min + 0.1, hr: degrees.hr + 0.0083 });
    }, [seconds]);

    const useStyles = makeStyles(theme => ({
        main: {
            display: 'flex',
            justifyContent: 'center',
            minHeight: '100%',
            padding: theme.spacing(2),
            backgroundColor: blue[700],
            color: blue[50]
        },
        container: {
            padding: theme.spacing(2),
            justifyContent: 'center',
            minHeight: '100%',
            minWidth: '100%'
        },
        paper: {
            minWidth: '100%',
            backgroundColor: blue[300],
            color: '#ffffff'
        },
        item: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        typography: {
            textAlign: 'center'
        }
    }));

    const classes = useStyles();
    return (
        <Paper className={classes.main}>
            <Paper className={classes.paper}>
                <Grid className={classes.container} container direction="column" alignItems="stretch" spacing={1}>
                    <Grid className={classes.item} item xs={12}>
                        <Typography className={classes.typography} variant="h4">{weekdays[new Date(Date.now()).getDay()]}</Typography>
                    </Grid>
                    <Grid className={classes.item} item xs={12}>
                        <Typography className={classes.typography} variant="h4">{new Date(Date.now()).toLocaleDateString('de', options)}</Typography>
                    </Grid>
                    <Grid className={classes.item} item xs={12}>
                        <Typography className={classes.typography} variant="h3">{`${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`}</Typography>
                    </Grid>
                    <Grid className={classes.item} item xs>
                        <animated.div className="clock">
                            <animated.div className="seconds" style={secHand}></animated.div>
                            <animated.div className="minutes" style={minHand}></animated.div>
                            <animated.div className="hours" style={hrHand}></animated.div>
                        </animated.div>
                    </Grid>
                </Grid>
            </Paper>
        </Paper>
    )
}

export default Clock;
