---
title: Release v0.1.1
shortTitle: v0.1.1
noTOC: true
---

Minor release with new commands and lots of Emoji Manager improvements!

### Features

* `pugs [required_players] [game]` starts a tally in the channel to get pugs started
* `webcomic [comic]` fetches the current webcomic from xkcd or smbc
* `latex [expression]` compiles and renders a latex expression
* `emoji` command shows image previews of the unloaded emojis
* `emojilo` command shows emoji rankings

### Improvements

* Added tags to `settings` command (`stags` to view)
* Gave `gulag` a default emoji
* Gave `gulag` more options under the `settings gulag` tag
* Emoji manager supports emojis with duplicate names
* Emoji manager intelligently tracks emoji usage and keeps the most popular emojis loaded
* Emoji manager tracks the original uploader of an emoji


### Bugfixes

* Fixed a typo in the meme status
* Statistics features are more resilient to discord's API failing
* Emoji manager works again
* Emoji manager is no longer confused by managed or animated emoji
* Emoji manager no longer randomly duplicates emoji
* Emoji manager no longer randomly deletes emoji
