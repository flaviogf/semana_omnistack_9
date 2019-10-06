import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import New from './pages/New'

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/new" exact component={New} />
      </Switch>
    </Router>
  )
}
