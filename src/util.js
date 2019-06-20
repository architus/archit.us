export const mapStateToLoggedIn = state => {
  return {
    loggedIn: state.authToken !== ""
  };
};
