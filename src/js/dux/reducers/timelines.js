import {
    REQUEST_TIMELINES,
    RECEIVE_TIMELINES,
    REQUEST_TIMELINE,
    RECEIVE_TIMELINE } from '../actions/timelines'

export const timelines = (state = { data: [], loading: true }, action) => {
    switch (action.type) {
        case REQUEST_TIMELINES:
            return {
                ...state,
                loading: true
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

export const timeline = (state = { data: { dots: [] }, loading: true }, action) => {
    switch (action.type) {
        case REQUEST_TIMELINE:
            return {
                ...state,
                loading: true
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
