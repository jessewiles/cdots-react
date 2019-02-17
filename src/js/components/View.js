import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Timeline from '../containers/Timeline.js'

const View = ({ pathname }) => {
    let match = /\/view\/(.*)/.exec(pathname)
    if (!match) {
        return 'Unknown'
    } else {
        return (
            <div>
                <Timeline name={match[1]} />
            </div>
        )
    }
}

View.propTypes = {
    pathname: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    pathname: state.router.location.pathname
})

export default connect(mapStateToProps)(View)
