import React from 'react'
import Day from './Day.js'

function Weekdays(props) {
    return props.days.map(day => (
        <Day data={day} />
    ));
}


export default Weekdays;
