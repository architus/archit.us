---
title: Release v0.1.2
shortTitle: v0.1.2
noTOC: true
---

Minor release addressing privacy concerns

### Features

* `optout` command allows users to opt out of architus's statistics collection

### Improvements

* `corona` now displays in log scale
* `latex` no longer requires quotes for multiple arguments
* `/stats/{guild.id}` now requires the user to be logged in and a member of the guild from which they are requesting data

### Bugfixes

* Fixed an exploit that allowed users to hog resources on the servers using `latex`
