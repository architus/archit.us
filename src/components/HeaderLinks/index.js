import { connect } from "react-redux";
import NavLinkList from "../NavLinkList";

const mapStateToProps = state => {
  return {
    loggedIn: state.authToken !== ""
  };
};

const HeaderLinks = connect(mapStateToProps)(NavLinkList);
export default HeaderLinks;
