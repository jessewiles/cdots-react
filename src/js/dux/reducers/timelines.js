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

const COLORS = ['pink', 'lightgreen', 'yellow', 'orange', 'blue', 'navy']

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
    asked: null,
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
            let groups = []
            if (Array.isArray(action.data)) {
                let ndata = {
                    id: 'a101001', // Fix this
                    name: 'Perfetto', // TODO: fix this too
                    dots: [] }
                let count = 0
                action.data.map(item => {
                    let gid = 'a' + count.toString()
                    item.dots.map(dot => {
                        let ndot = { ...dot }
                        ndot.header = dot.content
                        ndot.group = gid
                        ndata.dots.push(ndot)
                    })
                    groups.push({
                        id: gid,
                        content: item.name,
                        style: 'background-color: ' + COLORS[count]
                    })
                    count += 1
                })
                action.data = ndata
            }
            return {
                ...state,
                data: action.data,
                groups: groups,
                loading: false,
                asked: action.name,
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
