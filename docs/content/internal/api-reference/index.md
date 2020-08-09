---
shortTitle: General
title: General Implementation Details
---

Architus uses a multitude of common patterns throughout the application, such as authentication, ID issuance, and entity management.

## Hoar Frost

Reflecting the fact that hoar frost can occur on top of snow, hoar frost IDs can exist on top of Discord snowflakes as separate unique IDs. These are used to identify architus-specific objects, such as auto-responses, custom emojis, and log entries.

### Format

Same as [Discord Snowflake format](https://discordapp.com/developers/docs/reference#snowflakes). Potentially use hash/modulus of PID/overlay network ID/MAC address to fulfill worker/process ID slots.

### Epoch

Hoar Frosts use the Discord Epoch, the first second of 2015 or 1420070400000.
