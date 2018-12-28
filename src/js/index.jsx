import React, { Component } from 'react'
import { render } from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import Main from './routes/main.jsx'
import Home from './routes/home.jsx'
import View from './routes/view.jsx'
import Edit from './routes/edit.jsx'

render(
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={Home} />
          <Route path="/view/:name" component={View} />
          <Route path="/edit/:name" component={Edit} />
        </Route>
    </Router>,
    document.getElementById('container')
);
