# jsincss-frontend-variables

A frontend variables plugin for [jsincss](https://github.com/tomhodgins/jsincss)

## About

This plugin is a JavaScript module that works with [JS-in-CSS stylesheets](https://responsive.style/theory/what-is-a-jic-stylesheet.html), to provide cascading frontend variables in HTML and JS-in-CSS, similar to CSS variables.

## Downloading

You can download `index.js` and add it to your codebase, or download it with npm:

```bash
npm install jsincss-frontend-variables
```

Another option that works for building or testing, that isn't ideal for production use, is linking to the module directly from a CDN like unpkg:

```html
<script type=module>
  import variables from 'https://unpkg.com/jsincss-frontend-variables/index.js'
</script>
```

## Importing

You can import the plugin into your own JavaScript modules in a couple of ways.

The first way is using the native [`import` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) in JavaScript. Here you can assign any name you want to the function you are importing, and you only need to provide a path to the plugin's `index.js` file:

```js
import variables from './node_modules/jsincss-frontend-variables/index.js'
```

If you want to use `require` to load this plugin instead, and use a bundler like Webpack or Parcel, make sure to add `.default` as you require it:

```js
const variables = require('jsincss-frontend-variables').default
```

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

```js
<script type=module>
  import jsincss from 'https://unpkg.com/jsincss/index.js'
  import variables from 'https://unpkg.com/jsincss-frontend-variables/index.js'

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
import variables from 'https://unpkg.com/jsincss-frontend-variables/index.js'

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
import jsincss from 'https://unpkg.com/jsincss/index.js'
import stylesheet from './path/to/stylesheet.js'

jsincss(stylesheet)
```

## Compatible JS-in-CSS Stylesheet Loaders

- [jsincss](https://github.com/tomhodgins/jsincss)