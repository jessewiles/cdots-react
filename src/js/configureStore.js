import { createHashHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './dux/rootReducer'

export const history = createHashHistory()

export default function configureStore(preloadedState) {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        composeEnhancer(
            applyMiddleware(
                thunk,
                routerMiddleware(history),
            ),
        ),
    )

    // Hot reloading
    if (module.hot) { // eslint-disable-line no-undef
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => { // eslint-disable-line no-undef
            store.replaceReducer(createRootReducer(history))
        })
    }

    return store
}
