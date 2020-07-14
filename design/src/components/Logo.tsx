import React from "react";

import SymbolSvg from "@design/assets/logo/logo-symbol.svg";
import LogotypeSvg from "@design/assets/logo/logo-text.svg";
import CombinedSvg from "@design/assets/logo/logo.svg";
import { isNil } from "@lib/utility";

/**
 * Adds auto sizing if no sizing props have been supplied
 * @param props - Partial props passed into logo component
 */
function foldDefaults(
  props: React.SVGAttributes<SVGElement>
): React.SVGAttributes<SVGElement> {
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
const Combined: React.FC<React.SVGAttributes<SVGElement>> = (props) => (
  <CombinedSvg {...foldDefaults(props)} />
);

/**
 * Logo with just the Architus text
 */
const Logotype: React.FC<React.SVGAttributes<SVGElement>> = (props) => (
  <LogotypeSvg {...foldDefaults(props)} />
);

/**
 * Logo with just the Architus symbol/icon
 */
const Symbol: React.FC<React.SVGAttributes<SVGElement>> = (props) => (
  <SymbolSvg {...foldDefaults(props)} />
);

export default { Combined, Logotype, Symbol };
