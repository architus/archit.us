---
title: Authoring
---

Docs.archit.us is made possible through contributors made by project maintainers and community members. Each page corresponds to a Markdown file and can be edited via GitHub to then appear on the public site once the build completes.

This site contains both public-facing usage documentation and internal implementation documentation intended for contributors. As such, the pages are divided into two navigation trees: those under `/docs/internal/` and the remainder under the docs root (`/docs/`). Each appears separately on the side nav to the left.

## File format

### Frontmatter

```yml
// Titles
title: Primary page title (appears in <h1> at top) [Required]
shortTitle: Secondary page title (appears in tab title; falls back to title)
overrideNav: Side nav title (falls back to title)
overrideBreadcrumb: Breadcrumb segment title (falls back to shortTitle)

// Switches
noTOC: Disables a table of contents on the right side
noBreadcrumb: Disables the breadcrumb bar at the top
isRoot: Whether this page should form the root of a subtree
  (appear as its own top-level heading in the side nav)

// Misc
childrenOrder: Used to specify explicit ordering of direct children pages (by slug)
```

Page content can be specified using standard markdown format, with additional [MDX elements](#mdx-elements) available to enhance docs layout and semantics.

### Page Generation

Docs pages are generated for each path segment in the entire navigation tree created by all docs `.md` pages. This means that if, for example, there were 2 markdown files in the `/docs` folder:

```text
/docs/
├── pathA/
│   └── pathB/
│       └── index.md
└── index.md
```

Then, there would be **three generated docs pages**: `/`, `/pathA/`, and `/pathA/pathB/`. In this case, `/pathA/` would be designated as an *orphan page* because it doesn't have a corresponding markdown file for content. In this mode, it will only contain an auto-generated title from the path segment as well as an [In This Section `<Overview>`](#overview) component.


## Headings

<Demo>

```md
# h1 - Lorem ipsum

## h2 - Lorem ipsum

### h3 - Lorem ipsum

#### h4 - Lorem ipsum

##### h5 - Lorem ipsum

###### h6 - Lorem ipsum
```

<div>
{/* These are html elements to prevent them from being added to ToC */}
<h1 style={{marginTop: 0}}>h1 - Lorem ipsum</h1>
<h2>h2 - Lorem ipsum</h2>
<h3>h3 - Lorem ipsum</h3>
<h4>h4 - Lorem ipsum</h4>
<h5>h5 - Lorem ipsum</h5>
<h6>h6 - Lorem ipsum</h6>
</div>
</Demo>

## Elements

### Blockquote

<Demo>

```md
> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elementum egestas pretium.
> Proin laoreet arcu et scelerisque facilisis. In hac habitasse platea dictumst. Curabitur ut
> eleifend dui. Morbi eu congue ipsum. Proin fermentum dui hendrerit, mattis ligula id,
> pharetra lacus. Pellentesque sodales nibh et auctor maximus. Donec sed mauris odio.
```

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elementum egestas pretium. Proin laoreet arcu et scelerisque facilisis. In hac habitasse platea dictumst. Curabitur ut eleifend dui. Morbi eu congue ipsum. Proin fermentum dui hendrerit, mattis ligula id, pharetra lacus. Pellentesque sodales nibh et auctor maximus. Donec sed mauris odio.

</Demo>

### Lists

<Demo>

```md
- Unordered
- list
```

- Unordered
- list

</Demo>
<Demo>

```md
1. Ordered
2. list
```

1. Ordered
2. list

</Demo>

### Code Block

<Demo>

~~~md
```py
async def all_guilds(self):
    """Return information about all guilds that the bot is in, including their admins"""
    guilds = []
    for shard, shard_store in self.store.items():
        guilds += shard_store.get('guilds', ())
    return guilds
```
~~~

```py
async def all_guilds(self):
    """Return information about all guilds that the bot is in, including their admins"""
    guilds = []
    for shard, shard_store in self.store.items():
        guilds += shard_store.get('guilds', ())
    return guilds
```

</Demo>

#### Inline Code Block

<Demo>

```md
`src/manager/app.py` is the main application file for the shard manager
```

`src/manager/app.py` is the main application file for the shard manager

</Demo>

## MDX elements

To auto-generate docs pages, the site uses [MDX](https://github.com/mdx-js/mdx) under the hood to render Markdown content with custom React components. With that in mind, there are a few components that are available to page authors.

To add new ones, a component can be authored and then included in the [MDX scope](https://github.com/architus/docs.archit.us/blob/master/src/components/Mdx/mdx_scope.js) file.

### Routes

#### Restful API Routes

<Demo>

```jsx
<Route method="METHOD" path="/route/{parameter}/segment" auth />
```

<Route method="METHOD" path="/route/{parameter}/segment" auth />
</Demo>

#### Gateway API Routes

<Demo>

```jsx
<GatewayRoute
  eventName="request_elevation"
  room="<SID>"
  sentFrom="client"
  requiresElevation
  payload={{
    token: {
      type: "string",
      description: "Authentication Token"
    }
  }}
/>
```

<GatewayRoute
  eventName="request_elevation"
  room="<SID>"
  sentFrom="client"
  requiresElevation
  payload={{
    token: {
      type: "string",
      description: "Authentication Token"
    }
  }}
/>

</Demo>

### Overview

The `<Overview>` component can be used to provide an overview of a page's children in the navigation tree.

<Demo>

```jsx
<Overview />
```

<Article>
<h2 style={{ marginTop: 0 }}>In This Section</h2>

- [Auto Responses](/internal/modules/auto-responses/)
- [Settings](/internal/modules/settings/)

</Article>
</Demo>

### Demo

The Demo component can be used to show a source/result relationship, which is prevalent throughout the authoring page to demonstrate MDX/markdown features.

<Demo>

```jsx
<Demo>

~~~md
## Lorem ipsum

Etiam blandit diam sit amet pharetra pellentesque. Integer auctor nisl et sodales
imperdiet. Integer vitae tincidunt augue. Duis condimentum lectus at tincidunt
vehicula. Maecenas ultricies erat id nunc tempus, malesuada accumsan justo
dignissim. Nam interdum vitae arcu et pharetra. Integer eget faucibus arcu.
~~~

<div>

## Lorem ipsum

Etiam blandit diam sit amet pharetra pellentesque. Integer auctor nisl et sodales
imperdiet. Integer vitae tincidunt augue. Duis condimentum lectus at tincidunt
vehicula. Maecenas ultricies erat id nunc tempus, malesuada accumsan justo
dignissim. Nam interdum vitae arcu et pharetra. Integer eget faucibus arcu.

</div>
</Demo>
```

<Demo>

~~~md
## Lorem ipsum

Etiam blandit diam sit amet pharetra pellentesque. Integer auctor nisl et sodales
imperdiet. Integer vitae tincidunt augue. Duis condimentum lectus at tincidunt
vehicula. Maecenas ultricies erat id nunc tempus, malesuada accumsan justo
dignissim. Nam interdum vitae arcu et pharetra. Integer eget faucibus arcu.
~~~

<Article>
<h2 style={{ marginTop: 0 }}>Lorem ipsum</h2>

Etiam blandit diam sit amet pharetra pellentesque. Integer auctor nisl et sodales
imperdiet. Integer vitae tincidunt augue. Duis condimentum lectus at tincidunt
vehicula. Maecenas ultricies erat id nunc tempus, malesuada accumsan justo
dignissim. Nam interdum vitae arcu et pharetra. Integer eget faucibus arcu.

</Article>
</Demo>
</Demo>

### Alerts

Alerts are a block-level wrapper element that can be used to give emphasis or semantic information to a block of content depending on the *type* of alert used.

<Demo>

```jsx
<Alert type="info">

**Informative** content here, such as general tips or bits of info

</Alert>
```

<Alert type="info">

**Informative** content here, such as general tips or bits of info

</Alert>

</Demo>
<Demo>

```jsx
<Alert type="warning">

**Cautious** content here, such as general warnings against bad practices or incorrect usage

</Alert>
```

<Alert type="warning">

**Cautious** content here, such as general warnings against bad practices or incorrect usage

</Alert>

</Demo>
<Demo>

```jsx
<Alert type="danger">

**Error** content here, such as important scenarios to avoid or errors that might occur in the
process

</Alert>
```

<Alert type="danger">

**Error** content here, such as important scenarios to avoid or errors that might occur in the process

</Alert>

</Demo>
<Demo>

```jsx
<Alert type="success">

**Success** content here, such as success scenarios or ways to tell if an action was
successful

</Alert>
```

<Alert type="success">

**Success** content here, such as success scenarios or ways to tell if an action was successful

</Alert>

</Demo>

### Collapse

<Demo>

~~~jsx
<Collapse>

# Lorem ipsum

Etiam blandit diam sit amet pharetra pellentesque. Integer auctor nisl et sodales
imperdiet. Integer vitae tincidunt augue. Duis condimentum lectus at tincidunt
vehicula. Maecenas ultricies erat id nunc tempus, malesuada accumsan justo dignissim.
Nam interdum vitae arcu et pharetra. Integer eget faucibus arcu.

</Collapse>
~~~
<Collapse>
<Article>

<h1>Lorem ipsum</h1>

Etiam blandit diam sit amet pharetra pellentesque. Integer auctor nisl et sodales imperdiet. Integer vitae tincidunt augue. Duis condimentum lectus at tincidunt vehicula. Maecenas ultricies erat id nunc tempus, malesuada accumsan justo dignissim. Nam interdum vitae arcu et pharetra. Integer eget faucibus arcu.

</Article>
</Collapse>
</Demo>

### Snippets

#### Internal Snippet

Snippets from the local repository can be embedded on the site (either inside a `<Collapse>` component or outside) via the following syntax:

##### Within Collapse

<Demo>

~~~md
<Collapse>

`embed:internal/community/example-include.py`

</Collapse>
~~~

<Collapse>

`embed:internal/community/example-include.py`

</Collapse>
</Demo>

##### Standalone

<Demo>

```md
`embed:internal/community/example-include.py`
```

`embed:internal/community/example-include.py`

</Demo>

#### External Snippet

Snippets from online sources can be asynchronously loaded onto the page upon render. This means that they can be updated independently of the module build.

<Alert type="warning">

Without static syntax highlighting, extra steps must be taken to enable proper highlighting at runtime. This comes in the form of adding language imports to `/src/languages.js`. For example, to enable python, the following line must be added to `languages.js`:

```js
import "prismjs/components/prism-python.js";
```

</Alert>

##### Within Collapse

<Demo>

```jsx
<Collapse>
  <ExternalSnippet
    src={"https://gist.githubusercontent.com/jazevedo620/a28cdc92a624c290ccf91541b418bdae/"
       + "raw/1bfef7f4fb49df08d3685611354b71bd9424d4a6/app.py"}
    language="python"
  />
</Collapse>
```

<Collapse>
<ExternalSnippet src="https://gist.githubusercontent.com/jazevedo620/a28cdc92a624c290ccf91541b418bdae/raw/1bfef7f4fb49df08d3685611354b71bd9424d4a6/app.py" language="python" />
</Collapse>

</Demo>

##### Standalone

<Demo>

```jsx
<ExternalSnippet
  src={"https://gist.githubusercontent.com/jazevedo620/a28cdc92a624c290ccf91541b418bdae/"
     + "raw/1bfef7f4fb49df08d3685611354b71bd9424d4a6/app.py"}
  language="python"
/>
```

<ExternalSnippet src="https://gist.githubusercontent.com/jazevedo620/a28cdc92a624c290ccf91541b418bdae/raw/1bfef7f4fb49df08d3685611354b71bd9424d4a6/app.py" language="python" />
</Demo>
