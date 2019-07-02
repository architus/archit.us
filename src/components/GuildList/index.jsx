import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { getGuildList } from "store/actions";
import { getAutbotGuilds } from "store/reducers/guilds";

import Placeholder from "components/Placeholder";
import GuildIcon from "components/GuildIcon";
import Icon from "components/Icon";

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
    return (
      <div className="guild-list vertical">
        {hasLoaded
          ? [
              ...guildList.map(({ icon, id, name }) => (
                <GuildIcon
                  icon={icon}
                  id={id}
                  name={name}
                  key={id}
                  width={ICON_WIDTH}
                  onClick={() => onClickGuild(id)}
                  style={squareStyle}
                />
              )),
              <AddButton
                key="guild-add"
                style={squareStyle}
                onClick={onClickAdd}
              />
            ]
          : [...Array(PLACEHOLDER_COUNT)].map((_e, i) => (
              <Placeholder circle light width={`${ICON_WIDTH}px`} key={i} />
            ))}
      </div>
    );
  }
}

export const mapStateToProps = state => {
  return {
    guildList: getAutbotGuilds(state),
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
  authenticated: PropTypes.bool,
  onClickGuild: PropTypes.func,
  onClickAdd: PropTypes.func
};

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
