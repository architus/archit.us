import React from "react";
import classNames from "classnames";
import { isDefined } from "Utility";
import "./style.scss";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
} & Partial<React.HTMLAttributes<HTMLDivElement>>;

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  header = null,
  ...rest
}) => (
  <div className={classNames(className, "card_ shadow")} {...rest}>
    {isDefined(header) ? (
      <div className="card_--header">
        <h4>{header}</h4>
      </div>
    ) : null}
    <div className="card_--body">{children}</div>
  </div>
);

Card.displayName = "Card";

export default Card;
