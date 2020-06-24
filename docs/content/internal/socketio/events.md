---
title: Socket.io Events
shortTitle: events
---

Archit.us uses the [Socket.io](https://socket.io/) library to support realtime duplex communication with the backend API server for features such as entity requests/updates and high-volume log viewing.

## Request Elevation

<GatewayRoute eventName="request_elevation" room="<SID>" sentFrom="client" payload={{token: {type: "string", description: "Authentication Token"}}} />

On receiving a valid authentication token, the server will create a new "elevated" room with access to protected events.

<Alert type="info">

`request_elevation` will always trigger [request_elevation_return](#request-elevation-return)

</Alert>

## Request Elevation Return

<GatewayRoute
    eventName="request_elevation_return"
    room="<SID>"
    sentFrom="server"
    payload={{
        "success": {type: "boolean", description: "was successful"},
        "room": {type: "?string", description: "ID of elevated room"}
    }}
/>

## Mock User Event

<GatewayRoute
    eventName="mock_user_event"
    room="<SID>"
    sentFrom="client"
    payload={{
        "guild_id": {type: "integer", description: "mock guild ID"},
        "content?": {type: "?string", description: "contents of the message"},
        "message_id": {type: "integer", description: "mock message ID. should be an **even** integer"},
        "added_reactions?": {type: "?array of strings", description: "array of reactions added to the mock message"},
        "removed_reacions?": {type: "?array of strings", description: "array of reactions removed from the mock message"},
        "allowed_commands?": {type: "?array of strings", description: "array of commands the client expects to execute"},
        "silent?": {type: "boolean", description: "a result of bad coding practices"}
    }}
/>

## Mock Bot Event

<GatewayRoute
    eventName="mock_bot_event"
    room="<SID>"
    sentFrom="server"
    payload={{
        "guild_id": {type: "integer", description: "mock guild ID"},
        "content": {type: "?string", description: "contents of the message"},
        "message_id": {type: "integer", description: "mock message ID. should be an **odd** integer"},
        "added_reactions": {type: "?array of strings", description: "array of reactions added to the mock message"},
        "edit": {type: "boolean", description: "is the message modifying an existing message"}
    }}
/>

## Spectate

<GatewayRoute
    eventName="spectate"
    room="<SID>_auth"
    sentFrom="client"
    requiresElevation
    payload={{
        "guild_id": {type: "snowflake", description: "ID of the guild to spectate"},
        "non_pool?": {type: "boolean", description: "whether events that aren't neccesarry to update pools should be included"}
    }}
/>

## Pool

## Log Pool

<GatewayRoute
    eventName="log_pool"
    room="<SID>_auth"
    sentFrom="server"
    requiresElevation
    payload={{
        "guild_id": {type: "snowflake", description: "ID of the context guild"},
        "log_action": {type: "[log action](../modules/logs/#log-action-object) object", description: "idk"}
    }}
/>
