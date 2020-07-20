import React from "react";

import {
  multiplyDimension,
  toAcronym,
  parseDimension,
  formatDimension,
} from "@app/utility";
import { RawDimension, StyleObject } from "@app/utility/types";

type AcronymProps = {
  name: string;
  baseFontSize?: RawDimension;
  style?: StyleObject;
};

const Acronym: React.FC<AcronymProps> = ({
  name,
  baseFontSize = "1rem",
  style = {},
}) => {
  const acronymText = toAcronym(name);
  let multiplier = 1;
  if (acronymText.length <= 2) multiplier = 1.25;
  else if (acronymText.length >= 5) multiplier = 0.75;

  return (
    <span
      style={{
        fontSize: parseDimension(baseFontSize)
          .map((d) => formatDimension(multiplyDimension(d, multiplier)))
          .getOrElse("1rem"),
        ...style,
      }}
    >
      {acronymText}
    </span>
  );
};

export default Acronym;
