import classNames from "classnames";
import React from "react";
import "./style.scss";

type WindowVariant = "discord" | "light";

type WindowProps = {
  children: React.ReactNode;
  variant: WindowVariant;
  className?: string;
  noPadding?: boolean;
  noChrome?: boolean;
} & Partial<React.HTMLAttributes<HTMLElement>>;

const Window: React.FC<WindowProps> = ({
  children,
  variant = "light",
  className,
  noPadding = false,
  noChrome = false,
  ...rest
}) => (
  <figure
    className={classNames("window", `window--${variant}`, className, {
      "pb-0": noPadding,
    })}
    {...rest}
  >
    {!noChrome ? (
      <figcaption className="chrome">
        <span className="chrome--button chrome--close" />
        <span className="chrome--button chrome--minimize" />
        <span className="chrome--button chrome--fullscreen" />
      </figcaption>
    ) : null}
    {children}
  </figure>
);

Window.displayName = "Window";

export default Window;
