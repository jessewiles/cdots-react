import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimelineList from '../TimelineList/TimelineList'

class Home extends Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        timelines: PropTypes.array.isRequired
    }

    componentDidMount() {
        this.props.fetchTimelines()
    }

    render() {
        if (this.props.loading) {
            return (<div> Loading... </div>)
        } else {
            return (<TimelineList timelines={this.props.timelines} />)
        }
    }
}

export default Home
