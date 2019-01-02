import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


class Save extends Component {
    constructor(props) {
        super(props)

        this.props.payload = this.props.payload || {}
    }

    componentDidMount() {
        window.fetch(
            '/save/' + this.props.match.params.name, {
                method: 'post',
                body: JSON.stringify(this.props.payload)
            }).then(res => {
            res.json().then(data => { })
        })
    }

    render() {
        let link = "/view/" +this.props.match.params.name
        return (<Redirect to={link} />)
    }
}

export default Save
