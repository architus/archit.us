---
title: Socket.io Pools
shortTitle: pools
---

Pools are a common architecture pattern to tackle requesting, caching, and syncing data entities within the Architus ecosystem between the web frontend and API server. These include Discord entities, such as Guilds, Users, and Roles, as well as Architus entities, such as Auto Responses.

Each *entity pool* is a dictionary of IDs to corresponding data object that grows as the frontend needs to display more values.

## Motivation

The reason to introduce the pool pattern is to standardize the way the web dashboard handles data entities. This design includes three main parts:

1. **Requesting** - The pool pattern is designed to request relevant entities/pools **on-demand** to reduce unnecessary network traffic and memory footprint. *Note that this doesn't mean that entire pools can't be requested at once: it's just that these won't be requested until needed.*
2. **Caching** - By caching previously requested entities, the perceived speed of the application is improved. For example, as the remainder of the entities can be requested and loaded in the background while the cached ones are displayed instantly.
3. **Updating** - Each entity can change throughout its lifecycle (and more importantly, a browser session), so receiving and propagating updates to "spectating" views is critical for the web dashboard to appear responsive. The backend server sends out server push events and the pool updates the corresponding entities in its local cache.

### Primary Use Cases

#### Settings View

In the [settings module](/internal/modules/settings/), a variety of different setting types require a knowledge of the various relevant data entities to the current guild for validation and autocompletion. In this case, entity pools should be requested when they are needed, such as when they are needed for autocompletion for the first time. In addition, entities that are immediately displaed should be requested upon load accordingly, in order to have aspects of them like color or avatar immediately displayed.

<Alert type="warning">

An important consideration for this approach is the maximum possible size of the entity pools. Most pools (such as roles, emojis, and channels) have reasonable limits that allow them to be requested in full when needed, but some (namely, members) are generally uncapped and as such, extra care needs to be taken when dealing with them. For this, an on-demand *fuzzy-query* approach is used to retain autocompletion while not needing all entities in-memory at once.

</Alert>

#### Guild Navigation Sidebar

On the left side of the main app view, relevant guilds where the Architus bot is a member are displayed, using a handful of attributes of each guild such as avatar, name, and admin status. In order for the app to seem responsive, these should reflect changes as they are made, and as such, can be included in the pool pattern to receive entity update events.

## Pool Types

In general, the different entity pools can be divided into **three** distinct pool types based on the entities they contain:

### Discord guild-specific entities

This category includes Discord entities that are specific to a certain guild and are only necessary to request, cache, and update in the context of the current guild. The specific entities in this category are:

1. `Member`s [(corresponding Discord API entity)](https://discordapp.com/developers/docs/resources/guild#guild-member-object) - Guild member objects, which include information like nickname and roles

  <Alert type="info">Note that these will need to be synchronized with User entities</Alert>

2. `Channel`s [(corresponding Discord API entity)](https://discordapp.com/developers/docs/resources/channel#channel-object) - Guild channels (text/voice) objects, which include information such as name, type, and permission settings
3. `Role`s [(corresponding Discord API entity)](https://discordapp.com/developers/docs/topics/permissions#role-object) - Guild role objects, which include information such as name and color

### Discord guild-agnostic entities

This category includes Discord entities that generalize beyond the context of a given guild, and as such, can be shared between contexts. By caching previously seen entities (even from another server), the perceived speed of the frontend can be faster as the remainder of the entity pool loads. The relevant entities are:

1. `User`s [(corresponding Discord API entity)](https://discordapp.com/developers/docs/resources/user#user-object) - Discord user objects, which include information such as username, avatar, and discriminator
2. `Emoji`s [(corresponding Discord API entity)](https://discordapp.com/developers/docs/resources/emoji) - Discord emoji objects, which include information such as name/shortcode and image
3. `Guild`s [(corresponding Discord API entity)](https://discordapp.com/developers/docs/resources/guild#guild-object) - Discord guild (server) objects, which contain information such as name, picture, and owner

### Architus entities

This category includes data entities that are specific to the Architus ecosystem. This includes:

1. `AutoResponse`s [(corresponding docs page)](/internal/modules/auto-responses/) - Auto response objects
2. `SettingValue`s [(corresponding docs page)](/internal/modules/settings/) - Setting value objects

  <Alert type="info">Note that this does not include the *presentational schema* of settings, which are not considered a pool</Alert>

## Implementation Details

The system is designed to integrate with [Redux](https://redux.js.org/) and the [Socket.io](/socketio/) middleware on the frontend to keep a local store of the entities.

The sub-categories are divided into whether they are guild-specific or guild-agnostic and stored accordingly. For guild-specific entities, the pools are first stored by the guild id as the top level category, and then by pool type. On the other hand, for guild-agnostic entities, each pool type is the top level category and entities are shared between contexts.

### Request Types

#### Entire pool request

This event potentially requires guild id for context and results in an entire list of data entities returned

##### Request

<GatewayRoute
  eventName="pool_all_request"
  room="<SID>_auth"
  sentFrom="client"
  requiresElevation
  payload={{
      "pool_type": {type: "string enum", description: "one of: ['member', 'channel', 'role', 'user', 'emoji', 'guild', auto-response', 'setting-value']"},
      "guild_id": {type: "?integer", description: "relevant guild ID if pool type is guild-specific"}
  }}
/>

##### Response

<GatewayRoute
  eventName="pool_all_response"
  room="<SID>_auth"
  sentFrom="server"
  requiresElevation
  payload={{
      "data": {type: "array<object>", description: "array of data entities"}
  }}
/>

#### Single entity request

This event also potentially requires guild id for context and results in a single data entity as a result.

<GatewayRoute
  eventName="pool_request"
  room="<SID>_auth"
  sentFrom="client"
  requiresElevation
  payload={{
      "pool_type": {type: "string enum", description: "one of: ['member', 'channel', 'role', 'user', 'emoji', 'guild', auto-response', 'setting-value']"},
      "guild_id": {type: "?integer", description: "relevant guild ID if pool type is guild-specific"},
      "entity_id": {type: "string", description: "the ID of the entity being requested"}
  }}
/>

##### Response

<GatewayRoute
  eventName="pool_response"
  room="<SID>_auth"
  sentFrom="server"
  requiresElevation
  payload={{
      "data": {type: "object", description: "data entitiy response"}
  }}
/>

#### Member search request

This event is a special case for member fuzzy search.

> Consider generalizing to all entities? Are there sufficient use cases?

### Observing & Spectating

Client receive all updates for entities in the guild they are currently spectating, whether they have seen the entity before or not. Because of this, newly added or edited entities can be added to an otherwise empty pool, and deleted entity updates can be safely dropped.

More information about the spectating protocol can be found on the [socket.io implementation docs](/internal/socketio/#spectating).

### Update Scenarios

Updating events are server push events and their payloads are incorporated into the local cache when received. With this, there are three possible update types:

1. `add` - New entity added. Payload contains ID and newly created entity. This also cascades to linked entities (see [Foreign Keys](#foreign-keys)).
2. `update` - Entity information updated. Payload contains ID and newly updated entity. This does not need to cascade, though the entire entity must be included to support the scenario where the client sees the entity for the first time.
3. `remove` - Entity removed. Payload contains only the ID, though this change needs to cascade to linked entities.

### Foreign Keys

Many entities reference other data entities, such as guilds containing references to members. To prevent data duplication, entity IDs are used to perform this referencing in place of entire entities. This causes a cascading effect to be necessary upon entity updates (see [Update Scenarios](#update-scenarios)).

> Consider using some type of dependency graph to encode this information for frontend/backend processing of dependency cascades
