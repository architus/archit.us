import React from "react";
import { styled } from "linaria/react";
import { color } from "@architus/facade/theme/color";
import AutoSizer from "react-virtualized-auto-sizer";
import ReactWordcloud from "react-wordcloud";

export type WordData = {
  text: string;
  value: number;
}

type WordCloudProps = {
  words: Array<WordData>
};

const Styled = {
  AutoSizer: styled(AutoSizer)`
    width: 100%;
  `,
}
export const WordCloud = (props: WordCloudProps) => {  

  const optionss = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontSizes: [5, 130],
    colors: [color("textStrong")],
  };
  return (
    <Styled.AutoSizer>
      {({height, width}) => (
        <ReactWordcloud options={optionss} size={[width, height]} words={props.words} />
      )}
    </Styled.AutoSizer>
  );
}