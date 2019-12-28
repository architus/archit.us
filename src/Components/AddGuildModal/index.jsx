import React from "react";
import PropTypes from "prop-types";
import { getDiscordAdminGuildsWithoutArchitus } from "Store/slices/guilds";
import { connect } from "react-redux";
import { useReturnQuery, API_BASE, processIfNotEmptyOrNil } from "Utility";

import GuildCard from "Components/GuildCard";
import { Modal, Button } from "react-bootstrap";

import "./style.scss";

function AddGuildModal({ onHide, guilds, dispatch, ...rest }) {
  const returnQuery = useReturnQuery();
  const inviteUrl = guildId =>
    `${API_BASE}/invite/${guildId}${processIfNotEmptyOrNil(
      returnQuery,
      q => `?${q}`
    )}`;
  return (
    <Modal
      size="lg"
      aria-labelledby="add-guild-header"
      centered
      onHide={onHide}
      className="add-guild-modal"
      restoreFocus={false}
      scrollable
      {...rest}
    >
      <Modal.Header closeButton>
        <Modal.Title id="add-guild-header">
          <h4>
            Add <strong>architus</strong> to a server
          </h4>
          <p className="d-none d-md-block">
            Select a server to be redirected to Discord.
          </p>
          <p>
            <em>
              Not seeing a server? Make sure you have the "Manage guild"
              permission in that server.
            </em>
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="guild-card-list">
          {guilds.map(({ id, name, icon }) => (
            <GuildCard
              id={id}
              name={name}
              icon={icon}
              key={id}
              href={inviteUrl(id)}
            />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} className="px-4">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = state => ({
  guilds: getDiscordAdminGuildsWithoutArchitus(state)
});

export default connect(mapStateToProps)(AddGuildModal);

AddGuildModal.propTypes = {
  onHide: PropTypes.func,
  guilds: PropTypes.array,
  dispatch: PropTypes.func
};
