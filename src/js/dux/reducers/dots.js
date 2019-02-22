import moment from 'moment'
import {
    ADD_DOT,
    HYDRATE_DOTS,
    REMOVE_DOT,
    UPDATE_DOT } from '../actions/dots'

export const dots = (state = { dots: []  }, action) => {
    switch (action.type) {
        case ADD_DOT:
            let aid = `d${Math.random().toString().substring(10)}`
            return { 
                dots: state.dots.map(d => Object.assign({}, d))
                .concat({ id: aid, content: '{New Dot}', start: moment().format() }) 
            }

        case HYDRATE_DOTS:
            return { dots: action.dots.map(d => Object.assign({}, d)) }

        case REMOVE_DOT:
            let ndots = []
            for (var i = 0; i < state.dots.length; i++) {
                let dot = state.dots[i]
                if (action.dotid !== dot.id) {
                    ndots.push(Object.assign({}, dot))
                }
            }
            return { dots: ndots }

        case UPDATE_DOT:
            let udots = []
            for (var i = 0; i < state.dots.length; i++) {
                let dot = state.dots[i]
                if (action.dot.id === dot.id) {
                    action.dot.pushUpdate = false
                    udots[i] = Object.assign({}, action.dot)
                } else {
                    udots[i] = Object.assign({}, dot)
                }
            }
            return { dots: udots }

        default:
            return state
    }
}
