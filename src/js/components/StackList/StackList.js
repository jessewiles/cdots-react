import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class StackList extends Component {
    static propTypes = {
        timeslines: PropTypes.array
    }

    render() {
        let content = (<div>Loading...</div>)
        if (!this.props.loading) {
            content = (
                <h3> Combine with another timeline </h3>
                <ul>
                    {this.props.timelines.map((tline) => {
                        let aid = tline.id || `i${Math.random().toString().substring(10)}`
                        return (
                            <li key={"lix" + aid}>
                                <Link
                                    to={"/stack/" + tline.name + "/on/" + path.replace('/view/', '')}
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
    path: state.router.location.pathname,
    timelines: state.timelines.data,
    loading: state.timelines.loading
})

export default connect(mapStateToProps)(StackList)
