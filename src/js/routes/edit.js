import React, { Component } from 'react'
import Datetime from 'react-datetime'
import Timeline from '../components/Timeline.js'
import moment from 'moment'
import Dot from '../components/Dot.js'


class Edit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dots: []
        }
    }
    componentDidMount() {
        window.fetch('/view/' + this.props.params.name).then(res => {
            res.json().then(data => {
                this.setState({dots: data.dots});
            })
        })
    }
    render() {
        var name = this.props.params.name,
            homer = '#/',
            viewer = '#/view/' + name,
            saver = '#/save/' + name,
            deleter = '#/delete/' + name,
            adder = '#/add/' + name;
        return (
            <div>
                <div className="banner actions">
                    <a href={homer}>Home</a>
                    <span> | </span>
                    <a href={viewer}>View</a>
                    <span> | </span>
                    <a href={saver}>Save</a>
                    <span> | </span>
                    <a href={deleter}>Delete</a>
                </div>
                <Timeline name={this.props.params.name}/>
                <div className="dots">
                    <div id="dotid-add">
                        <div><b><a href={adder}>Add a dot</a></b></div>
                    </div>
                    {this.state.dots.map((dot) => {
                        return (
                            <Dot dot={dot} key={dot.id} />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Edit
