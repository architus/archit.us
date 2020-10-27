---
title: Gulag
noTOC: true
---

Send your friends to the gulag!

## Usage
```
!gulag <member>
```

The gulag command starts a vote to throw a member in the gulag (aka add the role `kulak` to the member). Every vote over the required threshold will add
to the amount of time spent in the gulag.

In order to use this command, the gulag emoji must be set in architus's settings. Voting will then
take place by reacting to architus's message with the set emoji.

<Alert type="info">

**Note:** architus does not automatically manage the `kulak` role. You must set the permissions on it manually.

</Alert>


## Settings

The gulag settings pane can be accessed by the `settings gulag` command

###### Options
| name | type | description |
| ---- | ---- | ----------- |
| Gulag Emoji | emoji | the emoji used in the gulag vote |
| Gulag Threshold | int | required votes to send a member to the gulag |
| Gulag Severity | int | minutes the member will be gulaged (also scales the overflow penalty) |
