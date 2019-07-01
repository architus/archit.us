import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { getGuildList } from "store/actions";
import { acronym } from "utility/string";
import classNames from "classnames";
import Placeholder from "components/Placeholder";

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
    const { guildList, hasLoaded } = this.props;
    return (
      <div className="guild-list vertical">
        {hasLoaded
          ? guildList.map(({ icon, id, name }) => (
              <GuildIcon icon={icon} id={id} name={name} width={ICON_WIDTH} />
            ))
          : [...Array(PLACEHOLDER_COUNT)].map((_e, i) => (
              <Placeholder circle light width={`${ICON_WIDTH}px`} key={i} />
            ))}
      </div>
    );
  }
}

export const mapStateToProps = state => {
  return {
    guildList: state.guilds.guildList,
    hasLoaded: state.guilds.hasLoaded,
    accessToken: state.session.accessToken,
    authenticated: state.session.authenticated
  };
};

export const mapDispatchToProps = dispatch => {
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
  authenticated: PropTypes.bool
};

function GuildIcon({ icon, id, name, className, circle, ...rest }) {
  return icon !== null ? (
    <img
      className={classNames("guild-icon", className, { circle })}
      src={`https://cdn.discordapp.com/icons/${id}/${icon}.png`}
      alt={name}
      {...rest}
    />
  ) : (
    <div className="guild-text-icon">
      <span>{acronym(name)}</span>
    </div>
  );
}

GuildIcon.propTypes = {
  icon: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  className: PropTypes.string,
  circle: PropTypes.bool
};

GuildList.GuildIcon = GuildIcon;
