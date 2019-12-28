import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isDefined, useCallbackOnce } from "Utility";

import SettingsCard, {
  propShape as cardPropShape
} from "Components/SettingsCard";
import Icon from "Components/Icon";

import "./style.scss";

function SettingsCategory({ title, cards, noCollapse, onCommit }) {
  const hasTitle = isDefined(title);

  // Open/close behavior (enabled on small screens)
  const [open, setOpen] = useState(!hasTitle);
  const onExpandClick = useCallbackOnce(() => setOpen(open => !open));

  return (
    <div
      className={classNames("settings-category", {
        expandable: hasTitle && !(isDefined(noCollapse) && noCollapse),
        open
      })}
    >
      {hasTitle ? (
        <h3 className="settings-category--title" onClick={onExpandClick}>
          <Icon
            name="chevron-right"
            className="settings-category--title-expander"
          />
          {title}
        </h3>
      ) : null}
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
export const propShape = {
  cards: PropTypes.arrayOf(PropTypes.shape(cardPropShape)).isRequired,
  title: PropTypes.string
};

SettingsCategory.propTypes = {
  ...propShape,
  onCommit: PropTypes.func,
  noCollapse: PropTypes.bool
};

SettingsCategory.defaultProps = { onCommit() {}, noCollapse: false };

SettingsCategory.displayName = "SettingsCategory";

// ? =======================
// ? Helper components
// ? =======================

function CardWrapper({ cardIndex, onCommit, ...rest }) {
  const specificOnCommit = useCallback((...args) => onCommit(cardIndex, args), [
    cardIndex,
    onCommit
  ]);
  return <SettingsCard onCommit={specificOnCommit} {...rest} />;
}

CardWrapper.propTypes = {
  cardIndex: PropTypes.number.isRequired,
  onCommit: PropTypes.func.isRequired
};

CardWrapper.displayName = "CardWrapper";
