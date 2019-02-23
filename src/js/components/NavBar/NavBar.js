import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {
    deleteTimeline,
    saveTimeline,
    confirmDelete,
    cancelDelete } from '../../dux/actions/timelines'
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete'

class NavBar extends Component {
    static propTypes = {
        match: PropTypes.array.isRequired,
        confirmDeleteFlag: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props)

        this.doCancelDelete = this.doCancelDelete.bind(this)
        this.doConfirmDelete = this.doConfirmDelete.bind(this)
        this.doDelete = this.doDelete.bind(this)
        this.doSave = this.doSave.bind(this)
    }

    doCancelDelete() {
        this.props.dispatch(cancelDelete())
    }

    doConfirmDelete(e) {
        this.props.dispatch(confirmDelete())
    }

    doDelete(e) {
        this.props.dispatch(deleteTimeline(this.endSegment()))
    }

    doSave(e) {
        const { dispatch } = this.props
        dispatch(saveTimeline(this.endSegment()))
    }

    del() {
        if (this.props.match.length === 3 && this.leadSegment() !== 'edit') {
            return null
        } else {
            let sty = { cursor: 'pointer' }
            return (
                <span>
                    <span> | </span>
                    <a style={sty} onClick={this.doConfirmDelete}>Delete</a>
                </span>
            )
        }
    }

    edit() {
        if (this.props.match.length === 3 && this.leadSegment() === 'edit') {
            return null
        } else {
            return (
                <span>
                    <span> | </span>
                    <Link to={`/edit/${this.endSegment()}`}>Edit</Link>
                </span>
            )
        }
    }

    endSegment() {
        return (this.props.match.length === 3) ? this.props.match[2] : ''
    }


    home() {
        if (this.props.match[0] === "/") {
            return null
        } else {
            return (
                <span>
                    <Link to="/">Home</Link>
                </span>
            )
        }
    }

    leadSegment() {
        return (this.props.match.length === 3) ? this.props.match[1] : ''
    }

    save() {
        if (this.props.match.length === 3 && this.leadSegment() !== 'edit') {
            return null
        } else {
            return (
                <span>
                    <span> | </span>
                    <Link to={`/view/${this.endSegment()}`} onClick={this.doSave}>Save</Link>
                </span>
            )
        }
    }

    showConfirmDeleteModal() {
        if (this.props.confirmDeleteFlag) {
            return (<ConfirmDelete doDelete={this.doDelete} cancelDelete={this.doCancelDelete} />)
        } else {
            return null
        }
    }

    view() {
        if (this.props.match.length === 3 && this.leadSegment() === 'view') {
            return null
        } else {
            return (
                <span>
                    <span> | </span>
                    <Link to={`/view/${this.endSegment()}`}>View</Link>
                </span>
            )
        }
    }

    render() {
        if (this.props.match !== null && this.props.match.length === 3) {
            return (
                <div>
                    {this.showConfirmDeleteModal()}
                    <div className="banner actions">
                        {this.home()}
                        {this.view()}
                        {this.edit()}
                        {this.save()}
                        {this.del()}
                    </div>
                </div>
            )
        } else { return null }
    }
}

export default NavBar
