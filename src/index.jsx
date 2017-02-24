import React, { Component } from 'react'
import { render } from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import Main from './main.jsx'
import Home from './home.jsx'
import View from './view.jsx'
import Edit from './edit.jsx'

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
