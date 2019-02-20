import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'

import Timeline from '../Timeline/Timeline'
import Dot from '../Dot/Dot'


class Edit extends Component {
    constructor(props) {
        super(props)

        this.state = {
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

    addDot(e) {
        let dots = this.props.dots.slice()
        let aid = `d${Math.random().toString().substring(10)}`
        dots.push({ id: aid, content: '{New Dot}', start: moment().format() })
        this.setState({ dots: dots })
    }

    doSave(e) {
        fetch(
            `/api/timeline/{this.props.match.params.name}`, {
                method: 'post',
                body: JSON.stringify({
                    name: this.props.match.params.name,
                    dots: this.props.dots || [] })
            })
    }

    doDelete(e) {
        fetch(`/api/timeline/{this.props.match.params.name}`, {
            method: 'delete'
        }).then(() => {
            document.location = '/#/'
        })
    }

    confirmDelete(e) {
        this.setState({ showConfirmDeleteModal: true })
    }

    cancelDelete(e) {
        this.setState({ showConfirmDeleteModal: false })
    }

    updateState(state) {
        let dots = this.props.dots.slice()
        for (var i = 0; i < dots.length; i++) {
            let dot = dots[i]
            if (state.id === dot.id) {
                state.pushUpdate = false
                dots[i] = state
                break
            }
        }
        this.setState({ dots: dots })
    }

    removeDot(dotid) {
        let newDots = []
        for (var i = 0; i < this.props.dots.length; i++) {
            let dot = this.props.dots[i]
            if (dotid !== dot.id) {
                newDots.push(Object.assign({}, dot))
            }
        }
        this.setState({ dots: newDots })
    }

    render() {
        let name = this.props.match.params.name
        let dialog = null

        if (this.state.showConfirmDeleteModal) {
            dialog = (
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
                <Timeline name={name}/>
                <div className="dots">
                    <div id="dotid-add">
                        <div><Button bsStyle="link" onClick={this.addDot}>Add dot</Button></div>
                    </div>
                    {this.props.dots.map((dot) => {
                        return (
                            <Dot dot={dot} key={dot.id} updateState={this.updateState} removeDot={this.removeDot} />)
                    })}
                </div>
                {dialog}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    dots: state.timeline.data.dots || [],
    pathname: state.router.location.pathname
})

export default connect(mapStateToProps)(Edit)
