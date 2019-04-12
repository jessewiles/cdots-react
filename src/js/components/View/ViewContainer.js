import React from 'react'
import { connect } from 'react-redux'

import { fetchTimeline } from '../../dux/actions/timelines'
import View from './View'


const mapStateToProps = (state) => ({
    loading: state.timeline.loading,
    name: /\/view\/(.*)/.exec(state.router.location.pathname)[1],
    timeline: state.timeline.data
})

const mapDispatchToProps = { fetchTimeline, fetchStacks }

export default connect(mapStateToProps, mapDispatchToProps)(View)
