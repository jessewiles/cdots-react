import React, { Component } from 'react'

class Main extends Component {
    render() {
        const title = 'cdots; timeline applications'
        document.title = title

        return (
            <div>
                <h4 className="timeline-title"> {title} </h4>

                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Main
