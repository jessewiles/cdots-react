import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'

import Timeline from '../Timeline/Timeline'
import DotPanel from '../DotPanel/DotPanel'


class Edit extends Component {
    componentDidMount() {
        this.props.hydrateDots(this.props.timeline.dots)
    }

    render() {
        return (
            <div>
                <Timeline name={this.props.name} dots={this.props.dots}/>
                <DotPanel
                    dots={this.props.dots}
                    addDot={this.props.addDot}
                    removeDot={this.props.removeDot}
                    updateDot={this.props.updateDot}
                />
            </div>
        )
    }
}

export default Edit
