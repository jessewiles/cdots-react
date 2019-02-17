import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { REQUEST_TIMELINES, RECEIVE_TIMELINES } from './actions.js'
import { REQUEST_TIMELINE, RECEIVE_TIMELINE } from './actions.js'

const timelines = (state = { data: [], loading: true }, action) => {
    switch (action.type) {
        case REQUEST_TIMELINES:
            return {
                ...state
            }
        case RECEIVE_TIMELINES:
            return {
                data: action.data,
                loading: false,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

const timeline = (state = { data: {}, loading: true }, action) => {
    switch (action.type) {
        case REQUEST_TIMELINE:
            return {
                ...state
            }
        case RECEIVE_TIMELINE:
            return {
                data: action.data,
                loading: false,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

const createRootReducer = function(history) {
    return combineReducers({
        router: connectRouter(history),
        timelines,
        timeline
    })
}

export default createRootReducer
