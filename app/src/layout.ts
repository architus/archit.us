import { css } from "linaria";
import { styled } from "linaria/react";

import { down, BreakpointKey } from "@architus/facade/theme/media";
import { gap } from "@architus/facade/theme/spacing";

export const headerHeight = "58px" as const;
export const sitePaddingVariable = `--site-padding`;
export const contentWidthVariable = `--content-width`;
export const sitePadding = `var(${sitePaddingVariable})`;
export const contentWidth = `var(${contentWidthVariable})`;
export const appHorizontalPaddingVariable = "--app-horizontal-padding";
export const appHorizontalPadding = `var(${appHorizontalPaddingVariable})`;
export const appVerticalPadding = gap.milli;
export const minimizeBreakpoint: BreakpointKey = "md";

export const layoutGlobal = css`
  :global() {
    :root {
      ${sitePaddingVariable}: ${gap.milli};
      ${contentWidthVariable}: 1180px;
      ${appHorizontalPaddingVariable}: ${gap.milli};

      ${down("xl")} {
        ${contentWidthVariable}: 960px;
      }

      ${down("lg")} {
        ${contentWidthVariable}: 640px;
      }

      ${down("md")} {
        ${sitePaddingVariable}: ${gap.micro};
        ${appHorizontalPaddingVariable}: ${sitePadding};
      }

      ${down("vs")} {
        ${sitePaddingVariable}: ${gap.nano};
      }
    }
  }
`;

/**
 * Mixin that creates a responsive container
 */
export const container = `
  position: relative;
  z-index: 0;
  margin: 0 auto;
  padding: 0 ${sitePadding};
  max-width: ${contentWidth};
`;

export type ContainerProps = React.ComponentProps<typeof Container>;

/**
 * Same as `container` mixin, but as a Styled component.
 */
export const Container = styled.div`
  ${container}
`;
