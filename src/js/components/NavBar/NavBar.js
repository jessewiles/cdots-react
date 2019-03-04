import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ConfirmDelete from '../ConfirmDelete/ConfirmDelete'
import AddTimeline from '../AddTimeline/AddTimeline'

class NavBar extends Component {
    static propTypes = {
        match: PropTypes.array.isRequired,
        confirmDeleteFlag: PropTypes.bool.isRequired,
        displayAddTimelineFlag: PropTypes.bool.isRequired,
        addedTimelineName: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props)

        this.doAddModal = this.doAddModal.bind(this)
        this.doAddTimeline = this.doAddTimeline.bind(this)
        this.doCancelDelete = this.doCancelDelete.bind(this)
        this.doCancelAdd = this.doCancelAdd.bind(this)
        this.doConfirmDelete = this.doConfirmDelete.bind(this)
        this.doDelete = this.doDelete.bind(this)
        this.doSave = this.doSave.bind(this)
        this.handleAddTimelineTyping = this.handleAddTimelineTyping.bind(this)
    }

    add() {
        let sty = { cursor: 'pointer' }
        let sep = null
        if (this.props.match.length === 3) {
            sep = (<span> | </span>)
        }
        return (
            <span>
                {sep}
                <a style={sty} onClick={this.doAddModal}>Add</a>
            </span>
        )
    }

    doAddModal(e) {
        this.props.displayAddTimeline()
    }

    doAddTimeline(e) {
        this.props.addTimeline(this.props.addedTimelineName)
    }

    doCancelAdd(e) {
        this.props.cancelAddTimeline()
    }

    doCancelDelete(e) {
        this.props.cancelDelete()
    }

    doConfirmDelete(e) {
        this.props.confirmDelete()
    }

    doDelete(e) {
        this.props.deleteTimeline(this.endSegment())
    }

    doSave(e) {
        this.props.saveTimeline(this.endSegment())
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

    handleAddTimelineTyping(e) {
        this.props.handleAddTimelineTyping(e.target.value)
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

    showAddTimelineModal() {
        if (this.props.displayAddTimelineFlag) {
            return (<AddTimeline
                addedTimelineName={this.props.addedTimelineName}
                doAdd={this.doAddTimeline}
                cancelAdd={this.doCancelAdd}
                handleAddTimelineTyping={this.handleAddTimelineTyping}
            />)
        } else {
            return null
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
                    {this.showAddTimelineModal()}
                    <div className="banner actions">
                        {this.home()}
                        {this.add()}
                        {this.view()}
                        {this.edit()}
                        {this.save()}
                        {this.del()}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    {this.showAddTimelineModal()}
                    <div className="banner actions">
                        {this.add()}
                    </div>
                </div>
            )
        }
    }
}

export default NavBar
