import { styled } from "linaria/react";
import { transparentize } from "polished";
import React from "react";

import { OtherColors } from "@app/theme/color";
import { snowflakeToDate } from "@app/utility/discord";
import { CustomEmoji, Member, Snowflake } from "@app/utility/types";
import Tooltip from "@architus/facade/components/Tooltip";
import {
  isDefined,
  formatDateExtraShort,
  formatNum,
} from "@architus/lib/utility";

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

/**
 * Wraps a CustomEmoji object in a formatted tooltip showing name, author name, creation date, and usage.
 */
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
      maxWidth={"auto"}
      tooltip={
        <Styled.OuterContainer>
          <Styled.TooltipName>:{emoji.name}:</Styled.TooltipName>
          {authorName}
          <Styled.TooltipElevated>{date}</Styled.TooltipElevated>
          <Styled.TooltipElevated>
            uses: {formatNum(emoji.numUses)}
          </Styled.TooltipElevated>
        </Styled.OuterContainer>
      }
    >
      <Styled.ImageContainer>
        <Styled.Image className={className} style={style} src={emoji.url} />
      </Styled.ImageContainer>
    </Tooltip>
  );
};
