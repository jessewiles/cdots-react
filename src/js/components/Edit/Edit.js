import React, { Component } from 'react'

import Timeline from '../Timeline/Timeline'
import DotPanel from '../DotPanel/DotPanel'


class Edit extends Component {
    componentDidMount() {
        this.props.fetchTimeline(this.props.name)
    }

    render() {
        return (
            <div>
                <Timeline name={this.props.name} dots={this.props.dots}/>
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

export default Edit
