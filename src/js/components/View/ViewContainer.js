import React from 'react'
import { connect } from 'react-redux'

import { fetchTimeline } from '../../dux/actions/timelines'
import { fetchStacks } from '../../dux/actions/stacks'
import View from './View'


const mapStateToProps = (state) => ({
    loading: state.timeline.loading,
    timeline: state.timeline.data,
    groups: state.timeline.groups,
    asked: state.timeline.asked
})

const mapDispatchToProps = { fetchTimeline, fetchStacks }

export default connect(mapStateToProps, mapDispatchToProps)(View)
