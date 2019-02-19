import React from 'react'
import { Route, Switch } from 'react-router'
import Edit from '../components/Edit/Edit'
import HomeContainer from '../components/Home/HomeContainer'
import NavBar from '../components/NavBar/NavBar'
import NoMatch from '../components/NoMatch/NoMatch'
import ViewContainer from '../components/View/ViewContainer'

const routes = (
    <div>
        <NavBar />
        <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route path="/view/:name" component={ViewContainer} />
            <Route path="/edit/:name" component={Edit} />
            <Route component={NoMatch} />
        </Switch>
    </div>
)

export default routes
