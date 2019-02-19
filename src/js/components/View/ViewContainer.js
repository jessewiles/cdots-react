import React from 'react'
import { connect } from 'react-redux'

import { fetchTimeline } from '../../dux/actions'
import View from './View'


const mapStateToProps = (state) => ({
    loading: state.timeline.loading,
    name: /\/view\/(.*)/.exec(state.router.location.pathname)[1],
    timeline: state.timeline.data
})

const mapDispatchToProps = { fetchTimeline }

export default connect(mapStateToProps, mapDispatchToProps)(View)
