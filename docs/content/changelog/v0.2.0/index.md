---
title: Release v0.2.0
shortTitle: v0.2.0
noTOC: true
---

Major release focusing on improving the auto response feature

View new documentation for autoresponses [here](/features/auto-responses)

### Features

* a server's auto responses can be viewed on the [web dashboard](https://archit.us/app) on the auto responses tab
* reacting to an auto response message with `:speech_balloon:` will give information on the auto response and its author
* auto responses support using regular expressions in the trigger

### Improvements

* error messages for `set` and `remove` are much more helpful
* added many settings to the auto response settings pane (`settings responses`)
* the server list on the web dashboard loads much more quickly

### Bugfixes

* fixed a problem that caused the `play` command to randomly stop working for hours at a time
