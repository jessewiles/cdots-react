import { combineReducers } from 'redux'
import { REQUEST_TIMELINES, RECEIVE_TIMELINES } from '../actions'

const timelines = (state, action) => {
    switch (action.type) {
        case REQUEST_TIMELINES:
            return {
                ...state
            }
        case RECEIVE_TIMELINES:
            return {
                ...state,
                items: action.timelines,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({ timelines })

export default rootReducer
