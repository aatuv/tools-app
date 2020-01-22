import React, { useState, useEffect } from 'react'
import { useSpring, animated, useTransition, config } from 'react-spring'
import * as workerTimers from 'worker-timers'
import { Paper, Grid, Typography } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import { makeStyles } from '@material-ui/core/styles'
import clockBackground from '../../assets/clock-background.svg'
import './clock.css'

function Clock() {
    const [time, setTime] = useState(Date.now());

    const secHand = useSpring({ // handle movement of seconds hand
        config: config.wobbly,
        from: { transform: 'rotate(-90deg)' },
        to: async next => {
            let initial = -90 + new Date(time).getSeconds() * 6;
            await next({ transform: `rotate(${initial}deg)` });
        }
    });
    const minHand = useSpring({ // handle movement of minutes hand 
        config: config.wobbly,
        from: { transform: 'rotate(-90deg)' },
        to: async next => {
            let initial = -90 + new Date(time).getMinutes() * 6;
            await next({ transform: `rotate(${initial}deg)` });
            initial += 6;
        }
    });
    const hrHand = useSpring({ // handle movement of hours hand
        config: config.wobbly,
        from: { transform: 'rotate(-90deg)' },
        to: async next => {
            let initial = -90 + new Date(time).getHours() * 6;
            await next({ transform: `rotate(${initial}deg)` });
            initial += 6;
        }
    });
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const weekdays = ['Sunday', 'Monday', 'Tuesday',
        'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        const t = workerTimers.setInterval(() => { // update time every second
            setTime(Date.now());
        }, 1000);
        return () => workerTimers.clearInterval(t);
    }, [time]);

    const useStyles = makeStyles(theme => ({
        main: {
            display: 'flex',
            direction: 'column',
            alignItems: 'stretch',
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
            color: '#ffffff',
            padding: theme.spacing(2)
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
                        <Typography className={classes.typography} variant="h4">{weekdays[new Date(time).getDay()]}</Typography>
                    </Grid>
                    <Grid className={classes.item} item xs={12}>
                        <Typography className={classes.typography} variant="h4">{new Date(time).toLocaleDateString('de', options)}</Typography>
                    </Grid>
                    <Grid className={classes.item} item xs={12}>
                        <Typography className={classes.typography} variant="h3">{new Date(time).toLocaleTimeString('de')}</Typography>
                    </Grid>
                    <Grid className={classes.item} item xs>
                        <animated.div className="clock">
                            <animated.div className="seconds" style={secHand} key={time}></animated.div>
                            <animated.div className="minutes" style={minHand} key={time}></animated.div>
                            <animated.div className="hours" style={hrHand} key={time}></animated.div>
                        </animated.div>
                    </Grid>
                </Grid>
            </Paper>
        </Paper>
    )
}

export default Clock;
