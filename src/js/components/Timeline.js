import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

const vis = require('vis')

class Timeline extends Component {
    componentDidMount() {
        var name = this.props.name
        window.fetch('/api/timeline/'+ name).then(res => {
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
        window.fetch('/api/timelines').then(res => {
            res.json().then(data => {
                if (data !== null) {
                    data.sort((a, b) => (a.name < b.name) ? -1 : 1)
                    this.setState({timelines: data})
                }
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
