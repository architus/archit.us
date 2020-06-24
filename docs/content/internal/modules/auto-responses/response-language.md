---
title: Response Language
---

Auto responses include the response string, which can contain various syntax features such as shortcodes, reactions, lists (which can themselves be nested). To allow for an arbitrary level of nesting, an [antlr](https://www.antlr.org/) language definition was developed to generate a parser.

This parser is then run upon auto response creation/updating to develop a syntax tree that can be used for:

1. template/shortcode substitution upon auto response triggering
2. syntax highlighting on the web dashboard

### Example

This should be updated to show a graphical tree instead of this garbage

```text
hello [adj] [this is a list, with nested stuff [owl], [[member], [author]]]
```

```text
(response
  hello
  (respObj [adj])
  (respObj
    (respList
      [
      (listElement
        (response this is a list)
        ,
      )
      (listElement
        (response
          with nested stuff
          (respObj [owl])
        )
        ,
      )
      (response
        (respObj
          (respList
            [
            (listElement
              (response
                (respObj [member])
              )
              ,
            )
            (response
              (respObj [author])
            )
            ]
          )
        )
      )
      ]
    )
  )
)
```
### Grammar
[this should link to develop once it's merged](https://github.com/architus/architus/blob/docker/lib/response_grammar/Response.g4)

<Collapse>
  <ExternalSnippet src="https://raw.githubusercontent.com/architus/architus/docker/lib/response_grammar/Response.g4" />
</Collapse>

### How to Update the Parser
`antlr4 -Dlanguage=Python3 Response.g4`
