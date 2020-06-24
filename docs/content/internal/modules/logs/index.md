---
title: Logs
badge: in-progress
---

Logs are a major upcoming feature of Architus that expands on Discord's audit log functionality in a variety of ways. In addition to a much longer history, Architus will track many more actions than the built in log. It will also provide the ability to rollback most actions and an improved viewing interface.

The service will also serve as a centralized mechanism for centralized logging for internal actions/diagnostics that will be hidden from end-users unless they're relevant to their currently selected guild.

## Implementation Details

### Log Action Object

###### Log Action Structure

| Field         | Type                                                          | Description                                                           |
| ------------- | ------------------------------------------------------------- | --------------------------------------------------------------------- |
| id            | hoar frost                                                    | unique [hoar frost ID](../../api-reference/#hoar-frost) for the event |
| reversible    | boolean                                                       | can the action be reversed                                            |
| action_number | integer                                                       | number corresponding to the [action type](#action-type)               |
| agent_id      | ?snowflake                                                    | snowflake of the user carrying out the action                         |
| subject_id    | ?snowflake (or [hoar frost](../../api-reference/#hoar-frost)) | id of the object being acted upon (if it still exists)                |
| old_data      | ?mixed (any JSON value)                                       | data required to reconstruct the object                               |

## Action Type

###### Action Type Table

| ACTION_NUMBER | ACTION_TYPE              | Description                   |
| ------------- | ------------------------ | ----------------------------- |
| 1             | GUILD_UPDATE             | guild was updated             |
| 10            | CHANNEL_CREATE           | new channel created           |
| 11            | CHANNEL_UPDATE           | channel was updated           |
| 12            | CHANNEL_DELETE           | channel was deleted           |
| 13            | CHANNEL_OVERWRITE_CREATE | new channel overwrite created |
| 14            | CHANNEL_OVERWRITE_UPDATE | channel overwrite was updated |
| 15            | CHANNEL_OVERWRITE_DELETE | channel overwrite was deleted |
| 20            | MEMBER_KICK              | member was kicked             |
| 21            | MEMBER_PRUNE             | members were pruned           |
| 22            | MEMBER_BAN_ADD           | member was banned             |
| 23            | MEMBER_BAN_REMOVE        | member was pardoned           |
| 24            | MEMBER_UPDATE            |                               |
| 25            | MEMBER_ROLE_UPDATE       |                               |
| 30            | ROLE_CREATE              |                               |
| 31            | ROLE_UPDATE              |                               |
| 32            | ROLE_DELETE              |                               |
| 40            | INVITE_CREATE            |                               |
| 41            | INVITE_UPDATE            |                               |
| 42            | INVITE_DELETE            |                               |
| 50            | WEBHOOK_CREATE           |                               |
| 51            | WEBHOOK_UPDATE           |                               |
| 52            | WEBHOOK_DELETE           |                               |
| 60            | EMOJI_CREATE             |                               |
| 61            | EMOJI_UPDATE             |                               |
| 62            | EMOJI_DELETE             |                               |
| 72            | MESSAGE_DELETE           |                               |
| 3001          | MESSAGE_SEND             | message was sent              |
| 3002          | MESSAGE_EDIT             | message was edited            |
| 3003          | MESSAGE_DELETE           | message was deleted           |
| 3100          | REACTION_ADD             | reaction was added            |
| 3101          | REACTION_REMOVE          | reaction was removed          |
| 3200          | AUTO_RESPONSE_ADD        | autoresponse was added        |
| 3201          | AUTO_RESPONSE_REMOVE     | autorespones was removed      |
| 3202          | AUTO_RESPONSE_EDIT       | autoresponse was edited       |
| 3203          | AUTO_RESPONSE_TRIGGER    | autoresponse was triggered    |
| 3300          | LOG_REVERT               |                               |
| 3301          | LOG_ROLLBACK             |                               |
| 3400          | EMOJI_MANAGER_TRIGGER    |                               |
| 3401          | EMOJI_MANAGER_CREATE     |                               |
| 3402          | EMOJI_MANAGER_DELETE     |                               |
| 3403          | EMOJI_MANAGER_EXCHANGE   |                               |

<Alert type="info">

Action numbers below 3000 are native to discord while above 3000 are particular to Architus

</Alert>

## Backend Structure

### Ingress Service

### Query Service

### Datastore Service

### Recovery Service

### Recovery Queue Service
