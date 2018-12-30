import React, { Component } from 'react'
import { render } from 'react-dom'

import Timeline from '../components/Timeline.js'

class View extends Component {
    render() {
        const name = this.props.params.name,
              url  = '#/edit/' + name;
        return (
            <div>
                <div className="banner actions">
                    <a href="#/">Home</a>
                    <span> | </span>
                    <a href={url}>Edit</a>
                </div>
                <Timeline name={name}/>
            </div>
        );
    }
}

export default View
