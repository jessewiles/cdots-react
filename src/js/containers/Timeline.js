import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { fetchTimeline } from '../dux/actions'

const vis = require('vis')

class Timeline extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        timeline: PropTypes.object
    }

    componentDidMount() {
        const { dispatch, name } = this.props
        dispatch(fetchTimeline(name))
    }

    componentDidUpdate(prevProps) {
        if (this.props.timeline.dots !== undefined) {
            let t = ReactDOM.findDOMNode(this)
            let v = new vis.Timeline(t, new vis.DataSet(this.props.timeline.dots), {}) // eslint-disable-line no-unused-vars
        }
    }

    render() {
        let loadingMessage = ''
        if (this.props.loading) {
            loadingMessage = (<div>Loading...</div>)
        }

        return (
            <div>
                <h2> {this.props.name} </h2>
                <div className="timeline" />
                { loadingMessage }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    timeline: state.timeline.data,
    loading: state.timeline.loading
})

export default connect(mapStateToProps)(Timeline)
