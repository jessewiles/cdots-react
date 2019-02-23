import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { saveTimeline } from '../../dux/actions/timelines'

class NavBar extends Component {
    static propTypes = {
        match: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props)

        this.doSave = this.doSave.bind(this)
    }

    doDelete(e) {
        console.write('yeppers')
    }

    doSave(e) {
        const { dispatch } = this.props
        dispatch(saveTimeline(this.endSegment()))
    }

    del() {
        if (this.props.match.length === 3 && this.leadSegment() !== 'edit') {
            return null
        } else {
            return (
                <span>
                    <span> | </span>
                    <Link to={`/delete/${this.endSegment()}`} onClick={this.doDelete}>Delete</Link>
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
