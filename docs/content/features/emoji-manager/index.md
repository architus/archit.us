---
title: Emoji Manager
---

The custom emoji module allows for effectively unlimited custom emoji to be used on a server, working by replacing a user’s message with another that has the hot-loaded emoji included.

## How it Works

As soon as the server reaches its emoji limit, architus will cache an emoji so that there will always be room to add more. When an emoji is cached, users may type `:emojiname:` just as they would for a normal emoji. Architus will then perform the following actions:
* cache an emoji from the server (if at the limit)
* load the emoji the user just typed into the server
* delete the message the user just sent
* resend the message using the username and avatar of the original author, this time with the emoji included

The effect should feel somewhat like having infinite emoji slots in your server.  

Use the command `emoji` to view a list of cached emoji, along with a preview of what each emoji looks like.

<Alert type="info">

**Note:** emoji names are *case sensitive*

</Alert>

## How to Enable

As an admin, type `!settings` and select the 📂 icon (open file folder). You should see the prompt:
> 📂 If true, less popular emojis will be cycled in and out as needed, effectively allowing greater than the max emojis. Enter `true` or `false` to modify it:
Answer `true`.

## Ranking System

Each time an emoji is used in a message or reaction its internal ranking is increased, while all other emojis are decreased by a very slight amount. This ensures the most popular emojis are always at the top of the list. You can view the rankings of your emoji with the `emojilo` command.

## Permissions
In order for the emoji manager to work properly, architus requires the following permissions:
* manage emojis
* manage messages
* manage webhooks
