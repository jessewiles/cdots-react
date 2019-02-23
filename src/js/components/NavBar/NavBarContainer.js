import React from 'react'
import { connect } from 'react-redux'

import NavBar from './NavBar'

const mapStateToProps = (state) => ({
    match: /\/(.*)\/(.*)/.exec(state.router.location.pathname) || []
})

export default connect(mapStateToProps)(NavBar)
