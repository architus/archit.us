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

export const addMissingUnit = dimension =>
  isNaN(dimension) ? dimension : `${dimension}px`;

export const multiplyDimension = (dimension, scalar) => {
  if (typeof dimension === "number") return dimension * scalar;
  else if (!isNaN(dimension)) return Number.parseFloat(dimension) * scalar;
  else {
    const dimensionRegex = /^([0-9]*\.?[0-9]*)([A-Za-z%]+)$/g;
    const matches = dimensionRegex.exec(dimension);
    console.log({ dimension, scalar, matches });
    return `${(Number.parseFloat(matches[1]) * scalar).toFixed(3)}${
      matches[2]
    }`;
  }
};
