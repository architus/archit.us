---
title: Purge
---

Purges messages from a channel.

## Usage
- `!purge id <member> [true]`: Purges messages sent after a message. Can limit to just an author or all messages
- `!purge time <XXs|XXm> [member]`: Purges all messages in the past specified amount of time.

## General usage
The purge command will only look through the last 10,000 messages in a channel's history. If more than 10,000 messages
need to be deleted, then multiple purge commands must be run.

After the purge command has been run, architus will send back how many messages were deleted or an error message
specifying what went wrong.

You must be an admin in the relevant guild to run this command.

<Alert type="info">

**NOTE** architus is not able to purge messages that have been sent more than 14 days prior to the purge command being run.

</Alert>

## Permissions
Architus requires the following permissions to run the command:
- read message history
- manage messsages

## Message ID Based Purging
For information on where to find message ids see [here](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)

This method of purging is mainly used for purging all messages by a single user. Simply select the id of the last message
you want deleted and pass it to architus. architus will then delete all messages sent by that user between now and when
that selected message was sent. If the optional true parameter is passed in at the end, the command will be run in
inclusive mode. Inclusive mode will cause architus to delete messages sent by all users and not just the user who
authored the message passed in the command.

If the message referred to by the id is deleted before architus is able to read it and inclusive mode is not set,
architus will send back an error message as the command will not be able to run properly in that situation. However,
if the inclusive flag is set, then architus will still be able to run the purge command and delete all messages that
weren't sent in the time frame between when that original message was sent and when the purge command was run.

If the message referred to by the id is deleted between when architus gets access to it and starts purging messages,
then the purge command may not stop at that original message and continue to delete older messages up until it has
looked at 10,000 messages.

### Example
```
!purge id 723748549204115467 true
```

## Time Based Purging
The time parameter can be any number of seconds or minutes but not both. These should be in the format of the number
immediately followed by `s` or `m`. architus will then go through all messages in the channel sent in that period of
time and delete those messages.

A user can optionally be passed at the end of the command. This will limit the messages deleted to only those authored
by that user.

### Example
```
!purge time 42m @johnyburd
```
