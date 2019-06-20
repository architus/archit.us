import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    shouldRedirect: state.authToken === ""
  };
};

const AuthRedirect = ({ shouldRedirect }) =>
  shouldRedirect ? <Redirect to="/" /> : null;
const Authentication = connect(mapStateToProps)(AuthRedirect);
export default Authentication;
