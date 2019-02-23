import React from 'react'
import { connect } from 'react-redux'

import { fetchTimeline } from '../../dux/actions/timelines'
import { addDot, removeDot, updateDot, hydrateDots } from '../../dux/actions/dots'
import Edit from './Edit'


const mapStateToProps = (state) => ({
    loading: state.timeline.loading,
    path: state.router.location.pathname,
    timeline: state.timeline.data,
    dots: state.dots.dots
})

const mapDispatchToProps = {
    fetchTimeline,
    addDot,
    removeDot,
    updateDot,
    hydrateDots
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
