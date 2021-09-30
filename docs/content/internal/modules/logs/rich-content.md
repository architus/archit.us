---
title: Rich content
badge: in-progress
---

The primary representation of logs in the web app will be a rich, searchable textual display that supports a subset of Discord Markdown in addition to "mention" inline elements. This page attempts to specify the language's features.

<Alert type="info">

This page specifically describes our own special language for rich formatting in logs. It is not intended to be used by end users, and it won't work in other contexts (i.e. in Discord).

</Alert>

## Markdown

The rich content for log entries supports the following Markdown features (basically all of the inline-level features in Discord Markdown, minus in-line code fragments):

- Inline bolding: `**bold**` => <b>italic</b>
- Inline italics (both syntaxes): `*italic*` => <i>italic</i>, `_italic_` => <i>italic</i>
- Inline underline: `__underline__` => <u>underline</u>
- Inline strikethrough: `~~strikethrough~~` => <strike>strikethrough</strike>
- Inline spoilers: `||spoilers||` => <InlineSpoilerMockup>spoilers</InlineSpoilerMockup>
  - Note: spoilers are not displayed with the same interactivity as in the Discord client; they are just visually marked with a darker background and an icon.


<Alert type="warning">

While we try to keep the same behavior as the Discord Markdown renderer embedded in the Discord client, it might vary in some edge cases.

</Alert>

## Mentions

### User Mention

To mention a user, use their ID as a decimal number:

```grammar
userMention
  : '<@' SNOWFLAKE_ID_DECIMAL '>'
  ;
```

Once revision tracking is implemented, this will result in a display on the frontend that includes the users's nickname/name (similar to Discord).

##### Example

```
<@448546825532866560>
```

### Role Mention

To mention a role, use their ID as a decimal number:

```grammar
roleMention
  : '<@&' SNOWFLAKE_ID_DECIMAL '>'
  ;
```

Once revision tracking is implemented, this will result in a display on the frontend that includes the role's name and color (similar to Discord).

##### Example

```
<@&607639217840848910>
```

### Channel Mention

To mention a role, use the channel ID as a decimal number:

```grammar
channelMention
  : '<#' SNOWFLAKE_ID_DECIMAL '>'
  ;
```

Once revision tracking is implemented, this will result in a display on the frontend that includes the channel's name (similar to Discord).

##### Example

```
<#641064458843586562>
```

### Emoji Mention

To mention (embed) an emoji, at the very minimum the emoji ID is needed. Additionally, if the name is known, it should be included; otherwise, the frontend can't display the actual name in the tooltip (since revision tracking is not performed on emojis).

The leading "a" inside the angle brackets is used to mark the emoji as **animated** (excluding it embeds a normal, non-animated emoji).

```grammar
emojiMention
  : '<' ( 'a' )? ':' SNOWFLAKE_ID_DECIMAL ':' EMOJI_NAME '>'
  ;
```

##### Animated emoji example (with name)

```
<a:catKiss:814220915033899059>
```

##### Animated emoji example (without name)

```
<a::814220915033899059>
```

##### Standard emoji example (with name)

```
<:architus:792017989583110154>
```

##### Standard emoji example (without name)

```
<::792017989583110154>
```

### Color Mention

To mention (embed) a color, it needs to be formatted as a 6-digit hex color code (using either uppercase or lowercase digits):

```grammar
colorMention
  : '<##' hexColor '>'
  ;

hexColor
  : HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT
  ;

HEX_DIGIT
  : 'a'..'f' | 'A'..'F' | '0'..'9'
  ;
```

##### Examples

```
<##F97448>
<##008933>
<##97154d>
```
