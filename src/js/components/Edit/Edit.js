import React, { Component } from 'react'

import Timeline from '../Timeline/Timeline'
import DotPanel from '../DotPanel/DotPanel'


class Edit extends Component {
    componentDidMount() {
        if (this.name() !== undefined) {
            this.props.fetchTimeline(this.name())
        }
    }

    name() {
        let match = /\/edit\/(.*)/.exec(this.props.path)
        if (match !== null && match.length === 2) {
            return match[1]
        } else {
            return undefined
        }
    }

    render() {
        if (this.name() === undefined) {
            return null
        } else {
            return (
                <div>
                    <Timeline name={this.name()} dots={this.props.dots}/>
                    <DotPanel
                        dots={this.props.dots}
                        addDot={this.props.addDot}
                        removeDot={this.props.removeDot}
                        updateDot={this.props.updateDot}
                    />
                </div>
            )
        }
    }
}

export default Edit
