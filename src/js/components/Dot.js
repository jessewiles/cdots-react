import React, { Component } from 'react'
import Datetime from 'react-datetime'
import moment from 'moment'
import {FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap'

class Dot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.dot.id,
            content: this.props.dot.content,
            start: this.props.dot.start,
            end: this.props.dot.end
        }
        this.handleCaptionChange = this.handleCaptionChange.bind(this)
        this.handleCloseDot = this.handleCloseDot.bind(this)
        this.handleEndChange = this.handleEndChange.bind(this)
        this.handleStartChange = this.handleStartChange.bind(this)
    }

    componentDidUpdate() {
        this.props.updateState(this.state)
    }

    handleCloseDot(e) {
        this.props.removeDot(this.props.dot.id)
    }

    handleCaptionChange(e) {
        this.setState({ content: e.target.value })

    }

    handleStartChange(e) {
        this.setState({ start: e })
    }

    handleEndChange(e) {
        if (e === "") {
            this.setState({end: null})
        } else {
            this.setState({ end: e })
        }
    }

    render() {
        let dot = this.state

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
                        defaultValue={dot.start}
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        onChange={this.handleStartChange} />
                    <div>End</div>
                    <Datetime
                        defaultValue={dot.end}
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        onChange={this.handleEndChange} />
                </FormGroup>
            </div>
        )
    }
}

export default Dot
