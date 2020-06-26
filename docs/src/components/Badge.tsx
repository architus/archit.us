import { styled } from "linaria/react";

/**
 * Pill-style inline badge that adopts the surrounding text's size
 */
const Badge = styled.span`
  display: inline-block;
  font-size: 55%;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 8px;

  // TODO figure out variant
  color: #fff;
  background-color: #6496c4;

  font-weight: 400;
  padding: 0.45em 0.6em 0.35em;
  margin-left: 0.4em;
  margin-top: 0.1em;
  top: -0.1em;
  position: relative;
`;

export default Badge;
