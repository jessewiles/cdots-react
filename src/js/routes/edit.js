import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { render } from 'react-dom'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'

import Timeline from '../components/Timeline.js'
import Dot from '../components/Dot.js'


class Edit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dots: [],
            showConfirmDeleteModal: false
        }
        this.addDot = this.addDot.bind(this)
        this.cancelDelete = this.cancelDelete.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this)
        this.doDelete = this.doDelete.bind(this)
        this.doSave = this.doSave.bind(this)
        this.removeDot = this.removeDot.bind(this)
        this.updateState = this.updateState.bind(this)
    }

    componentDidMount() {
        fetch('/api/timeline/' + this.props.match.params.name).then(res => {
            res.json().then(data => {
                this.setState({dots: data.dots})
            })
        })
    }

    addDot(e) {
        let dots = this.state.dots.slice()
        dots.push({id: 'd'+ Math.random().toString().substring(3), content: '<New Dot>', start: moment().format()})
        this.setState({dots: dots})
    }

    doSave(e) {
        let link = "/view/" +this.props.match.params.name
        fetch(
            '/api/timeline/' + this.props.match.params.name, {
                method: 'post',
                body: JSON.stringify({
                    name: this.props.match.params.name,
                    dots: this.state.dots})
            })
    }

    doDelete(e) {
        fetch('/api/timeline/' + this.props.match.params.name, {
            method: 'delete'
        }).then(() => {
            document.location = '/#/'
        })
    }

    confirmDelete(e) {
        this.setState({showConfirmDeleteModal: true})
    }

    cancelDelete(e) {
        this.setState({showConfirmDeleteModal: false})
    }

    updateState(state) {
        for (var i = 0; i < this.state.dots.length; i++) {
            let dot = this.state.dots[i]
            if (state.id === dot.id) {
                this.state.dots[i] = state
                break
            }
        }
    }

    removeDot(dotid) {
        let newDots = []
        for (var i = 0; i < this.state.dots.length; i++) {
            let dot = this.state.dots[i]
            if (dotid !== dot.id) {
                newDots.push(Object.assign({}, dot))
            }
        }
        this.setState({dots: newDots})
    }

    render() {
        let name = this.props.match.params.name,
            dialog = null

        if (this.state.showConfirmDeleteModal) {
            dialog =  (
                <div className="static-modal">
                    <Modal.Dialog>
                        <Modal.Header >
                            <Modal.Title bsStyle="warning">Confirm timeline delete</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>Are you sure you want to delete this timeline?</Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.cancelDelete}>Cancel</Button>
                            <Button bsStyle="warning" onClick={this.doDelete}>Confirm</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            )
        }

        return (
            <div>
                <div className="banner actions">
                    <Link to="/">Home</Link>
                    <span> | </span>
                    <Link to={`/view/${name}`}>View</Link>
                    <span> | </span>
                    <Link to={`/view/${name}`} onClick={this.doSave}>Save</Link>
                    <span> | </span>
                    <Button bsStyle="link" onClick={this.confirmDelete}> Delete </Button>
                </div>
                <Timeline name={name}/>
                <div className="dots">
                    <div id="dotid-add">
                        <div><Button bsStyle="link" onClick={this.addDot}>Add dot</Button></div>
                    </div>
                    {this.state.dots.map((dot) => {
                        return (
                            <Dot dot={dot} key={dot.id} updateState={this.updateState} removeDot={this.removeDot} />)
                    })}
                </div>
                {dialog}
            </div>
        )
    }
}

export default Edit
