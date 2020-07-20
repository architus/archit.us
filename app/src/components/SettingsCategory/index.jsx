import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";

import Icon from "@app/components/Icon";
import SettingsCard, {
  propShape as cardPropShape,
} from "@app/components/SettingsCard";
import { isDefined, useCallbackOnce } from "@app/utility";

import "./style.scss";

function SettingsCategory({ title, cards, noCollapse, onCommit }) {
  const hasTitle = isDefined(title);

  // Open/close behavior (enabled on small screens)
  const [open, setOpen] = useState(!hasTitle);
  const onExpandClick = useCallbackOnce(() => setOpen((open) => !open));

  return (
    <div
      className={classNames("settings-category", {
        expandable: hasTitle && !(isDefined(noCollapse) && noCollapse),
        open,
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
  title: PropTypes.string,
};

SettingsCategory.propTypes = {
  ...propShape,
  onCommit: PropTypes.func,
  noCollapse: PropTypes.bool,
};

SettingsCategory.defaultProps = { onCommit() {}, noCollapse: false };

SettingsCategory.displayName = "SettingsCategory";

// ? =======================
// ? Helper components
// ? =======================

function CardWrapper({ cardIndex, onCommit, ...rest }) {
  const specificOnCommit = useCallback((...args) => onCommit(cardIndex, args), [
    cardIndex,
    onCommit,
  ]);
  return <SettingsCard onCommit={specificOnCommit} {...rest} />;
}

CardWrapper.propTypes = {
  cardIndex: PropTypes.number.isRequired,
  onCommit: PropTypes.func.isRequired,
};

CardWrapper.displayName = "CardWrapper";
