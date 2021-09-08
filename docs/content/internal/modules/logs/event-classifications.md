---
title: Event classifications
---

This document contains a classification of each relevant log event type (defined in the protobuf enum `logs.event.EventType`) based on what their source will be (i.e. how we will get them from Discord).

<Alert type="info">

All of the events that are classified as "Audit log, with special in certain cases" are all classified as such for the same reason, but I forgot what it is. 🙂. Don't worry about it for now.

</Alert>

###### Classification table

| EventType variant               | Expected source                                                        |
| ------------------------------- | ---------------------------------------------------------------------- |
| EventTypeGuildCreate            | Special (this is sourced from guild metadata)                          |
| EventTypeMemberJoin             | Gateway, with special in certain cases (to source historical events)   |
| EventTypeMemberLeave            | Gateway                                                                |
| EventTypeMessageSend            | Gateway, with special in certain cases  (to source historical events)  |
| EventTypeMessageReply           | Gateway, with special in certain cases  (to source historical events)  |
| EventTypeMessageEdit            | Gateway                                                                |
| EventTypeReactionAdd            | Gateway                                                                |
| EventTypeReactionRemove         | Gateway                                                                |
| EventTypeReactionBulkRemove     | Gateway                                                                |
| EventTypeInteractionCreate      | Gateway                                                                |
| EventTypeMessageDelete          | Hybrid  (gateway to get actual message, audit log to get who deleted)  |
| EventTypeMessageBulkDelete      | Hybrid  (gateway to get actual messages, audit log to get who deleted) |
| EventTypeGuildUpdate            | Audit log                                                              |
| EventTypeChannelCreate          | Audit log, with special in certain cases                               |
| EventTypeChannelUpdate          | Audit log                                                              |
| EventTypeChannelDelete          | Audit log                                                              |
| EventTypeChannelOverwriteCreate | Audit log, with special in certain cases                               |
| EventTypeChannelOverwriteUpdate | Audit log                                                              |
| EventTypeChannelOverwriteDelete | Audit log                                                              |
| EventTypeMemberKick             | Audit log                                                              |
| EventTypeMemberPrune            | Audit log                                                              |
| EventTypeMemberBanAdd           | Audit log, with special in certain cases                               |
| EventTypeMemberBanRemove        | Audit log                                                              |
| EventTypeMemberUpdate           | Audit log                                                              |
| EventTypeMemberRoleUpdate       | Audit log                                                              |
| EventTypeMemberVoiceMove        | Audit log                                                              |
| EventTypeMemberVoiceKick        | Audit log                                                              |
| EventTypeBotAdd                 | Audit log                                                              |
| EventTypeRoleCreate             | Audit log, with special in certain cases                               |
| EventTypeRoleUpdate             | Audit log                                                              |
| EventTypeRoleDelete             | Audit log                                                              |
| EventTypeInviteCreate           | Audit log, with special in certain cases                               |
| EventTypeInviteUpdate           | Audit log                                                              |
| EventTypeInviteDelete           | Audit log                                                              |
| EventTypeWebhookCreate          | Audit log, with special in certain cases                               |
| EventTypeWebhookUpdate          | Audit log                                                              |
| EventTypeWebhookDelete          | Audit log                                                              |
| EventTypeEmojiCreate            | Audit log, with special in certain cases                               |
| EventTypeEmojiUpdate            | Audit log                                                              |
| EventTypeEmojiDelete            | Audit log                                                              |
| EventTypeMessagePin             | Audit log, with special in certain cases                               |
| EventTypeMessageUnpin           | Audit log                                                              |
| EventTypeIntegrationCreate      | Audit log, with special in certain cases                               |
| EventTypeIntegrationUpdate      | Audit log                                                              |
| EventTypeIntegrationDelete      | Audit log                                                              |

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
