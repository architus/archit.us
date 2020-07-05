import React from "react";

import { isNil } from "@lib/utility";
import CombinedSvg from "@design/assets/logo/logo.svg";
import LogotypeSvg from "@design/assets/logo/logo-text.svg";
import SymbolSvg from "@design/assets/logo/logo-symbol.svg";

/**
 * Adds auto sizing if no sizing props have been supplied
 * @param props - Partial props passed into logo component
 */
function foldDefaults(
  props: React.HTMLProps<SVGElement>
): React.HTMLProps<SVGElement> {
  let base = {};
  if (isNil(props.height) && isNil(props.width)) {
    base = {
      height: "40px",
      width: undefined,
    };
  }
  return Object.assign(base, props);
}

/**
 * Combined logo with the symbol and logotype text
 */
const Combined: React.FC<React.HTMLProps<SVGElement>> = (props) => (
  <CombinedSvg {...foldDefaults(props)} />
);

/**
 * Logo with just the Architus text
 */
const Logotype: React.FC<React.HTMLProps<SVGElement>> = (props) => (
  <LogotypeSvg {...foldDefaults(props)} />
);

/**
 * Logo with just the Architus symbol/icon
 */
const Symbol: React.FC<React.HTMLProps<SVGElement>> = (props) => (
  <SymbolSvg {...foldDefaults(props)} />
);

export default { Combined, Logotype, Symbol };
