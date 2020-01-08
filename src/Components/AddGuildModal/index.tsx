import React from "react";
import { usePool } from "Store/slices/pools";
import { useReturnQuery, API_BASE, processIfNotEmptyOrNil } from "Utility";
import { Snowflake } from "Utility/types";

import GuildCard from "Components/GuildCard";
import { Modal, Button } from "react-bootstrap";

import "./style.scss";

type AddGuildModalProps = {
  onHide: () => void;
} & Partial<React.ComponentProps<typeof Modal>>;

const AddGuildModal: React.FC<AddGuildModalProps> = ({ onHide, ...rest }) => {
  const { all: guilds } = usePool("guilds");
  const returnQuery = useReturnQuery();
  const inviteUrl = (guildId: Snowflake): string =>
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
              Not seeing a server? Make sure you have the &quot;Manage
              guild&quot; permission in that server.
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
};

export default AddGuildModal;
