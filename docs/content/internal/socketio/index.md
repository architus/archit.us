---
title: Socket.io Communication
shortTitle: Socket.io
overrideNav: Socket.io
---

Archit.us uses the [Socket.io](https://socket.io/) library to support realtime duplex communication with the backend API server for features such as entity requests/updates and high-volume log viewing.

## Rationale

In order to implement major portions of the architus app, there exists a need for a secure communication channel between the server and client that supports **server pushes** and differing levels of permission.

### Use Cases

- Front page interpreting messages
  - `interpret`
- Spectating certain servers (1 at a time)
  - A socket.io client spectates (receives updates for) a single guild at any time. This means that **relevant views need to re-request the data from the API upon guild switching in the UI**
- Permissions layer
  - Certain categories (i.e. administrator changes) of messages should only be available to those with permissions
    - Differentiate between architus admins and Discord admins?

Socket.io is used as a duplex communication engine, enabling us to support lower latency request => response patterns as well as server-initiated events, useful for updating spectating clients that an action ocurred in the current guild that requires an update on the UI.

## Authenticating

Uses JWT for authentication, similar to the REST API. JWT secret is shared between the socket.io server nodes and the API nodes to let the socket.io server verify the validity of JWT tokens as they come in, as needed. **This means that the auth token needs to be included in the payload of every request.**

## Patterns

1. Request-response
   1. Discord entity pools (members, emojis, channels, and roles)
      1. Request all emojis, channels, roles, online members
      2. Request single entity
      3. Request member search
         1. 3 steps:
            1. initial view of all displayed entities
            2. interact with relevant UI => request remainder of pool
            3. on search member
2. Server-push messages
   1. Live updates requiring data refresh (i.e. new auto-response token)
   2. Live log entry view

## Implementation Details

1. Single room per user
   - Use JWT to **encode permissions** for instant authentication
2. Use redux middleware in frontend to provide symmetry to traditional RESTful response handling
3. Payloads are strings (JSON-serialized)
4. Default unauthenticated room
5. Authenticated room
   - Websocket server manages what messages are received as server pushes and relevant req/res authorization based on JWT and other context

### Filtering/scalability

#### MQ Topics

Have MQ filter as many unneeded events out as possible (faster than WS server):

#### MQ topics

Have websocket servers subscribe to as many topics as they currently need (based on current connections/authenticated rooms and the guilds they need visibility to)

```text
<guild_id>
<guild_id>_logs
```

## Message Types (Socket.io Events)

### Unauthenticated Room Events

<GatewayRoute eventName="request_elevation" room="<SID>" sentFrom="client" payload={{token: {type: "string", description: "Authentication Token"}}} />

#### Result

<GatewayRoute eventName="request_elevation_return" room="<SID>" sentFrom="server" payload={{"result": {type: "boolean", description: "was successful"}}} />

- Result in: successful or not
  - Success: server is going to
    - Make new authenticated room based off JWT credentials/permissions and SID
    - Places user into room
    - Websocket server manages what messages are received as server pushes and relevant req/res authorization based on JWT and other context

<GatewayRoute eventName="mock_user_event" room="<SID>" sentFrom="client" payload={{
    "guild_id": {type: "integer", description: "mock guild ID"},
    "content": {type: "string", description: "idk"},
    "message_id": {type: "integer", description: "mock message ID"},
    "added_reactions": {type: "?array of strings", description: "array of reactions added to the mock message"},
    "removed_reacions": {type: "?array of strings", description: "array of reactions removed from the mock message"},
    "allowed_commands": {type: "?array of strings", description: "array of commands the client expects to execute"},
    "silent": {type: "boolean", description: "a result of bad coding practices"}
}} />

- `interpret`
  - Front page Discord mock interpreting
  - Directly calls discord bot mock response maker
  - Payload is traditional object

### Authenticated Room Events

`<SID>_auth` - Server manages what events are sent to this room

- `spectate`
  - Will remove previous spectating upon switching to new guild
  - payload:

```json
"payload": {
  "guild_id": "guild_id"
  "include_logs": true
}
```

- `pool`
  - **request/response**
    - Request single
    - Request all
      - Request online members??
    - Request search?
  - Discord entities
    - Guild-specific
      - Members -> Also update user pool
      - Channels
      - Roles
    - Guild-agnostic
      - Users
      - Emoji
      - Guilds
  - Architus entities
    - Auto responses
    - Settings values (not presentational schema)
  - *format TBD*

#### Server Push

- `log_pool`
  - Example motivating use case: someone updates auto response: push to other observable
  - Includes both architus and Discord entity updates
    - **for discord entities**: merge with
  - **server push**
  - *format TBD*

- `log_other`
  - server push
  - *format TBD*
