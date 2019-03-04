import {
    CANCEL_ADD_TIMELINE,
    CANCEL_DELETE,
    CONFIRM_DELETE,
    DELETING_TIMELINE,
    DISPLAY_ADD_TIMELINE,
    HANDLE_ADD_TYPING,
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
                ...state,
                data: action.data,
                loading: false,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

export const timeline = (state = {
    data: {
        dots: []
    },
    loading: true,
    confirmDelete: false,
    displayAddTimeline: false,
    addedTimelineName: '' }, action) => {
    switch (action.type) {
        case DELETING_TIMELINE:
            return {
                ...state,
                confirmDelete: false
            }
        case REQUEST_TIMELINE:
            return {
                ...state,
                loading: true,
                confirmDelete: false
            }
        case RECEIVE_TIMELINE:
            return {
                ...state,
                data: action.data,
                loading: false,
                confirmDelete: false,
                lastUpdated: action.receivedAt
            }
        case CANCEL_DELETE:
            return {
                ...state,
                confirmDelete: false
            }
        case CONFIRM_DELETE:
            return {
                ...state,
                confirmDelete: true
            }

        case CANCEL_ADD_TIMELINE:
            return {
                ...state,
                displayAddTimeline: false,
                addedTimelineName: ''
            }

        case DISPLAY_ADD_TIMELINE:
            return {
                ...state,
                displayAddTimeline: true
            }

        case HANDLE_ADD_TYPING:
            return {
                ...state,
                addedTimelineName: action.data
            }
        default:
            return state
    }
}
