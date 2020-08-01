import { styled } from "linaria/react";
import { transparentize } from "polished";
import React, { useState, useCallback } from "react";
import { IoMdClose } from "react-icons/io";

import AutoLink from "@architus/facade/components/AutoLink";
import { color, staticColor } from "@architus/facade/theme/color";
import { blankButton } from "@architus/facade/theme/mixins";
import { transition } from "@architus/facade/theme/motion";
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
  CloseButton: styled.div`
    ${blankButton()}
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.5rem;
    color: ${color("textStrong")};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;

    ${transition(["opacity"])}
    opacity: 0.3;

    &:hover {
      opacity: 0.7;
    }

    &:active {
      opacity: 1;
    }
  `,
};

export type MigrationAlertProps = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Shows a migration alert to users upon their first visit until they dismiss the alert
 */
const MigrationAlert: React.FC<MigrationAlertProps> = ({
  className,
  style,
}) => {
  const storageKey = "autoResponseMigration";
  const initialValue = window.localStorage.getItem(storageKey) !== "true";
  const [show, setShow] = useState(initialValue);
  const hide = useCallback((): void => {
    setShow(false);
    window.localStorage.setItem(storageKey, "true");
  }, [setShow]);

  return (
    <>
      {show && (
        <Styled.Alert className={className} style={style}>
          <Styled.CloseButton onClick={hide}>
            <IoMdClose />
          </Styled.CloseButton>
          <strong>Notice</strong>: Old auto response triggers have been turned
          into their equivalent regular expression triggers on servers with{" "}
          <em>regular expression auto responses</em> enabled in order to
          preserve old whitespace behavior. For more information on auto
          responses check out{" "}
          <AutoLink href="https://docs.archit.us/features/auto-responses">
            the docs
          </AutoLink>
          , and to learn more about all of the new features that arrived in
          v0.2.0, check out{" "}
          <AutoLink href="https://docs.archit.us/changelog/v0.2.0/">
            the changelog
          </AutoLink>
          .
        </Styled.Alert>
      )}
    </>
  );
};

export default MigrationAlert;
