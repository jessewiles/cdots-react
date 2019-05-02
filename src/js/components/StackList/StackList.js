import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class StackList extends Component {
    static propTypes = {
        stacks: PropTypes.array
    }

    render() {
        let content = (<div>Loading...</div>)
        if (!this.props.loading) {
            content = (
                <div>
                    <h5> Combine with another timeline </h5>
                    <ul>
                        {this.props.stacks.map((tline) => {
                            let aid = tline.id || `i${Math.random().toString().substring(10)}`
                            return (
                                <li key={"lix" + aid}>
                                    <Link
                                        to={"/view/" + this.props.path.replace('/view/', '') + "/" + tline.name}
                                        key={tline.id}>
                                        {tline.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
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
    stacks: state.stacks.data,
    loading: state.stacks.loading
})

export default connect(mapStateToProps)(StackList)
