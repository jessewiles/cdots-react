import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class TimelineList extends Component {
    static propTypes = {
        timeslines: PropTypes.array
    }

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
                    this.setState({ timelines: data })
                }
            })
        })
    }

    render() {
        return (
            <ul>
                {this.state.timelines.map((tline) => {
                    let aid = tline.id || `i${Math.random().toString().substring(10)}`
                    return (
                        <li key={"lix" + aid}>
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

export default TimelineList
