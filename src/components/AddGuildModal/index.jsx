import React from "react";
import PropTypes from "prop-types";
import { getDiscordAdminGuilds } from "store/reducers/guilds";
import { connect } from "react-redux";

import GuildCard from "components/GuildCard";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";

import "./style.scss";

function AddGuildModal({ onHide, guilds, dispatch, ...rest }) {
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
        <div className="guild-card-list">
          {guilds.map(({ id, name, icon }) => (
            <Col md={6} lg={4} key={id}>
              <GuildCard id={id} name={name} icon={icon} />
            </Col>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = state => ({
  guilds: getDiscordAdminGuilds(state)
});

export default connect(mapStateToProps)(AddGuildModal);

AddGuildModal.propTypes = {
  onHide: PropTypes.func,
  guilds: PropTypes.array,
  dispatch: PropTypes.func
};
