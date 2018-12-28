import React, { Component } from 'react'
import { render } from 'react-dom'
import { TimelineList } from '../components/Timeline.jsx'

class Home extends Component {
    render() {
        return ( <TimelineList /> );
    }
}

export default Home