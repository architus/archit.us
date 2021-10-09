import { styled } from "linaria/react";
import React from "react";

import HelpTooltip from "@app/components/HelpTooltip";
import Switch from "@app/components/Switch";
import { sitePadding } from "@app/layout";
import { StylableButton } from "@architus/facade/components/Button";
import Tooltip from "@architus/facade/components/Tooltip";
import Comfy from "@architus/facade/icons/comfy.svg";
import Compact from "@architus/facade/icons/compact.svg";
import Sparse from "@architus/facade/icons/sparse.svg";
import { color } from "@architus/facade/theme/color";
import { up } from "@architus/facade/theme/media";
import { shadow } from "@architus/facade/theme/shadow";
import { gap } from "@architus/facade/theme/spacing";
import { transition } from "@architus/facade/theme/motion";

const BaseButton = StylableButton<"button">();
const ViewModeButton = styled(BaseButton)`
  &[data-active="true"] {
    background-color: ${color("activeOverlay")} !important;
    box-shadow: inset 0 3px 7px ${color("activeOverlay")} !important;
  }

  svg {
    transform: translateY(2px);
  }
`;
const Styled = {
  TooltipContainer: styled.div`
    background-color: ${color("tooltip")};
    border: 1px solid ${color("tooltip")};
    box-shadow: ${shadow("z3")};
    border-radius: 4px;
    display: flex;
    color: ${color("light")};
    flex-direction: column;
    ${transition(["opacity"])}
    font-size: 0.9rem;
    padding: 10px;
    z-index: 100;
    position: relative;
  `,
};

export type GridHeaderProps = {
  filterSelfAuthored: boolean;
  onChangeFilterSelfAuthored: (newShow: boolean) => void;
  addNewRowEnable: boolean;
  onAddNewRow: () => void;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Renders an elevated header at the top of the data grid,
 * providing a set of options
 */
const GridHeader: React.FC<GridHeaderProps> = ({
  filterSelfAuthored,
  onChangeFilterSelfAuthored,
  className,
  style,
}) => (
  <Styled.GridHeader className={className} style={style}>
    <Styled.FilterSelfSwitch
      checked={filterSelfAuthored}
      onChange={onChangeFilterSelfAuthored}
      label={
        <>
          <Styled.SelfAuthorLabel>
            Filter by self-authored
          </Styled.SelfAuthorLabel>
          <HelpTooltip
            placement="top"
            tooltip="When selected, only show emoji you uploaded."
          />
        </>
      }
    />
  </Styled.GridHeader>
);

export default GridHeader;
