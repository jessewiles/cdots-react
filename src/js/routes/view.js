import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Timeline from '../components/Timeline.js'

class View extends Component {
    render() {
        const name = this.props.match.params.name
        return (
            <div>
                <div className="banner actions">
                    <Link to="/">Home</Link>
                    <span> | </span>
                    <Link to={`/edit/${name}`}>Edit</Link>
                </div>
                <Timeline name={name}/>
            </div>
        )
    }
}

export default View
