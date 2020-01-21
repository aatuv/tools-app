import React, { useState, useEffect } from 'react'
import { useSpring, animated, useTransition } from 'react-spring'
import { Paper, Grid, Typography } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import { makeStyles } from '@material-ui/core/styles'
import clockBackground from '../../assets/clock-background.svg'
import './clock.css'

function Clock() {
    const [time, setTime] = useState(Date.now());
    const props = useSpring({
    });
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const weekdays = ['Sunday', 'Monday', 'Tuesday',
        'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        setInterval(() => {
            setTime(Date.now());
        }, 1000);
    }, [time, setTime]);

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
                        <animated.div className="clock" style={props}>
                        </animated.div>
                    </Grid>
                </Grid>
            </Paper>
        </Paper>
    )
}

export default Clock;
