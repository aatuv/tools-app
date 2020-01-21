import React, { Fragment } from 'react'
import Weather from './components/weatherApp/Weather.js'
import Timer from './components/timerApp/Timer.js'
import Clock from './components/clockApp/Clock.js'
import { Grid } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'

function App() {
  function gridRow() {
    return (
      <Fragment>
        <Grid item xs={4}>
          <Weather />
        </Grid>
        <Grid item xs={4}>
          <Timer />
        </Grid>
        <Grid item xs={4}>
          <Clock />
        </Grid>
      </Fragment>
    )
  }

  return (
    <Grid style={{backgroundColor: blue[800]}} container spacing={2}>
      <Grid container item xs={12} spacing={1}>
        {gridRow()}
      </Grid>
      <Grid container item xs={12} spacing={1}>
      </Grid>
    </Grid>
  )
}

export default App;
