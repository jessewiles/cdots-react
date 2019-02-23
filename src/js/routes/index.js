import React from 'react'
import { Route, Switch } from 'react-router'
import EditContainer from '../components/Edit/EditContainer'
import HomeContainer from '../components/Home/HomeContainer'
import NavBar from '../components/NavBar/NavBarContainer'
import NoMatch from '../components/NoMatch/NoMatch'
import ViewContainer from '../components/View/ViewContainer'

const routes = (
    <div>
        <NavBar />
        <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route path="/view/:name" component={ViewContainer} />
            <Route path="/edit/:name" component={EditContainer} />
            <Route component={NoMatch} />
        </Switch>
    </div>
)

export default routes
