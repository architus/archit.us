import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { log, splitPath } from "utility";
import { navigate } from "@reach/router";

import GuildList from "components/GuildList";
import SideNavbar from "components/SideNavbar";
import AppContent from "./content";
import AppLayout from "./layout";

import "./style.scss";
import { tabs, DEFAULT_TAB } from "./tabs";
import { APP_HTML_CLASS, APP_PATH_ROOT } from "./config.json";

class AppRoot extends React.Component {
  constructor(props) {
    super(props);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleGuildClick = this.handleGuildClick.bind(this);
  }

  componentDidMount() {
    document.documentElement.classList.add(APP_HTML_CLASS);
  }

  componentWillUnmount() {
    document.documentElement.classList.remove(APP_HTML_CLASS);
  }

  handleTabClick(path) {
    const fragments = splitPath(window.location.pathname);
    if (fragments.length >= 2) {
      navigate(`${APP_PATH_ROOT}/${fragments[1]}/${path}`);
    } else {
      const { guildList } = this.props;
      if (guildList.length === 0) {
        // TODO open the add server dialog
      } else {
        navigate(`${APP_PATH_ROOT}/${guildList[0].id}/${path}`);
      }
    }
  }

  handleGuildClick(id) {
    const fragments = splitPath(window.location.pathname);
    if (fragments.length >= 3) {
      navigate(`${APP_PATH_ROOT}/${id}/${fragments[2]}`);
    } else {
      navigate(`${APP_PATH_ROOT}/${id}/${DEFAULT_TAB}`);
    }
  }

  render() {
    return (
      <AppLayout>
        <div className="guild-sidebar">
          <GuildList
            onClickGuild={this.handleGuildClick}
            onClickAdd={() => log("Guild add clicked")}
          />
        </div>
        <SideNavbar onClickTab={this.handleTabClick} tabs={tabs} />
        <div className="app-content">
          <React.Suspense fallback={<em>Loading...</em>}>
            <AppContent />
          </React.Suspense>
        </div>
      </AppLayout>
    );
  }
}

const mapStateToProps = state => ({
  guildList: state.guilds.guildList
});

export default connect(mapStateToProps)(AppRoot);

AppRoot.propTypes = {
  guildList: PropTypes.array.isRequired
};
