import { styled } from "linaria/react";
import { transparentize } from "polished";
import React from "react";

import { OtherColors } from "@app/theme/color";
import { snowflakeToDate } from "@app/utility/discord";
import { CustomEmoji, Member, Snowflake } from "@app/utility/types";
import Tooltip from "@architus/facade/components/Tooltip";
import { gap } from "@architus/facade/theme/spacing";
import { isDefined, formatDateExtraShort } from "@architus/lib/utility";

const Styled = {
  TooltipName: styled.strong`
    display: block;
  `,
  TooltipElevated: styled.div`
    opacity: 0.7;
    font-size: 80%;
  `,
  OuterContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ImageContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  `,

  Image: styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    //height: auto;
  `,
  Mention: styled.div`
    max-width: max-content;
    color: ${OtherColors.Discord};
    background-color: ${transparentize(0.85, OtherColors.Discord)};

    &:hover {
      color: white;
      background-color: ${transparentize(0.25, OtherColors.Discord)};
    }
  `,
};

type CustomEmojiProps = {
  emoji: CustomEmoji;
  author?: Member;
  className?: string;
  style?: React.CSSProperties;
};
export const CustomEmojiIcon: React.FC<CustomEmojiProps> = ({
  emoji,
  author,
  style,
  className,
}) => {
  let authorName = null;
  if (isDefined(author) && author.id === emoji.authorId) {
    authorName = (
      <Styled.TooltipElevated>
        {author.name}#{author.discriminator}
      </Styled.TooltipElevated>
    );
  }
  const architusDate = snowflakeToDate((emoji.id as string) as Snowflake);
  const discordDate = emoji.discordId.isDefined()
    ? snowflakeToDate(emoji.discordId.get)
    : new Date(8640000000000000);
  const date = formatDateExtraShort(
    architusDate < discordDate ? architusDate : discordDate
  );

  return (
    <Tooltip
      // style={{"overflow": "visible !important" } as React.CSSProperties}
      maxWidth={"auto"}
      tooltip={
        <Styled.OuterContainer>
          <Styled.TooltipName>:{emoji.name}:</Styled.TooltipName>
          {authorName}
          <Styled.TooltipElevated>{date}</Styled.TooltipElevated>
          <Styled.TooltipElevated>uses: {emoji.numUses}</Styled.TooltipElevated>
        </Styled.OuterContainer>
      }
    >
      <Styled.ImageContainer>
        <Styled.Image className={className} style={style} src={emoji.url} />
      </Styled.ImageContainer>
    </Tooltip>
  );
};
