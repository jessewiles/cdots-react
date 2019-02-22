import React from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Dot from '../Dot/Dot'

const DotPanel = (props) => (
    <div className="dots">
        <div id="dotid-add">
            <div><Button bsStyle="link" onClick={props.addDot}>Add dot</Button></div>
        </div>
        {props.dots.map(dot => {
            return (
                <Dot dot={dot} key={dot.id} updateDot={props.updateDot} removeDot={props.removeDot} />)
        })}
    </div>
)

DotPanel.propTypes = {
    dots: PropTypes.array.isRequired,
    addDot: PropTypes.func.isRequired,
    updateDot: PropTypes.func.isRequired,
    removeDot: PropTypes.func.isRequired
}

export default DotPanel
