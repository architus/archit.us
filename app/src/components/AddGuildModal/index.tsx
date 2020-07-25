import { Box } from "@xstyled/emotion";
import React from "react";

import { API_BASE } from "@app/api";
import GuildCard from "@app/components/GuildCard";
import { Modal, Button, ModalProps } from "@app/react-bootstrap";
import { usePool } from "@app/store/slices/pools";
import {
  useReturnQuery,
  processIfNotEmptyOrNil,
  isDiscordAdminWithoutArchitus,
} from "@app/utility";
import { Snowflake } from "@app/utility/types";
import Spinner from "@architus/facade/components/Spinner";

import "./style.scss";

type AddGuildModalProps = {
  onHide: () => void;
} & Partial<ModalProps>;

const AddGuildModal: React.FC<AddGuildModalProps> = ({
  onHide,
  as,
  ...rest
}) => {
  const { all: guilds, isLoaded: guildsLoaded } = usePool({
    type: "guild",
    filter: isDiscordAdminWithoutArchitus,
  });
  const returnQuery = useReturnQuery();
  const inviteUrl = (guildId: Snowflake): string =>
    `${API_BASE}/invite/${guildId}${processIfNotEmptyOrNil(
      returnQuery,
      (q) => `?${q}`
    )}`;
  return (
    <Modal
      size="lg"
      aria-labelledby="add-guild-header"
      centered
      as={as}
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
              guild&quot; permission.
            </em>
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="guild-card-list">
          {(guildsLoaded || guilds.length > 0) &&
            guilds.map(({ id, name, icon }) => (
              <GuildCard
                id={id}
                name={name}
                icon={icon.getOrElse(undefined)}
                key={id}
                href={inviteUrl(id)}
              />
            ))}
          {!guildsLoaded && (
            // Show a spinner if the pool hasn't been completely loaded
            <Box py="micro" display="flex" justifyContent="center">
              <Spinner variant="primary" />
            </Box>
          )}
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
