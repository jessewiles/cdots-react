import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Datetime from 'react-datetime'
import moment from 'moment'

import Timeline from '../components/Timeline.js'
import Dot from '../components/Dot.js'
import Save from './save.js'


class Edit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dots: []
        }
        this.doSave = this.doSave.bind(this)
        this.updateState = this.updateState.bind(this)
    }

    componentDidMount() {
        window.fetch('/api/view/' + this.props.match.params.name).then(res => {
            res.json().then(data => {
                this.setState({dots: data.dots})
            })
        })
    }

    doSave(e) {
        let link = "/view/" +this.props.match.params.name
        window.fetch(
            '/api/save/' + this.props.match.params.name, {
                method: 'post',
                body: JSON.stringify({
                    name: this.props.match.params.name,
                    dots: this.state.dots})
            }).then(res => {
            res.json().then(data => { })
        })
    }

    updateState(state) {
        for (var i = 0; i < this.state.dots.length; i++) {
            let dot = this.state.dots[i]
            if (state.id === dot.id) {
                this.state.dots[i] = state
                break
            }
        }
    }

    render() {
        let name = this.props.match.params.name
        return (
            <div>
                <div className="banner actions">
                    <Link to="/">Home</Link>
                    <span> | </span>
                    <Link to={`/view/${name}`}>View</Link>
                    <span> | </span>
                    <Link to={`/view/${name}`} onClick={this.doSave}>Save</Link>
                    <span> | </span>
                    <Link to={`/delete/${name}`}>Delete</Link>
                </div>
                <Timeline name={name}/>
                <div className="dots">
                    <div id="dotid-add">
                        <div><b><Link to={`/add/${name}`}>Add a dot</Link></b></div>
                    </div>
                    {this.state.dots.map((dot) => {
                        return (
                            <Dot dot={dot} key={dot.id} updateState={this.updateState} />)
                    })}
                </div>
            </div>
        )
    }
}

export default Edit
