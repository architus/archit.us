import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { splitPath, isNil } from "utility";
import { navigate } from "@reach/router";

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
        navigateTo = `${APP_PATH_ROOT}/${guildList[0].id}/${path}`;
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
        <button className="app--expand-button" onClick={this.handleExpandClick}>
          <Icon class="color" name="chevron-right" />
        </button>
        <button className="app--overlay-button" onClick={this.closeAppNav} />
        <div className="app-content">
          <AddGuildModal
            show={addGuildModalShow}
            onHide={this.hideAddGuildModal}
          />
          <React.Suspense fallback={<em>Loading...</em>}>
            <AppContent openAddGuild={this.showAddGuildModal} />
          </React.Suspense>
        </div>
      </AppLayout>
    );
  }
}

const mapStateToProps = state => ({
  guildList: state.guilds.guildList,
  guildsLoaded: state.guilds.hasLoaded
});

export default connect(mapStateToProps)(AppRoot);

AppRoot.propTypes = {
  guildList: PropTypes.array.isRequired,
  guildsLoaded: PropTypes.bool.isRequired
};
