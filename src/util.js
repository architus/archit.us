export const mapStateToLoggedIn = state => {
  return {
    loggedIn: state.authToken !== ""
  };
};

// Sourced from A-Frame VR toolkit
export const getUrlParameter = name => {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};
