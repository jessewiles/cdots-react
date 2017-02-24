import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import DateTimePicker from './dtpicker.jsx'
import Timeline from './timeline.jsx'

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
        var name = this.props.params.name;
        return (
            <div>
                <div className="banner actions">
                    <a href="#/">Home</a>
                    <span> | </span>
                    <a href="#/view/{name}">View</a>
                    <span> | </span>
                    <a href="#/save/{name}">Save</a>
                    <span> | </span>
                    <a href="#/delete/{name}">Delete</a>
                </div>
                <Timeline name={this.props.params.name}/>
                <div className="dots">
                    <div id="dotid-add">
                        <div><b><a href="#/add/{name}">Add</a></b></div>
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

class Dot extends Component {
    processDot(dot) {
        var rdot = dot,
            startParts = dot.start.split(' '),
            endParts = (dot.end !== undefined) ? dot.end.split(' ') : null;
        rdot.startDate = startParts[0];
        rdot.startTime = (startParts.length > 1) ? startParts[1] : null;
        if (endParts) {
            rdot.endDate = endParts[0];
            rdot.endTime = (endParts.length > 1) ? endParts[1] : null;
        }
        return rdot;
    }
    render() {
        var dot = this.processDot(this.props.dot),
            content = dot.conent,
            key = 'k'+dot.id,
            mainid = 'dotid-'+dot.id,
            cbid = 'end-specify-end-ctrl-'+dot.id;
        return (
            <div id={mainid} className="dot">
                <div className="closer">X</div>
                <div><b>Content:</b></div>
                <div className="content ctrl" contentEditable>{content}</div>
                <div><b>Start:</b></div>
                <DateTimePicker klass="start"
                                key={key}
                                aid={dot.id}
                                date={dot.startDate}
                                time={dot.startTime} />

                <div>
                    <input type="checkbox" name={cbid} defaultChecked />
                    <b>End:</b>
                </div>
            </div>

        );
    }
}

export default Edit