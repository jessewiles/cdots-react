import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { timelines, timeline } from './reducers/timelines'
import { dots } from './reducers/dots'
import { stacks } from './reducers/stacks'

const createRootReducer = function(history) {
    return combineReducers({
        router: connectRouter(history),
        timelines,
        timeline,
        dots,
        stacks
    })
}

export default createRootReducer
