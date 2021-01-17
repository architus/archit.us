import { styled } from "linaria/react";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import ReactWordcloud, { Options } from "react-wordcloud";

import { color } from "@architus/facade/theme/color";

export type WordData = {
  text: string;
  value: number;
};

type WordCloudProps = {
  words: Array<WordData>;
};

const Styled = {
  AutoSizer: styled(AutoSizer)`
    width: 100%;
  `,
};
export const WordCloud: React.FC<WordCloudProps> = React.memo(({ words }) => {
  const options: Partial<Options> = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontSizes: [5, 120],
    enableOptimizations: true,
    enableTooltip: false,
    // fontFamily: "Renner*",
    // padding: 10,
    // transitionDuration: 0,
    colors: [color("textStrong")],
  };
  return (
    <Styled.AutoSizer>
      {({ height, width }): JSX.Element => (
        <ReactWordcloud
          options={options}
          size={[width, height]}
          words={words}
        />
      )}
    </Styled.AutoSizer>
  );
});
