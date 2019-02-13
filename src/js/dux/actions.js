export const REQUEST_TIMELINES = 'REQUEST_TIMELINES'
export const RECEIVE_TIMELINES = 'RECEIVE_TIMELINES'


export const requestTimelines = () => ({
    type: REQUEST_TIMELINES
})

export const receiveTimelines = (data) => ({
    type: RECEIVE_TIMELINES,
    timelines: data,
    receivedAt: Date.now()
})

export const fetchTimelines = () => dispatch => {
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
