import React from "react";
import { styled } from "linaria/react";

const Styled = {
  IframeWrapper: styled.div`
    position: relative;
    width: 100%;

    iframe {
      width: 100%;
    }
  `,
};

type IframeProps = {
  className?: string;
  style?: React.CSSProperties;
  height?: string | number;
  src: string;
  title: string;
} & React.IframeHTMLAttributes<HTMLIFrameElement>;

/**
 * Responsive iframe element
 */
const Iframe: React.FC<IframeProps> = ({
  className,
  style,
  height = 300,
  src,
  title,
  ...rest
}) => {
  return (
    <Styled.IframeWrapper className={className} style={style}>
      <iframe
        title={title}
        src={src}
        height={height}
        frameBorder="0"
        {...rest}
      />
    </Styled.IframeWrapper>
  );
};

export default Iframe;
