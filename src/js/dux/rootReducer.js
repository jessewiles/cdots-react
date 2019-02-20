import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { timelines, timeline } from './reducers/timelines'
import { dots } from './reducers/dots'

const createRootReducer = function(history) {
    return combineReducers({
        router: connectRouter(history),
        timelines,
        timeline,
        dots
    })
}

export default createRootReducer
