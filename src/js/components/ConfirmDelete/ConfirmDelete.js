import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

const ConfirmDelete = (props) => (
    <div className="static-modal">
        <Modal.Dialog>
            <Modal.Header >
                <Modal.Title bsStyle="warning">Confirm timeline delete</Modal.Title>
            </Modal.Header>

            <Modal.Body>Are you sure you want to delete this timeline?</Modal.Body>

            <Modal.Footer>
                <Button onClick={props.cancelDelete}>Cancel</Button>
                <Button bsStyle="warning" onClick={props.doDelete}>Confirm</Button>
            </Modal.Footer>
        </Modal.Dialog>
    </div>
)

ConfirmDelete.propTypes = {
    doDelete: PropTypes.func.isRequired
}

export default ConfirmDelete
