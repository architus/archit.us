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

### Inline links

Like with Discord, the logs rich content language also supports auto-linking of URLs into link elements:
- `https://docs.archit.us/` => <a href="https://docs.archit.us/" rel="noopener" target="_blank">https://docs.archit.us/</a>

<Alert type="info">

Each link embedded in a log event's rich content **must** have each of its URL stems in the `content_metadata.url_stems` field on the `logs.event.Event` protobuf message. For example, the above example would have `["docs.archit.us", "archit.us"]` as the value of its `content_metadata.url_stems` field.

</Alert>

## Mentions

### User mention

To mention a user, use their ID as a decimal number:

```grammar
userMention
  : '<@' SNOWFLAKE_ID_DECIMAL '>'
  ;
```

Once revision tracking is implemented, this will result in a display on the frontend that includes the users's nickname/name (similar to Discord).

<Alert type="info">

Each user mentioned in a log event's rich content **must** have its ID in the `content_metadata.users_mentioned` field on the `logs.event.Event` protobuf message.

</Alert>

##### Example

```
<@448546825532866560>
```

### Role mention

To mention a role, use their ID as a decimal number:

```grammar
roleMention
  : '<@&' SNOWFLAKE_ID_DECIMAL '>'
  ;
```

Once revision tracking is implemented, this will result in a display on the frontend that includes the role's name and color (similar to Discord).

<Alert type="info">

Each role mentioned in a log event's rich content **must** have its ID in the `content_metadata.roles_mentioned` field on the `logs.event.Event` protobuf message.

</Alert>

##### Example

```
<@&607639217840848910>
```

### Channel mention

To mention a role, use the channel ID as a decimal number:

```grammar
channelMention
  : '<#' SNOWFLAKE_ID_DECIMAL '>'
  ;
```

Once revision tracking is implemented, this will result in a display on the frontend that includes the channel's name (similar to Discord).

<Alert type="info">

Each channel mentioned in a log event's rich content **must** have its ID in the `content_metadata.channels_mentioned` field on the `logs.event.Event` protobuf message.

</Alert>

##### Example

```
<#641064458843586562>
```

### (Custom) emoji mention

To mention (embed) a custom emoji (one uploaded to Discord), at the very minimum the emoji ID is needed. Additionally, if the name is known, it should be included; otherwise, the frontend can't display the actual name in the tooltip (since revision tracking is not performed on emojis).

The leading "a" inside the angle brackets is used to mark the emoji as **animated** (excluding it embeds a normal, non-animated emoji).

```grammar
emojiMention
  : '<' ( 'a' )? ':' SNOWFLAKE_ID_DECIMAL ':' EMOJI_NAME '>'
  ;
```

<Alert type="info">

Each custom emoji used in a log event's rich content **must** have its ID in the `content_metadata.custom_emojis_used` field on the `logs.event.Event` protobuf message. Additionally, if the emoji name is available, it **must** also be included in the `content_metadata.custom_emoji_names_used` field.

</Alert>

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

<Alert type="info">

To assist with full-text search, please also include the emoji name in plaintext where relevant if a log event is specifically about an emoji (and users searching by the name would expect to see it appear).

##### Example

```
<:architus:792017989583110154> :architus:
```

</Alert>

### Color mention

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

### Unicode emoji mention

To mention (embed) a unicode emoji, no special syntax is needed: simply include the unicode character within the textual content and it will be converted into an embed (with tooltip) in the web app.

<Alert type="info">

Each unicode emoji used in a log event's rich content **must** have each of its shortcodes in the `content_metadata.emojis_used` field on the `logs.event.Event` protobuf message. For example, the above example would have `["thinking", "thinking_face"]` as the value of its `content_metadata.emojis_used` field.

</Alert>

##### Examples

```
🤔
```

<Alert type="info">

To assist with full-text search, please also include the emoji shortcode(s) where relevant if a log event is specifically about an emoji (and users searching by the shortcode(s) would expect to see it appear).

##### Example

```
🤔 :thinking: :thinking_face:
```

</Alert>
