import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isDefined } from "Utility";
import "./style.scss";

function Card({ children, className, header, ...rest }) {
  return (
    <div className={classNames(className, "card_ shadow")} {...rest}>
      {isDefined(header) ? (
        <div className="card_--header">
          <h4>{header}</h4>
        </div>
      ) : null}
      <div className="card_--body" children={children} />
    </div>
  );
}

export default Card;

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  header: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  className: PropTypes.string
};

Card.defaultProps = {
  className: "",
  header: null
};

Card.displayName = "Card";
