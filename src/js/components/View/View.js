import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
        const { fetchTimeline, fetchStacks, name } = this.props
        fetchTimeline(name)
    }

    render() {
        if (this.props.loading) {
            return (<div> Loading... </div>)
        } else {
            return (
                <div>
                    <Timeline dots={this.props.timeline.dots} name={this.props.name} />
                    <StackList stackables={this.props.stackables} name={this.props.name} />
                </div>
            )
        }
    }
}

export default View
