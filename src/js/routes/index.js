import React from 'react'
import { Route, Switch } from 'react-router'
import Edit from '../containers/Edit'
import Home from '../components/Home'
import NavBar from '../components/NavBar'
import NoMatch from '../components/NoMatch'
import View from '../components/View'

const routes = (
    <div>
        <NavBar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/view/:name" component={View} />
            <Route path="/edit/:name" component={Edit} />
            <Route component={NoMatch} />
        </Switch>
    </div>
)

export default routes
