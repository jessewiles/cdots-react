import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchTimelines } from '../dux/actions'

class TimelineList extends Component {
    static propTypes = {
        timeslines: PropTypes.array
    }

    componentDidMount() {
        this.props.dispatch(fetchTimelines())
    }

    render() {
        let content = (<div>Loading...</div>)
        if (!this.props.loading) {
            content = (
                <ul>
                    {this.props.timelines.map((tline) => {
                        let aid = tline.id || `i${Math.random().toString().substring(10)}`
                        return (
                            <li key={"lix" + aid}>
                                <Link
                                    to={"/view/" + tline.name}
                                    key={tline.id}>
                                    {tline.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )
        }

        return (
            <div>
                {content}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    timelines: state.timelines.data,
    loading: state.timelines.loading
})

export default connect(mapStateToProps)(TimelineList)
