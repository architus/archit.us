import { styled } from "linaria/react";
import { transparentize } from "polished";
import React, { useState, useCallback } from "react";

import CloseButton from "@app/components/CloseButton";
import { color, staticColor } from "@architus/facade/theme/color";
import { gap } from "@architus/facade/theme/spacing";

const Styled = {
  Alert: styled.div`
    display: block;
    position: relative;
    margin-top: calc(-1 * ${gap.pico});
    font-size: 0.95em;
    padding: ${gap.nano} 48px ${gap.nano} ${gap.micro};
    color: ${color("textFade")};
    background-color: ${transparentize(0.85, staticColor("info"))};
    border: 1px solid ${transparentize(0.5, staticColor("info"))};
    border-radius: 6px;
  `,
  CloseButton: styled(CloseButton)`
    position: absolute;
    top: 0;
    right: 0;
  `,
};

export type IntegrityAlertProps = {
  sKey: string;
  message: string;
  enabled: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Shows an integrity alert to users upon their first visit until they dismiss the alert
 */
const IntegrityAlert: React.FC<IntegrityAlertProps> = ({
  sKey,
  message,
  enabled,
  className,
  style,
}) => {
  const initialValue = window.localStorage.getItem(sKey) !== "true";
  const [show, setShow] = useState(initialValue);
  const hide = useCallback((): void => {
    setShow(false);
    window.localStorage.setItem(sKey, "true");
  }, [setShow]);

  return (
    <>
      {enabled && show && (
        <Styled.Alert className={className} style={style}>
          <Styled.CloseButton onClick={hide} />
          <strong>Notice</strong>: {message}
        </Styled.Alert>
      )}
    </>
  );
};

export default IntegrityAlert;
