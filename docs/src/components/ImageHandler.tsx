import React, { useEffect, useCallback, useState } from "react";
import { styled } from "linaria/react";

import { None, Some, Option } from "@lib/option";
import { isDefined } from "@lib/utility";
import Lightbox from "@design/components/Lightbox";
import { up, between } from "@design/theme";
import {
  minimizeBreakpoint,
  collapseBreakpoint,
  fullDrawerWidth,
  minimizedDrawerWidth,
  headerHeight,
  sitePadding,
} from "@docs/layout";

const Styled = {
  Lightbox: styled(Lightbox)`
    padding-top: ${headerHeight};
    padding-right: ${sitePadding};
    padding-left: ${sitePadding};

    ${up(minimizeBreakpoint)} {
      padding-left: calc(${fullDrawerWidth} + ${sitePadding});
    }

    ${between(collapseBreakpoint, minimizeBreakpoint)} {
      padding-left: calc(${minimizedDrawerWidth} + ${sitePadding});
    }
  `,
};

export type ImageHandlerProps = {
  forwardedRef: React.RefObject<HTMLElement | null>;
  targetLinkClass?: string;
};

/**
 * Used to enable showing full-screen image previews.
 * Uses a jQuery-esque strategy that attaches onClick handlers to all
 * links under this component in the tree that have the given class
 * (`.gatsby-resp-image-link` by default).
 * Images gracefully fall back without JavaScript by linking to the actual
 * source images
 */
const ImageHandler: React.FC<ImageHandlerProps> = ({
  children,
  forwardedRef,
  targetLinkClass = "gatsby-resp-image-link",
}) => {
  const [currentImage, setCurrentImage] = useState<Option<[string, number]>>(
    None
  );
  const showFullScreen = useCallback(
    (src: string, aspectRatio: number): void => {
      setCurrentImage(Some([src, aspectRatio]));
    },
    [setCurrentImage]
  );

  // Attach event listeners
  useEffect(() => {
    const attachedHandlers: [Element, string, EventListener][] = [];
    const parent = forwardedRef.current;
    if (isDefined(parent)) {
      const linkCollection = parent.getElementsByClassName(targetLinkClass);
      for (let i = 0; i < linkCollection.length; ++i) {
        const element = linkCollection[i];
        const fullScale = element.getAttribute("href");
        if (isDefined(fullScale) && fullScale.trim().length > 0) {
          const handler: EventListener = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const bounds = element.getBoundingClientRect();
            showFullScreen(fullScale, bounds.width / bounds.height);
          };
          element.addEventListener("click", handler);
          attachedHandlers.push([element, "click", handler]);
        }
      }
    }

    // Cleanup function
    return (): void => {
      attachedHandlers.forEach(([element, event, handler]) => {
        element.removeEventListener(event, handler);
      });
    };
  }, [showFullScreen, targetLinkClass, forwardedRef]);

  return (
    <>
      {children}
      <Styled.Lightbox
        image={currentImage}
        onClose={(): void => {
          setCurrentImage(None);
        }}
      />
    </>
  );
};

export default ImageHandler;
