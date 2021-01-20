import { styled } from "linaria/react";
import React from "react";

const Styled = {
  SwitchContainer: styled.div`
    width: 100%;
    height: 100%;
    .toggle-switch {
      position: relative;
      margin-right: 10px;
      width: 75px;
      display: inline-block;
      vertical-align: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      text-align: left;
      &-checkbox {
        display: none;
      }
      &-label {
        display: block;
        overflow: hidden;
        cursor: pointer;
        border: 0 solid #bbb;
        border-radius: 20px;
        margin: 0;
        &:focus {
          outline: none;
          > span {
            box-shadow: 0 0 2px 5px red;
          }
        }
        > span:focus {
          outline: none;
        }
      }
      &-inner {
        display: block;
        width: 200%;
        margin-left: -100%;
        transition: margin 0.3s ease-in 0s;
        &:before,
        &:after {
          display: block;
          float: left;
          width: 50%;
          height: 34px;
          padding: 0;
          line-height: 34px;
          font-size: 14px;
          color: white;
          font-weight: bold;
          box-sizing: border-box;
        }
        &:before {
          content: attr(data-yes);
          text-transform: uppercase;
          padding-left: 10px;
          background-color: #2f855a;
          color: white;
        }
      }
      &-disabled {
        background-color: #ddd;
        cursor: not-allowed;
        &:before {
          background-color: #ddd;
          cursor: not-allowed;
        }
      }
      &-inner:after {
        content: attr(data-no);
        text-transform: uppercase;
        padding-right: 10px;
        background-color: #bbb;
        color: white;
        text-align: right;
      }
      &-switch {
        display: block;
        width: 24px;
        margin: 5px;
        background: white;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 40px;
        border: 0 solid #bbb;
        border-radius: 20px;
        transition: all 0.3s ease-in 0s;
      }
      &-checkbox:checked + &-label {
        .toggle-switch-inner {
          margin-left: 0;
        }
        .toggle-switch-switch {
          right: 0px;
        }
      }
      &.small-switch {
        width: 40px;
        .toggle-switch-inner {
          &:after,
          &:before {
            content: "";
            height: 20px;
            line-height: 20px;
          }
        }
        .toggle-switch-switch {
          width: 16px;
          right: 20px;
          margin: 2px;
        }
      }
      @media screen and (max-width: 991px) {
        transform: scale(0.9);
      }
      @media screen and (max-width: 767px) {
        transform: scale(0.825);
      }
      @media screen and (max-width: 575px) {
        transform: scale(0.75);
      }
    }
  `,
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  id,
  name,
  checked,
  onChange,
  optionLabels,
  small,
  disabled,
}) => {
  function handleKeyPress(e) {
    if (e.keyCode !== 32) return;

    e.preventDefault();
    onChange(!checked);
  }

  return (
    <Styled.SwitchContainer>
      <div className={"toggle-switch" + (small ? " small-switch" : "")}>
        <input
          type="checkbox"
          name={name}
          className="toggle-switch-checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        {id ? (
          <label
            className="toggle-switch-label"
            tabIndex={disabled ? -1 : 1}
            onKeyDown={(e) => handleKeyPress(e)}
            htmlFor={id}
          >
            <span
              className={
                disabled
                  ? "toggle-switch-inner toggle-switch-disabled"
                  : "toggle-switch-inner"
              }
              data-yes="yes"
              data-no="no"
              tabIndex={-1}
            />
            <span
              className={
                disabled
                  ? "toggle-switch-switch toggle-switch-disabled"
                  : "toggle-switch-switch"
              }
              tabIndex={-1}
            />
          </label>
        ) : null}
      </div>
    </Styled.SwitchContainer>
  );
};

type ToggleSwitchProps = {
  id: string;
  checked: boolean;
  onChange: unknown;
  name: string;
  optionLabels?: unknown[];
  small?: boolean;
  disabled?: boolean;
};

export default ToggleSwitch;
