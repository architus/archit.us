import React from "react";
import PropTypes from "prop-types";
import { getDiscordAdminGuildsWithoutAutbot } from "store/reducers/guilds";
import { connect } from "react-redux";

import GuildCard from "components/GuildCard";
import { Modal, Button } from "react-bootstrap";

import "./style.scss";

const baseInviteUrl = guildId => `https://api.aut-bot.com/invite/${guildId}`;
export function useInviteUrl() {
  if (process.env.PRODUCTION_URL) {
    return baseInviteUrl;
  } else {
    const [inviteUrl, setInviteUrl] = React.useState(baseInviteUrl);
    React.useEffect(() => {
      setInviteUrl(() => guildId =>
        `https://api.aut-bot.com/invite/${guildId}?return=${encodeURIComponent(
          `${window.location.protocol}//${window.location.host}/app`
        )}`
      );
    });
    return inviteUrl;
  }
}

function AddGuildModal({ onHide, guilds, dispatch, ...rest }) {
  const inviteUrl = useInviteUrl();
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
            Add <strong>aut-bot</strong> to a server
          </h4>
          <p>Select a server to be redirected to Discord.</p>
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
  guilds: getDiscordAdminGuildsWithoutAutbot(state)
});

export default connect(mapStateToProps)(AddGuildModal);

AddGuildModal.propTypes = {
  onHide: PropTypes.func,
  guilds: PropTypes.array,
  dispatch: PropTypes.func
};
