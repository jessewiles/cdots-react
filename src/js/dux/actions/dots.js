export const ADD_DOT = 'ADD_DOT'
export const HYDRATE_DOTS = 'HYDRATE_DOTS'
export const REMOVE_DOT = 'REMOVE_DOT'
export const UPDATE_DOT = 'UPDATE_DOT'

export const addDot = () => ({
    type: ADD_DOT
})

export const removeDot = (dotid) => ({
    type: REMOVE_DOT,
    dotid: dotid
})

export const updateDot = (dot) => ({
    type: UPDATE_DOT,
    dot: dot
})

export const hydrateDots = (dots) => ({
    type: HYDRATE_DOTS,
    dots: dots || []
})
