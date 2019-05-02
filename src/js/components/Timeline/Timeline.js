import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

const vis = require('vis')

class Timeline extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        dots: PropTypes.array,
        groups: PropTypes.array
    }

    componentDidMount() {
        let t = ReactDOM.findDOMNode(this)
        if (this.props.groups && this.props.groups.length > 0) {
            let v = new vis.Timeline(t, new vis.DataSet(this.props.dots), new vis.DataSet(this.props.groups), {}) // eslint-disable-line no-unused-vars
        } else {
            let v = new vis.Timeline(t, new vis.DataSet(this.props.dots), {}) // eslint-disable-line no-unused-vars
        }
    }

    render() {
        return (
            <div>
                <div className="timeline" />
            </div>
        )
    }
}

export default Timeline
