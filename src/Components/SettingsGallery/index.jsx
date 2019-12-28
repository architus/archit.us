import React, { useCallback } from "react";
import PropTypes from "prop-types";

import SettingsCategory, { propShape } from "Components/SettingsCategory";

function SettingsGallery({ categories, noCollapse, onCommit }) {
  return (
    <div className="settings-gallery">
      {categories.map((category, categoryIndex) => (
        <CategoryWrapper
          {...category}
          key={categoryIndex}
          categoryIndex={categoryIndex}
          onCommit={onCommit}
          noCollapse={noCollapse}
        />
      ))}
    </div>
  );
}

export default SettingsGallery;

SettingsGallery.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape(propShape)).isRequired,
  onCommit: PropTypes.func,
  noCollapse: PropTypes.bool
};

SettingsGallery.defaultProps = { onCommit() {}, noCollapse: false };

SettingsGallery.displayName = "SettingsGallery";

// ? =======================
// ? Helper components
// ? =======================

function CategoryWrapper({ categoryIndex, onCommit, ...rest }) {
  const specificOnCommit = useCallback(
    (...args) => onCommit(categoryIndex, args),
    [categoryIndex, onCommit]
  );
  return <SettingsCategory onCommit={specificOnCommit} {...rest} />;
}

CategoryWrapper.propTypes = {
  categoryIndex: PropTypes.number.isRequired,
  onCommit: PropTypes.func.isRequired
};

CategoryWrapper.displayName = "CategoryWrapper";
