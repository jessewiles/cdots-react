import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import App from './containers/App.js'
import Home from './routes/home.js'
import View from './routes/view.js'
import Edit from './routes/edit.js'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import process from 'process'

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

render(
    <Provider store={store}>
        <HashRouter>
            <App>
                <Route exact path="/" component={Home} />
                <Route path="/view/:name" component={View} />
                <Route path="/edit/:name" component={Edit} />
            </App>
        </HashRouter>
    </Provider>,
    document.getElementById('container')
)

