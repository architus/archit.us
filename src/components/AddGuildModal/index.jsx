import React from "react";
import PropTypes from "prop-types";

import { Modal, Button } from "react-bootstrap";

import "./style.scss";

function AddGuildModal({ onHide, ...rest }) {
  return (
    <Modal
      size="lg"
      aria-labelledby="add-guild-header"
      centered
      onHide={onHide}
      className="add-guild-modal"
      restoreFocus={false}
      {...rest}
    >
      <Modal.Header closeButton>
        <Modal.Title id="add-guild-header">
          Add <strong>aut-bot</strong> to a server
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* TODO add cards here */}
        Work in Progress
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddGuildModal;

AddGuildModal.propTypes = {
  onHide: PropTypes.func
};
