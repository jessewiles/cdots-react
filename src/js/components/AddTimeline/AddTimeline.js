import React from 'react'
import PropTypes from 'prop-types'
import { Button, ControlLabel, FormControl, FormGroup, Modal } from 'react-bootstrap'

const AddTimeline = (props) => (
    <div className="static-modal">
        <Modal.Dialog>
            <Modal.Header >
                <Modal.Title bsStyle="warning">Add timeline</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Please give the new timeline a name:</p>
                <div>
                    <FormGroup controlId={'tl' + Math.random().toString().substring(3)}>
                        <ControlLabel>TimelineName</ControlLabel>
                        <FormControl
                            bsSize="sm"
                            value={props.addedTimelineName}
                            onChange={props.handleAddTimelineTyping}/>
                    </FormGroup>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.cancelAdd}>Cancel</Button>
                <Button bsStyle="warning" onClick={props.doAdd}>Add</Button>
            </Modal.Footer>
        </Modal.Dialog>
    </div>
)

AddTimeline.propTypes = {
    addedTimelineName: PropTypes.string.isRequired,
    cancelAdd: PropTypes.func.isRequired,
    doAdd: PropTypes.func.isRequired,
    handleAddTimelineTyping: PropTypes.func.isRequired
}

export default AddTimeline
