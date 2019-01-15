import React, { Component } from 'react'
import { Button, ControlLabel, FormControl, FormGroup, Modal } from 'react-bootstrap'

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showAddTimelineModal: false,
            newTimelineName: null
        }
        this.cancelAdd = this.cancelAdd.bind(this)
        this.doAdd = this.doAdd.bind(this)
        this.handleTyping = this.handleTyping.bind(this)
        this.showAdd = this.showAdd.bind(this)
    }

    cancelAdd(e) {
        this.setState({ showAddTimelineModal: false })
    }

    doAdd(e) {
        window.fetch('/api/add', {
            method: 'post',
            body: JSON.stringify({ name: this.state.newTimelineName })
        }).then(() => this.cancelAdd())
    }

    handleTyping(e) {
        this.setState({ newTimelineName: e.target.value })
    }

    showAdd(e) {
        this.setState({ showAddTimelineModal: true })
    }

    render() {
        let dialog = null
        const title = 'cdots; timeline applications'
        document.title = title

        if (this.state.showAddTimelineModal) {
            dialog = (
                <div className="static-modal">
                    <Modal.Dialog>
                        <Modal.Header >
                            <Modal.Title bsStyle="warning">Add timeline</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Please give the new timeline a name:</p>
                            <div>
                                <FormGroup controlId={'tl' + Math.random().toString().substring(3)}>
                                    <ControlLabel>TimelineName</ControlLabel>
                                    <FormControl
                                        bsSize="sm"
                                        value={this.newTimelineName}
                                        onChange={this.handleTyping}/>
                                </FormGroup>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.cancelAdd}>Cancel</Button>
                            <Button bsStyle="warning" onClick={this.doAdd}>Add</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            )
        }

        return (
            <div>
                <h4 className="timeline-title"> {title} </h4>

                <Button bsStyle="link" onClick={this.showAdd}>New Timeline</Button>
                <div className="container">
                    {this.props.children}
                </div>
                {dialog}
            </div>
        )
    }
}

export default Main
