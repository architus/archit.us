---
title: Auto Responses
---

Auto Responses are a major feature of Architus that lets users pre-configure specific trigger-response pairs for the bot to say whenever it detects the trigger occurring in text chat. This can be useful for server administrators to configure custom commands or otherwise automatic responses.

## Triggers

There are **three** main types of auto response triggers that determine the way text chat messages are scanned and matched to triggers. *Note that regardless of the mode, the original triggers will be retained for display on the web dashboard.*

1. **No punctuation**: Text-based trigger that ignores whitespace and punctuation in trigger
   - Strips all whitespace and punctuation from **matching trigger** and **matching text**
2. **Some punctuation**:  Text-based trigger that ignores all whitespace and punctuation except what appears in the original trigger
   - Strips all whitespace from **matching trigger** and **matching text**, but not punctuation that is used in original trigger (excluding mention and emoji fragments)
   - Regex escaping is added for everything
3. Begins with `^` and ends with `$`: matches a regex
    - Implement in future release?
    - How to prevent catastrophic backtracking/ReDoS?
      - Look into implementing with [rure library](https://pypi.org/project/rure/) or maybe google's [re2](https://pypi.org/project/re2/)
    - `^.*aba.*$`
      - Makes it opt-in to have "glue" instead of opt-out for better default performance
    - Don't really need to escape anything

### Mode Assignment Heuristic

The above modes will automatically be assigned depending on an educated guess from the backend. To accomplish this, the triggers must be first fragmented to only look at non-emoji/mention components:

#### Fragments

Original trigger string: `<@54435432534524423> hello :)` becomes:

```json
[ 
   { 
      "type": "mention",
      "text": "<@54435432534524423>"
   },
   { 
      "type": "fragment",
      "text": " hello :)"
   }
]
```

> Only `text` fragments will be used for the mode assignment heuristic and the sensitive punctuation pool.

### Auto Response Object

###### Auto Response Structure

| Field               | Type        | Description                                                             |
| ------------------- | ----------- | ----------------------------------------------------------------------- |
| id                  | hoar frost  | unique [hoar frost ID](../../api-reference/#hoar-frost) for the auto response    |
| trigger             | string      | **original** trigger from command/added response                        |
| trigger_regex       | regex       | derived regular expression from (escaped) trigger text                  |
| trigger_punctuation | tuple       | list of punctuation that a sensitive trigger cares about                |
| response            | string      | response text to use upon invokation                                    |
| response_ast        | json string | [lexed and parsed response](./response-language)                        |
| mode                | string enum | type of matching mode to use. One of `["naive", "punctuated", "regex"]` |
| author_id           | snowflake   | user id of the author                                                   |
| guild_id            | snowflake   | guild id of the owning guild                                            |
| count               | integer     | number of times the auto response has been invoked                      |

### Quotas

Quota setting for each non-admin user to have maximum number of auto-response to be able to use.

As a potential reach goal, roles can be used to assign more specific quota amounts within settings. **This can be implemented in a future version**.

### Length Restrictions

Settings for minimum length for trigger and maximum length of response

Consider implementing internal maximum length of trigger restriction to prevent extremely long regular expressions.

### Trigger Priority

Have priority be a function of mode and author (admin or not). **This should be reflected on the frontend somehow**.

- This is irrelevant if collisions are impossible

### UI Context view

> Include info about previous conflicts & previous triggers (integration with logs)

### Command Conflicting

Check for collisions when trigger regex is generated? [potential resource](https://qntm.org/greenery). This option might require a limit on responses per guild depending on how expensive it is to check.
