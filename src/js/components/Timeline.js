import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

const vis = require('vis')

class Timeline extends Component {
    componentDidMount() {
        var name = this.props.name
        window.fetch('/view/'+ name).then(res => {
            res.json().then(data => {
                var t = ReactDOM.findDOMNode(this),
                    v = new vis.Timeline(
                    t, new vis.DataSet(data.dots), {}
                )
            })
        })
    }
    render() {
        return ( <div className="timeline"></div> )
    }
}

export class TimelineList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            timelines: []
        }
    }
    componentDidMount() {
        window.fetch('/timelines').then(res => {
            res.json().then(data => {
                this.setState({timelines: data})
            })
        })
    }
    render() {
        return (
            <ul>
                {this.state.timelines.map((tline) => {
                    return (
                        <li key={"lix" + tline.id}>
                            <Link
                                to={"/view/" + tline.name}
                                key={tline.id}>
                                {tline.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default Timeline
