import React, { Component } from 'react'
import Datetime from 'react-datetime'
import moment from 'moment'
import {FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap'

class Dot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: this.props.content,
            start: this.props.start,
            end: this.props.end
        }
        this.handleCaptionChange = this.handleCaptionChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
    }

    handleCloseDot(e) {
        e.target.parentNode.parentNode.removeChild(
            e.target.parentNode
        );
    }

    handleCaptionChange(e) {
        this.setState({ content: e.target.value });
    }

    handleStartChange(e) {
        this.setState({ start: e.target.value });
    }

    handleEndChange(e) {
        this.setState({ end: e.target.value });
    }

    render() {
        const dot = this.props.dot;

        return (
            <div id={'did' + dot.id} className="dot">
                <div className="closer" onClick={this.handleCloseDot}>X</div>
                <FormGroup controlId={'bsfc' + dot.id}>
                    <ControlLabel>CronDot</ControlLabel>
                    <div>Caption</div>
                    <FormControl
                        bsSize="sm"
                        value={dot.content}
                        onChange={this.handleCaptionChange} />
                    <div>Start</div>
                    <Datetime
                        value={dot.start}
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        onChange={this.handleStartChange} />
                    <div>End</div>
                    <Datetime
                        value={dot.end}
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        onChange={this.handleEndChange} />
                </FormGroup>
            </div>
        );
    }
}

export default Dot
