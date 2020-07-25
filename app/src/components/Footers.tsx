import { styled } from "linaria/react";
import React from "react";

import CompositeBrand from "@app/components/CompositeBrand";
import { useFooterData } from "@app/data/footer-data";
import { container } from "@app/layout";
import Card from "@architus/facade/components/Card";
import Footer, { FooterContent } from "@architus/facade/components/Footer";
import SecondaryFooter from "@architus/facade/components/SecondaryFooter";
import { up } from "@architus/facade/theme/media";
import { gap } from "@architus/facade/theme/spacing";

const Styled = {
  Footers: styled.div`
    ${FooterContent} {
      ${container};
    }

    footer:nth-of-type(2n + 1) {
      ${Card} {
        ${up("lg")} {
          margin-left: ${gap.micro};
        }
      }
    }
  `,
};

// Export for styling
export const StyledFooters = Styled.Footers;

export type FootersProps = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Combined primary/secondary footer, using site container as content width.
 * Includes site-specific adjustments
 */
const Footers: React.FC<FootersProps> = ({ className, style }) => (
  <Styled.Footers className={className} style={style}>
    <Footer {...useFooterData()} brand={<CompositeBrand showVersion />} />
    <SecondaryFooter />
  </Styled.Footers>
);

export default Footers;
