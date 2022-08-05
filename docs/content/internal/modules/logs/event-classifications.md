---
title: Event classifications
---

This document contains a classification of each relevant log event type (defined in the protobuf enum `logs.event.EventType`) based on what their source will be (i.e. how we will get them from Discord).

###### Classification table

| EventType variant               | Expected source                                                       |
| ------------------------------- | --------------------------------------------------------------------- |
| EventTypeGuildCreate            | Special (this is sourced from guild metadata)                         |
| EventTypeMemberJoin             | Gateway, with special in certain cases (to source historical events)  |
| EventTypeMemberLeave            | Gateway                                                               |
| EventTypeMessageSend            | Gateway, with special in certain cases (to source historical events)  |
| EventTypeMessageReply           | Gateway, with special in certain cases (to source historical events)  |
| EventTypeMessageEdit            | Gateway                                                               |
| EventTypeReactionAdd            | Gateway                                                               |
| EventTypeReactionRemove         | Gateway                                                               |
| EventTypeReactionBulkRemove     | Gateway                                                               |
| EventTypeInteractionCreate      | Gateway                                                               |
| EventTypeMessageDelete          | Hybrid (gateway to get actual message, audit log to get who deleted)  |
| EventTypeMessageBulkDelete      | Hybrid (gateway to get actual messages, audit log to get who deleted) |
| EventTypeGuildUpdate            | Audit log                                                             |
| EventTypeChannelCreate          | Audit log, with special to source the base creation events            |
| EventTypeChannelUpdate          | Audit log                                                             |
| EventTypeChannelDelete          | Audit log                                                             |
| EventTypeChannelOverwriteCreate | Audit log, with special to source the base creation events            |
| EventTypeChannelOverwriteUpdate | Audit log                                                             |
| EventTypeChannelOverwriteDelete | Audit log                                                             |
| EventTypeMemberKick             | Audit log                                                             |
| EventTypeMemberPrune            | Audit log                                                             |
| EventTypeMemberBanAdd           | Audit log, with special to source the base creation events            |
| EventTypeMemberBanRemove        | Audit log                                                             |
| EventTypeMemberUpdate           | Audit log                                                             |
| EventTypeMemberRoleUpdate       | Audit log                                                             |
| EventTypeMemberVoiceMove        | Audit log                                                             |
| EventTypeMemberVoiceKick        | Audit log                                                             |
| EventTypeBotAdd                 | Audit log                                                             |
| EventTypeRoleCreate             | Audit log, with special to source the base creation events            |
| EventTypeRoleUpdate             | Audit log                                                             |
| EventTypeRoleDelete             | Audit log                                                             |
| EventTypeInviteCreate           | Audit log, with special to source the base creation events            |
| EventTypeInviteUpdate           | Audit log                                                             |
| EventTypeInviteDelete           | Audit log                                                             |
| EventTypeWebhookCreate          | Audit log, with special to source the base creation events            |
| EventTypeWebhookUpdate          | Audit log                                                             |
| EventTypeWebhookDelete          | Audit log                                                             |
| EventTypeEmojiCreate            | Audit log, with special to source the base creation events            |
| EventTypeEmojiUpdate            | Audit log                                                             |
| EventTypeEmojiDelete            | Audit log                                                             |
| EventTypeMessagePin             | Audit log, with special to source the base creation events            |
| EventTypeMessageUnpin           | Audit log                                                             |
| EventTypeIntegrationCreate      | Audit log, with special to source the base creation events            |
| EventTypeIntegrationUpdate      | Audit log                                                             |
| EventTypeIntegrationDelete      | Audit log                                                             |

### Remaining classifications

The following [audit log events](https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events) need to be classified:

- STAGE_INSTANCE_CREATE
- STAGE_INSTANCE_UPDATE
- STAGE_INSTANCE_DELETE
- STICKER_CREATE
- STICKER_UPDATE
- STICKER_DELETE
- THREAD_CREATE
- THREAD_UPDATE
- THREAD_DELETE

Additionally, the following [gateway events](https://discord.com/developers/docs/topics/gateway#commands-and-events-gateway-events) need to be classified:

- Thread Create
- Thread Update
- Thread Delete
- Thread List Sync
- Thread Member Update
- Thread Members Update
- Guild Emojis Update
- Guild Stickers Update
- Guild Integrations Update
- Stage Instance Create
- Stage Instance Delete
- Stage Instance Update
