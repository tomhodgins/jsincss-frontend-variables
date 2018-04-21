# jsincss-frontend-variables

A frontend variables plugin for [jsincss](https://github.com/tomhodgins/jsincss)

## About

This plugin is a JavaScript module that works with [JS-in-CSS stylesheets](https://responsive.style/theory/what-is-a-jic-stylesheet.html), to provide cascading frontend variables in HTML and JS-in-CSS, similar to CSS variables.

## Downloading

You can download jsincss-frontend-variables and add it to your codebase manually, or download it with npm:

```bash
npm install jsincss-frontend-variables
```

Another option that works for building or testing, that isn't ideal for production use, is linking to the module directly from a CDN like unpkg:

```html
<script type=module>
  import variables from 'https://unpkg.com/jsincss-frontend-variables/index.vanilla.js'
</script>
```

## Importing

This plugin exists in three different formats:

- CommonJS module: [index.js](index.js)
- Vanilla JS module: [index.vanilla.js](index.vanilla.js)
- Browser function: [index.browser.js](index.browser.js)

You can import this plugin using the native [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) statement in JavaScript. Here you can assign any name you want to the function you are importing, and you only need to provide a path to the plugin's `index.vanilla.js` file:

```js
import variables from './index.vanilla.js'
```

You can also use the CommonJS-formatted module located at [index.js](index.js) with `require()` for use with bundlers that don't use vanilla JS modules.

Once you have imported this plugin into your module, you can use the plugin as `variables()`

## Using JS-in-CSS Stylesheets

The main goal of this plugin is to allow CSS authors the ability to set custom frontend variables in HTML or JS-in-CSS that cascade like CSS variables.

The plugin has the following format:

```js
variables(selector, rule)
```

- `selector` is a string containing a CSS selector
- `rule` is a string or template string containing a CSS rule

## Example

This example will use the `jsincss` plugin to load a JS-in-CSS stylesheet making use of this plugin. To test it in a JavaScript module, import both the `jsincss` package and any helper plugins you want:

```html
<script type=module>
  import jsincss from 'https://unpkg.com/jsincss/index.vanilla.js'
  import variables from 'https://unpkg.com/jsincss-frontend-variables/index.vanilla.js'

  jsincss(() => `

    ${variables('ul', `
      --color: blue
    `)}
    ${variables('ul li', `
      color: var(--color);
      background: var(--background);
    `)}

  `)
</script>
```

It's also possible to write your stylesheets as a separate JavaScript module like this, where you import any helper plugins at the top of the stylesheet:

```js
import variables from 'https://unpkg.com/jsincss-frontend-variables/index.vanilla.js'

export default () => `

  ${variables('ul', `
    --color: blue
  `)}
  ${variables('ul li', `
    color: var(--color);
    background: var(--background);
  `)}

`
```

And then import both the `jsincss` plugin and the stylesheet into your code and run them like this, suppling any `selector` or `events` list the `jsincss` plugin might need to apply the stylesheet only the the element(s) and event(s) you require, depending on what you're doing:

```js
import jsincss from 'https://unpkg.com/jsincss/index.vanilla.js'
import stylesheet from './path/to/stylesheet.js'

jsincss(stylesheet)
```

## Compatible JS-in-CSS Stylesheet Loaders

- [jsincss](https://github.com/tomhodgins/jsincss)