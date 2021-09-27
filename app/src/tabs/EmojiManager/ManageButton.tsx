import { styled } from "linaria/react";
import React from "react";

import HelpTooltip from "@app/components/HelpTooltip";
import Switch from "@app/components/Switch";
import { sitePadding } from "@app/layout";
import Button, { StylableButton } from "@architus/facade/components/Button";
import Tooltip from "@architus/facade/components/Tooltip";
import Comfy from "@architus/facade/icons/comfy.svg";
import Compact from "@architus/facade/icons/compact.svg";
import Sparse from "@architus/facade/icons/sparse.svg";
import { color, hybridColor } from "@architus/facade/theme/color";
import { up } from "@architus/facade/theme/media";
import { shadow } from "@architus/facade/theme/shadow";
import { gap } from "@architus/facade/theme/spacing";
import { useColorMode } from "@architus/facade/hooks";
import { FaUpload } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { cacheCustomEmoji, loadCustomEmoji } from "@app/store/routes";
import { HoarFrost, Snowflake } from "src/utility/types";


const Styled = {
  IconWrapper: styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    color: ${color("success")};
    font-size: 1.2em;
    padding: 4px 0;
  `,
};

type ButtonType = "load" | "cache" | "delete";

export type ManageButtonProps = {
  type: ButtonType,
  disabled: boolean,
  guildId: Snowflake,
  emojiId: HoarFrost,
};

/**
 * Button for using in emoji manager data grid
 */
const ManageButton: React.FC<ManageButtonProps> = React.memo(({
  type, disabled, guildId, emojiId
}) => {
  const colorMode = useColorMode();
  const dispatch = useDispatch();
  return (
    <Button
      type="solid"
      size="compact"
      disabled={disabled}
      color={hybridColor("bg+10", colorMode)}
    >
      <Styled.IconWrapper>
        <FaUpload
          color={color("info")}
          onClick={() => {
            console.log("dispatch cache")
            dispatch(cacheCustomEmoji({ routeData: { guildId, emojiId } }))
          }
          }
        />
      </Styled.IconWrapper>
    </Button>
)});

export default ManageButton;
