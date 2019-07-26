import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { splitPath, isNil } from "utility";
import { navigate, Location } from "@reach/router";
import { getAutbotGuilds } from "store/reducers/guilds";

import Swipe from "react-easy-swipe";
import GuildList from "components/GuildList";
import SideNavbar from "components/SideNavbar";
import AppContent from "./content";
import AppLayout from "./layout";
import AddGuildModal from "components/AddGuildModal";
import Icon from "components/Icon";

import "./style.scss";
import { tabs, DEFAULT_TAB } from "./tabs";
import { APP_HTML_CLASS, APP_PATH_ROOT } from "./config.json";

class AppRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addGuildModalShow: false, showAppNav: true };

    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleGuildClick = this.handleGuildClick.bind(this);
    this.showAddGuildModal = this.showAddGuildModal.bind(this);
    this.hideAddGuildModal = this.hideAddGuildModal.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.showAppNav = this.showAppNav.bind(this);
    this.closeAppNav = this.closeAppNav.bind(this);
  }

  showAddGuildModal() {
    this.setState({ addGuildModalShow: true });
  }

  hideAddGuildModal() {
    this.setState({ addGuildModalShow: false });
  }

  componentDidMount() {
    document.documentElement.classList.add(APP_HTML_CLASS);
  }

  componentWillUnmount() {
    document.documentElement.classList.remove(APP_HTML_CLASS);
  }

  handleExpandClick() {
    this.setState(state => ({ showAppNav: !state.showAppNav }));
  }

  showAppNav() {
    this.setState({ showAppNav: true });
  }

  closeAppNav() {
    this.setState({ showAppNav: false });
  }

  handleTabClick(path) {
    const fragments = splitPath(window.location.pathname);
    let navigateTo = null;
    if (fragments.length >= 2) {
      navigateTo = `${APP_PATH_ROOT}/${fragments[1]}/${path}`;
    } else {
      const { guildList, guildsLoaded } = this.props;
      if (!guildsLoaded) return;
      if (guildList.length === 0) {
        this.showAddGuildModal();
        return;
      } else {
        let defaultGuild = guildList[0];
        const adminGuilds = guildList.filter(g => g.autbot_admin);
        if (adminGuilds.length > 0) defaultGuild = adminGuilds[0];
        navigateTo = `${APP_PATH_ROOT}/${defaultGuild.id}/${path}`;
      }
    }
    if (!isNil(navigateTo)) {
      navigate(navigateTo);
      if (this.state.showAppNav) this.closeAppNav();
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
    const { addGuildModalShow, showAppNav } = this.state;

    return (
      <Swipe
        onSwipeLeft={this.closeAppNav}
        onSwipeRight={this.showAppNav}
        tolerance={50}
      >
        <AppLayout className={showAppNav ? "show" : ""}>
          <div className="app-nav">
            <div className="guild-sidebar">
              <GuildList
                onClickGuild={this.handleGuildClick}
                onClickAdd={this.showAddGuildModal}
              />
            </div>
            <SideNavbar onClickTab={this.handleTabClick} tabs={tabs} />
          </div>
          <button
            className="app--expand-button"
            onClick={this.handleExpandClick}
          >
            <Icon className="color" name="chevron-right" />
          </button>
          <button className="app--overlay-button" onClick={this.closeAppNav} />
          <Location>
            {({ location }) => {
              const fragments = splitPath(location.pathname);
              const currentTab = fragments.length >= 3 ? fragments[2] : "";
              const filtered = tabs.filter(t => t.path === currentTab);
              return (
                <div
                  className={classNames(
                    "app-content",
                    filtered.length > 0 ? filtered[0].contentClass : ""
                  )}
                >
                  <AddGuildModal
                    show={addGuildModalShow}
                    onHide={this.hideAddGuildModal}
                  />
                  <React.Suspense fallback={<em>Loading...</em>}>
                    <AppContent openAddGuild={this.showAddGuildModal} />
                  </React.Suspense>
                </div>
              );
            }}
          </Location>
        </AppLayout>
      </Swipe>
    );
  }
}

const mapStateToProps = state => ({
  guildList: getAutbotGuilds(state),
  guildsLoaded: state.guilds.hasLoaded
});

export default connect(mapStateToProps)(AppRoot);

AppRoot.propTypes = {
  guildList: PropTypes.array.isRequired,
  guildsLoaded: PropTypes.bool.isRequired
};
