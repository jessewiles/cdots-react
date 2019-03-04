import React from 'react'
import { connect } from 'react-redux'

import NavBar from './NavBar'
import {
    deleteTimeline,
    saveTimeline,
    confirmDelete,
    cancelDelete,
    addTimeline,
    cancelAddTimeline,
    displayAddTimeline,
    handleAddTimelineTyping } from '../../dux/actions/timelines'


function mapStateToProps(state) {
    return {
        match: /\/(.*)\/(.*)/.exec(state.router.location.pathname) || [],
        confirmDeleteFlag: state.timeline.confirmDelete,
        displayAddTimelineFlag: state.timeline.displayAddTimeline,
        addedTimelineName: state.timeline.addedTimelineName
    }
}

const mapDispatchToProps = {
    addTimeline,
    cancelAddTimeline,
    cancelDelete,
    confirmDelete,
    deleteTimeline,
    displayAddTimeline,
    handleAddTimelineTyping,
    saveTimeline
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
