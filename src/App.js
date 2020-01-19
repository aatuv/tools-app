import React, { Fragment } from 'react'
import Weather from './components/weatherApp/Weather.js'
import Timer from './components/timerApp/Timer.js'
import { Grid } from '@material-ui/core'

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
        </Grid>
      </Fragment>
    )
  }

  return (
    <Grid container spacing={1}>
      <Grid container item xs={12} spacing={1}>
        {gridRow()}
      </Grid>
      <Grid container item xs={12} spacing={1}>
      </Grid>
    </Grid>
  )
}

export default App;
