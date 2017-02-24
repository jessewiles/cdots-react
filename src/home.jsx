import React, { Component } from 'react'
import { render } from 'react-dom'
import { TimelineList } from './timeline.jsx'

class Home extends Component {
    render() {
        return ( <TimelineList /> );
    }
}

export default Home