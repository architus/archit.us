import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { isDefined } from "utility";

import SettingsCard, { propShape } from "components/SettingsCard";

import "./style.scss";

function SettingsCategory({ title, cards, onCommit }) {
  return (
    <div className="settings-category">
      {isDefined(title) ? <h3>{title}</h3> : null}
      <div className="settings-category--container">
        {cards.map((card, cardIndex) => (
          <CardWrapper
            {...card}
            key={cardIndex}
            cardIndex={cardIndex}
            onCommit={onCommit}
          />
        ))}
      </div>
    </div>
  );
}

export default SettingsCategory;

SettingsCategory.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape(propShape)).isRequired,
  title: PropTypes.string,
  onCommit: PropTypes.func
};

SettingsCategory.defaultProps = { onCommit() {} };

SettingsCategory.displayName = "SettingsCategory";

// ? =======================
// ? Helper components
// ? =======================

function CardWrapper({ cardIndex, onCommit, ...rest }) {
  const specificOnCommit = useCallback((...args) => onCommit(cardIndex, args), [
    cardIndex
  ]);
  return <SettingsCard onCommit={specificOnCommit} {...rest} />;
}

CardWrapper.propTypes = {
  cardIndex: PropTypes.number.isRequired,
  onCommit: PropTypes.func.isRequired
};

CardWrapper.displayName = "CardWrapper";
