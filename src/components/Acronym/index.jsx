import React from "react";
import PropTypes from "prop-types";
import { toAcronym } from "utility/string";
import { multiplyDimension } from "utility";

function Acronym({ name, baseFontSize = "1rem" }) {
  const acronymText = toAcronym(name);
  let style = { fontSize: baseFontSize };
  if (acronymText.length <= 2)
    style = { fontSize: multiplyDimension(baseFontSize, 1.25) };
  else if (acronymText.length >= 5)
    style = { fontSize: multiplyDimension(baseFontSize, 0.75) };
  return <span style={style}>{acronymText}</span>;
}

export default Acronym;

Acronym.propTypes = {
  name: PropTypes.string.isRequired,
  baseFontSize: PropTypes.string
};
