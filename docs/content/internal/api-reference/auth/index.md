---
title: Authentication
---

Architus implements OAuth2 using discord's developer application and extends the OAuth pathway by introducing JWTs as a way of implementing instant token verification.

## Get Authorization Token

<Route method="GET" path="/login"/>

Redirects to Discord's authorization page for Architus. Optionally takes a query string if the return url is different from [https://archit.us/app](https://archit.us/app)

###### Example Url

```markdown
https://api.archit.us/login?return=https%3A%2F%2Fdevelop.archit.us%2Fapp
```
This example redirects to [https://develop.archit.us/app](https://develop.archit.us/app) instead of the main app after the login chain is completed.

When the browser arrives back at the app the URL includes the authorization code provided by discord.

###### Example Url

```markdown
https://archit.us/app?code=fKhB9VoUHR8CtZM3XOUnNRS9wSTOrt
```

## Get Architus API Token

<Route method="POST" path="/token_exchange"/>

Exchange discord user token, retrieved from [login](#get-authorization-token) for an Architus API token.

###### Json Params

| Field  | Type                                          | Description                                                                   |
| ------ | --------------------------------------------- | ----------------------------------------------------------------------------- |
| code | string                                        | [Discord Authorization Token](https://discordapp.com/developers/docs/topics/oauth2#authorization-code-grant) |

###### Response Example

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ8.eyJhY2Nlc3NfdG9rZW4iOiJNM05EV1puVEl1Qmk2cG4wNFFmeUNHUG10MGpFTF0iLCJleHBpcmVzZ2luIjo2MDQ4MDAsInJlZnJlc2hfdG9rZW4iOiJXWFo1SUFCRHpWOENEQWR6Y21VVVRiTjg0SURIOXgiLCJ1c2VybmFtZSI6ImpvaG55YnVyZCIsImRpc2NyaW1pbmF0b3IiOiIxMDIyIiwiYXZhdGFyIjoiOWNlNWEwMDY1NDhmMWQlM2U1YzhmYjkxYTRkNjc3ZTQiLCJpZCI6IjIxNDAzNzEzNDQ3NzIzMDA4MCK9.2vEM3IjRPAfytMCdPq0gOIoe_lCwZ6MG7OF8WT73Bju",
  "expires_in": 604800,
  "refresh_token": "WXZ5IABDzV8CDBdzcmUUTbN84IDH9x",
  "username": "johnyburd",
  "discriminator": "1022",
  "avatar": "9ce5a006548f1ae3e5c8fb91a4d677e4",
  "id": "214037134477230080"
}
```
