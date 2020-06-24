---
title: User
---

The User object is used to gain context into Discord users, including information such as username, ID, and avatar hash.

## User Object

Same as discord [user](https://discordapp.com/developers/docs/resources/user#user-object) object.

###### User Example

```json
{
  "username": "johnyburd",
  "locale": "en-US",
  "mfa_enabled": true,
  "flags": 0,
  "avatar": "9ce5a006548f1ae3e5c8fb91a4d677e4",
  "discriminator": "1022",
  "id": "214037134477230080"
}
```

## Identify Current User

<Route method="GET" path="/identify" auth />

Return the [user](#user-object) currently logged in.

## Get User by ID

<Route method="GET" path="/user/{user.id}" />

Return a [user](#user-object) object.
