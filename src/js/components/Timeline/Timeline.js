import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

const vis = require('vis')

class Timeline extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        dots: PropTypes.array.isRequired
    }

    componentDidMount() {
        let t = ReactDOM.findDOMNode(this)
        let v = new vis.Timeline(t, new vis.DataSet(this.props.dots), {}) // eslint-disable-line no-unused-vars
    }

    render() {
        return (
            <div>
                <h2> {this.props.name} </h2>
                <div className="timeline" />
            </div>
        )
    }
}

export default Timeline
