import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { getGuildList } from "store/actions";
import { getAutbotGuilds } from "store/reducers/guilds";
import { splitPath } from "utility";

import Placeholder from "components/Placeholder";
import GuildIcon from "components/GuildIcon";
import Tooltip from "components/Tooltip";
import Icon from "components/Icon";
import { Location } from "@reach/router";

import "./style.scss";

const PLACEHOLDER_COUNT = 3;
const ICON_WIDTH = 52;

class GuildList extends React.Component {
  componentDidMount() {
    this.tryGetGuilds();
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.authenticated && this.props.authenticated) {
      this.tryGetGuilds();
    }
  }

  tryGetGuilds() {
    const { authenticated, getGuilds } = this.props;
    if (authenticated) {
      getGuilds(this.props.accessToken);
    }
  }

  render() {
    const { guildList, hasLoaded, onClickGuild, onClickAdd } = this.props;
    const squareStyle = { width: `${ICON_WIDTH}px`, height: `${ICON_WIDTH}px` };
    const autbotAdminGuilds = guildList.filter(guild => guild.autbot_admin);
    const otherGuilds = guildList.filter(guild => !guild.autbot_admin);
    return (
      <div className="guild-list vertical">
        {hasLoaded ? (
          <Location>
            {({ location }) => {
              const fragments = splitPath(location.pathname);
              const activeGuildId = fragments.length >= 2 ? fragments[1] : null;
              return (
                <>
                  {autbotAdminGuilds.length > 0 ? (
                    <Section
                      guilds={autbotAdminGuilds}
                      onClickGuild={onClickGuild}
                      iconStyle={squareStyle}
                      activeGuildId={activeGuildId}
                      elevated
                      className="guild-list--section__elevated"
                    />
                  ) : null}
                  {otherGuilds.length > 0 ? (
                    <Section
                      guilds={otherGuilds}
                      onClickGuild={onClickGuild}
                      iconStyle={squareStyle}
                      activeGuildId={activeGuildId}
                    />
                  ) : null}
                  <Tooltip right text="Add architus to a server...">
                    <AddButton style={squareStyle} onClick={onClickAdd} />
                  </Tooltip>
                </>
              );
            }}
          </Location>
        ) : (
          [...Array(PLACEHOLDER_COUNT)].map((_e, i) => (
            <Placeholder.Auto circle width={`${ICON_WIDTH}px`} key={i} />
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    guildList: getAutbotGuilds(state),
    hasLoaded: state.guilds.hasLoaded,
    accessToken: state.session.accessToken,
    authenticated: state.session.authenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGuilds: accessToken => dispatch(getGuildList(accessToken))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuildList);

GuildList.propTypes = {
  guildList: PropTypes.array,
  accessToken: PropTypes.string,
  getGuilds: PropTypes.func,
  hasLoaded: PropTypes.bool,
  authenticated: PropTypes.bool,
  onClickGuild: PropTypes.func,
  onClickAdd: PropTypes.func
};

// ? =================
// ? Helper components
// ? =================

function AddButton({ onClick, className, ...rest }) {
  return (
    <button
      className={classNames("guild-add-button", className)}
      onClick={onClick}
      {...rest}
    >
      <Icon name="plus" />
    </button>
  );
}

AddButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string
};

function Section({
  guilds,
  onClickGuild,
  style,
  iconStyle,
  elevated = false,
  activeGuildId = null
}) {
  return (
    <div className="guild-list--section">
      {guilds.map(({ icon, id, name }) => (
        <GuildIcon
          icon={icon}
          id={id}
          name={name}
          key={id}
          width={ICON_WIDTH}
          onClick={() => onClickGuild(id)}
          style={iconStyle}
          tabIndex="0"
          elevated={elevated}
          className={id === activeGuildId ? "guild-icon__active" : null}
        />
      ))}
      <hr />
    </div>
  );
}

Section.propTypes = {
  guilds: PropTypes.array,
  onClickGuild: PropTypes.func,
  style: PropTypes.object,
  iconStyle: PropTypes.object,
  elevated: PropTypes.bool,
  activeGuildId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
