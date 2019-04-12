export const REQUEST_STACKS = 'REQUEST_STACKS'
export const RECEIVE_STACKS = 'RECEIVE_STACKS'

const requestStacks = () => ({
    type: REQUEST_STACKS
})

const receiveStacks = (data) => ({
    type: RECEIVE_STACKS,
    data: data
})

export function fetchStacks(name) {
    return (dispatch, getState) => {
        dispatch(requestTimelines())
        return window.fetch('/api/stacks/on/' + name)
            .then(response => response.json())
            .then(data => {
                if (data !== null) {
                    data.sort((a, b) => (a.name < b.name) ? -1 : 1)
                    dispatch(receiveStacks(data))
                }
            })
    }
}
