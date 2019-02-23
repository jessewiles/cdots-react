import { hydrateDots } from './dots'
import { push } from 'connected-react-router'

export const DELETING_TIMELINE = 'DELETING_TIMELINE'
export const REQUEST_TIMELINES = 'REQUEST_TIMELINES'
export const RECEIVE_TIMELINES = 'RECEIVE_TIMELINES'
export const REQUEST_TIMELINE = 'REQUEST_TIMELINE'
export const RECEIVE_TIMELINE = 'RECEIVE_TIMELINE'

export const CONFIRM_DELETE = 'SHOW_CONFIRM_DELETE'
export const CANCEL_DELETE = 'CANCEL_DELETE'

const requestTimelines = () => ({
    type: REQUEST_TIMELINES
})

const receiveTimelines = (data) => ({
    type: RECEIVE_TIMELINES,
    data: data,
    receivedAt: Date.now()
})

const requestTimeline = (name) => ({
    type: REQUEST_TIMELINE,
    name: name
})

const receiveTimeline = (data) => ({
    type: RECEIVE_TIMELINE,
    data: data,
    receivedAt: Date.now()
})

const deletingTimeline = () => ({
    type: DELETING_TIMELINE
})

export const confirmDelete = () => ({
    type: CONFIRM_DELETE
})

export const cancelDelete = () => ({
    type: CANCEL_DELETE
})

export function fetchTimelines() {
    return (dispatch, getState) => {
        dispatch(requestTimelines())
        return window.fetch('/api/timelines')
            .then(response => response.json())
            .then(data => {
                if (data !== null) {
                    data.sort((a, b) => (a.name < b.name) ? -1 : 1)
                    dispatch(receiveTimelines(data))
                }
            })
    }
}

export function fetchTimeline(path) {
    return (dispatch, getState) => {
        dispatch(requestTimeline(path))
        return window.fetch(`/api/timeline/${path}`)
            .then(response => response.json())
            .then(data => {
                dispatch(hydrateDots(data.dots))
                dispatch(receiveTimeline(data))
            })
    }
}

export function saveTimeline(name) {
    return (dispatch, getState) => {
        return fetch(`/api/timeline/${name}`, {
            method: 'post',
            body: JSON.stringify({
                name: name,
                dots: getState().dots.dots || [] })
        })
    }
}

export function deleteTimeline(name) {
    return (dispatch, getState) => {
        dispatch(deletingTimeline())
        return fetch(`/api/timeline/${name}`, {
            method: 'delete'
        }).then(() => dispatch(push('/')))
    }
}
