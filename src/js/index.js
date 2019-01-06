import React, { Component } from 'react'
import { render } from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Main from './routes/main.js'
import Home from './routes/home.js'
import View from './routes/view.js'
import Edit from './routes/edit.js'

render(
    <HashRouter>
        <Main>
          <Route exact path="/" component={Home} />
          <Route path="/view/:name" component={View} />
          <Route path="/edit/:name" component={Edit} />
        </Main>
    </HashRouter>,
    document.getElementById('container')
);
