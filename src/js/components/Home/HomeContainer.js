import React from 'react'
import { connect } from 'react-redux'

import { fetchTimelines } from '../../dux/actions/timelines'
import Home from './Home'

const mapStateToProps = (state) => ({
    loading: state.timelines.loading,
    timelines: state.timelines.data
})

const mapDispatchToProps = { fetchTimelines }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
