---
title: Statistics
---

See various statistics about the server and the world.

## Commands
- [`spellcheck`](./#spellcheck) - See how well (or poorly) a member can spell
- [`joins`](./#joins) - See member growth over time
- [`messagecount`](./#messagecount) - See top message senders and how many messages a member has sent
- [`optout`](./#optout) - Opt out of statistics tracking
- [`corona`](./#corona) - Graph of corona virus statistics

## Spellcheck
### Usage
```
!spellcheck <member>
```

Prints the number of correctly and incorrectly spelled words a user has sent since joining the
server and the corresponding percentage or correctly spelled words.

<Alert type="info">

**NOTE:** If a user has opted out of stats tracking their spelling statistics will not be sent.

</Alert>

## Joins
### Usage
```
!joins
```

Sends a graph of member growth over time.

## Messagecount
### Usage
```
!messagecount [member]
```

Prints a graph of how many messages the top 5 message senders in the server have sent. If a
member is specified, their specific message stats will also be sent.

<Alert type="info">

**NOTE:** If a user has opted out of stats tracking their message count will not be sent.

</Alert>

## Optout
### Usage
```
!optout
```

Run this command to remove your stats from anything that architus sends to the server. This
command is a toggle so it can be run again to opt back in to stats tracking.

## Corona
### Usage
```
!corona
```

This will print out a graph of the current number of deaths and cases of the Corona virus.

The graph uses [this](https://coronavirusapi.com/) dataset which will accurately reflect the current
numbers reported by all 50 US states and the District of Columbia.
