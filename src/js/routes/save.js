import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


class Save extends Component {
    componentDidMount() {
        window.fetch('/save/' + this.props.params.name).then(res => {
            res.json().then(data => { })
        })
    }
    render() {
        let link = "/view/" +this.props.params.name
        return (<Redirect to={link} />)
    }
}

export default Save
