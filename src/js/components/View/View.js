import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Timeline from '../Timeline/Timeline'
import StackList from '../StackList/StackList'

class View extends Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        timeline: PropTypes.shape({
            dots: PropTypes.array
        })
    }

    componentDidMount() {
        const { fetchTimeline, fetchStacks } = this.props
        let name = this.props.match.params.name
        fetchTimeline(name)
        fetchStacks(name)
    }

    componentDidUpdate() {
        let name = this.props.match.params.name
        if (this.props.asked !== name) {
            if (!this.props.loading) {
                const { fetchTimeline, fetchStacks } = this.props
                fetchTimeline(name)
                fetchStacks(name)
            }
        }
    }

    render() {
        if (this.props.loading) {
            return (<div> Loading... </div>)
        } else {
            return (
                <div>
                    <Timeline
                        dots={this.props.timeline.dots}
                        groups={this.props.groups}
                        name={this.props.match.params.name} />
                    <StackList stackables={this.props.stackables} name={this.props.name} />
                </div>
            )
        }
    }
}

export default View
