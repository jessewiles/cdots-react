import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Main from './routes/main.js'
import Home from './routes/home.js'
import View from './routes/view.js'
import Edit from './routes/edit.js'

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
