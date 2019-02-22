import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { saveTimeLine } from '../../dux/actions/timelines'

const NavBar = ({ dispatch, pathname }) => {
    let match = /\/(.*)\/(.*)/.exec(pathname)
    const doSave = (e) => dispatch(saveTimeLine(match[2]))
    if (match !== null && match.length === 3) {
        return (
            <div>
                <div className="banner actions">
                    <Link to="/">Home</Link>
                    <span> | </span>
                    <Link to={`/view/${match[2]}`}>View</Link>
                    <span> | </span>
                    <Link to={`/edit/${match[2]}`}>Edit</Link>
                    <span> | </span>
                    <Link to={`/view/${match[2]}`} onClick={doSave}>Save</Link>
                    <span> | </span>
                    <Link to={`/delete/${match[2]}`}> Delete </Link>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className="banner actions">
                    <Link to="/">Home</Link>
                </div>
            </div>
        )
    }
}

NavBar.propTypes = {
    pathname: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    pathname: state.router.location.pathname
})

export default connect(mapStateToProps)(NavBar)
