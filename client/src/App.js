import React, { Fragment } from 'react'
import Weather from './components/weatherApp/Weather.js'
import Timer from './components/timerApp/Timer.js'
import Clock from './components/clockApp/Clock.js'
import TrainingSchedule from './components/trainingScheduleApp/TrainingSchedule.js'
import { Grid } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'

function App() {
  function gridRow() {
    return (
      <Fragment>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Weather />
          </Grid>
          <Grid item xs={4}>
            <Clock />
          </Grid>
          <Grid item xs={4}>
            <Timer />
          </Grid>
        </Grid>
      </Fragment>
    )
  }

  return (
    <Grid container style={{ backgroundColor: blue[800], minHeight: '100vh', minWidth: '100vh' }} direction="column" spacing={6}>
      <Grid item xs={12}>
        {gridRow()}
      </Grid>
      <Grid item xs={12}>
        <Fragment>
          <TrainingSchedule />
        </Fragment>
      </Grid>
    </Grid>
  )
}

export default App;
