---
title: Music Commands
shortTitle: Music
---

Play all your favorite songs in in a voice channel.

## Commands
- [`play`](./#play): Add a youtube or spotify song to the queue
- [`skip`](./#skip): Skip the currently playing song
- [`clear`](./#clear): Remove all songs from the queue
- [`queue`](./#queue): List all of the songs currently in the queue

## Play

### Usage
```
!play <link|search term>
```

The play command will add the linked spotify or youtube song to the current queue.

If a spotify or youtube url is not passed, then architus will search youtube for the song and play
the first result.

<Alert type="info">

**NOTE:** If architus is not currently playing any music, then you must be in a voice channel before
running the command so that architus will know which voice channel to join.

</Alert>

<Alert type="info">

**NOTE:** Architus can only be in one voice channel at a time. Therefore only a single queue can exist
per server.

</Alert>

## Skip

### Usage
```
!skip
```

Skips the currently playing song and starts playing the next song in the queue or stop playing music
if there are no more songs left in the queue.

## Clear

### Usage
```
!clear
```

Clears all of the songs from the play queue and stops playing music.

## Queue

### Usage
```
!queue
```

Lists all of the songs in the current play queue.

## Permissions
In order for the music player to work properly, architus requires the following permissions:
* read messages
* send messages
* voice - connect
* voice - speak

## Settings

The emoji manager settings can be accessed through the `settings` command

###### Options
| name | type | description |
| ---- | ---- | ----------- |
| Music Enabled | bool | Whether architus will respond to music commands |
