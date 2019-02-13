import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const vis = require('vis')

class Timeline extends Component {
    componentDidMount() {
        var name = this.props.name
        window.fetch('/api/timeline/' + name).then(res => {
            res.json().then(data => {
                let t = ReactDOM.findDOMNode(this)
                let v = new vis.Timeline(t, new vis.DataSet(data.dots), {}) // eslint-disable-line no-unused-vars
            })
        })
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
