export const REQUEST_TIMELINES = 'REQUEST_TIMELINES'
export const RECEIVE_TIMELINES = 'RECEIVE_TIMELINES'
export const REQUEST_TIMELINE = 'REQUEST_TIMELINE'
export const RECEIVE_TIMELINE = 'RECEIVE_TIMELINE'


export const requestTimelines = () => ({
    type: REQUEST_TIMELINES
})

export const receiveTimelines = (data) => ({
    type: RECEIVE_TIMELINES,
    data: data,
    receivedAt: Date.now()
})

export const requestTimeline = (name) => ({
    type: REQUEST_TIMELINE,
    name: name
})

export const receiveTimeline = (data) => ({
    type: RECEIVE_TIMELINE,
    data: data,
    receivedAt: Date.now()
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
            .then(data => dispatch(receiveTimeline(data)))
    }
}
