import React from 'react'
import { BrowserRouter as Router, Route, Redirect ,Switch } from "react-router-dom";
import Menu from './pages/Menu'
import Login from './pages/Login'

export default function App() {
    return (
    <Router>
      <Switch>
        <Route path="/login"  component={Login} />
        <Route path="/menu" component={Menu} />
        <Redirect from='/' to='/login' />
      </Switch>
       
    </Router>
    )
}
