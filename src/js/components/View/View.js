import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Timeline from '../Timeline/Timeline'

class View extends Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        timeline: PropTypes.shape({
            dots: PropTypes.array
        })
    }

    componentDidMount() {
        const { fetchTimeline, name } = this.props
        fetchTimeline(name)
    }

    render() {
        if (this.props.loading) {
            return (<div> Loading... </div>)
        } else {
            return (
                <div>
                    <Timeline dots={this.props.timeline.dots} name={name} />
                </div>
            )
        }
    }
}

export default View
