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
  GridHeader: styled.div`
    display: flex;
    min-height: ${gap.centi};
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    z-index: 4;

    box-shadow: ${shadow("z0")};
    background-color: ${color("bg+10")};
    padding: ${gap.femto} 0;

    & > * {
      margin-top: ${gap.femto};
      margin-bottom: ${gap.femto};
    }

    ${up("md")} {
      border-top-left-radius: 1rem;
    }
  `,
  ViewModeButtonGroup: styled.div`
    padding: 0 0.25rem;
    border-radius: 0.5rem;
    margin-left: auto;

    ${up("lg")} {
      margin-right: ${sitePadding};
    }

    & > * {
      &:not(:first-of-type) ${ViewModeButton} {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      &:not(:last-of-type) ${ViewModeButton} {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  `,
  ViewModeButton,
  ViewModeTooltip: styled(Tooltip)`
    display: inline-block;
  `,
  FilterSwitch: styled(Switch)`
    padding: 0 1rem;
  `,
  FilterSelfSwitch: styled(Switch)`
    padding: 0 1rem;
  `,
  SelfAuthorLabel: styled.span`
    margin-right: ${gap.nano};
  `,
};

export type ViewMode = keyof typeof viewModes;
const viewModeOrder: ViewMode[] = ["Sparse", "Comfy", "Compact"];
export const viewModes = {
  Compact: { icon: Compact, label: "Compact", height: 28 },
  Comfy: { icon: Comfy, label: "Comfy", height: 36 },
  Sparse: { icon: Sparse, label: "Sparse", height: 44 },
} as const;

export type GridHeaderProps = {
  viewMode: ViewMode;
  setViewMode: (newMode: ViewMode) => void;
  showFilters: boolean;
  onChangeShowFilters: (newShow: boolean) => void;
  filterSelfAuthored: boolean;
  onChangeFilterSelfAuthored: (newShow: boolean) => void;
  deleteSelectedEnable: boolean;
  onDeleteSelected: () => void;
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
  viewMode,
  setViewMode,
  showFilters,
  onChangeShowFilters,
  filterSelfAuthored,
  onChangeFilterSelfAuthored,
  className,
  style,
}) => (
  <Styled.GridHeader className={className} style={style}>
    <Styled.FilterSwitch
      label="Show filters"
      checked={showFilters}
      onChange={onChangeShowFilters}
    />
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
            tooltip="When selected, only show auto responses you have authored"
          />
        </>
      }
    />
    <Styled.ViewModeButtonGroup>
      {viewModeOrder.map((key) => {
        const Icon = viewModes[key].icon;
        return (
          <Styled.ViewModeTooltip
            placement="top"
            tooltip={viewModes[key].label}
            key={key}
          >
            <Styled.ViewModeButton
              type="ghost"
              size="compact"
              onClick={(): void => setViewMode(key as ViewMode)}
              data-active={viewMode === key ? "true" : undefined}
            >
              <Icon />
            </Styled.ViewModeButton>
          </Styled.ViewModeTooltip>
        );
      })}
    </Styled.ViewModeButtonGroup>
  </Styled.GridHeader>
);

export default GridHeader;
