import { RECEIVE_STACKS, REQUEST_STACKS } from '../actions/stacks'

export const stacks = (state = { data: [], loading: true }, action) => {
    switch (action.type) {
        case RECEIVE_STACKS:
            return { data: action.data, loading: false }

        case REQUEST_STACKS:
            return { ...state, loading: true }

        default:
            return state
    }
}
