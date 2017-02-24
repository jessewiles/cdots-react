import React, { Component } from 'react'
import { render } from 'react-dom'

import {TimelineList} from './timeline.jsx'
import Home from './home.jsx'

class Main extends Component {
    render() {
        const title = 'CDots: Linear Time Modeling';
        document.title = title;
        return (
          <div>
            <h4 className="timeline-title"> {title} </h4>

            <div className="container">
                {this.props.children}
            </div>
          </div>
        );
    }
}

export default Main