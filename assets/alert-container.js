import React from 'react'
import Alert from './alert'
import {observer} from 'mobservable-react'
import {observable} from 'mobservable'
import _ from 'lodash'

export const alerts = observable([])

alerts.add = (alert) => { // instead of push method, this prevents you from adding one alert multiple times
  if (!_.find(alerts, {html: alert.html})) {
    alerts.push(alert)
  }
}
alerts.remove = (alert) => {
  alerts.splice(alerts.indexOf(alert), 1)
}
alerts.clear = () => {
  alerts.length = 0
}

const AlertContainer = (props) => {
  return <div className='alert-container'>
    {alerts.map((alert, i) => {
      return <Alert {...alert} key={i}/>
    })}
  </div>
}

export default observer(AlertContainer)
