import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { getGuildList } from "store/actions";

class GuildList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getGuilds(this.props.accessToken);
  }

  render() {
    const { guildList } = this.props;

    return <div>{guildList}</div>;
  }
}

export const mapStateToProps = state => {
  return {
    guildList: state.guilds.guildList,
    accessToken: state.session.accessToken
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

GuildList.PropTypes = {
  guildList: PropTypes.array,
  accessToken: PropTypes.string,
  getGuilds: PropTypes.func
};
