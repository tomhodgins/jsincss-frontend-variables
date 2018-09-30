function variables(selector, rule) {

  return Array.from(document.querySelectorAll(selector))

    .reduce((styles, tag, count) => {

      rule.replace(/--([^;]+):(.+)[;}]*/gm, (string, property, value) => {

        tag.setAttribute(`data-${property}`, value)

      })

      const evaluated = rule.replace(/var\(--([^)]+)\)/g, (string, match) => {

        if (tag.getAttribute(`data-${match}`) !== null) {

          return tag.getAttribute(`data-${match}`)

        } else if (
          tag.closest(`[data-${match}]`)
          && tag.closest(`[data-${match}]`).getAttribute(`data-${match}`) !== null
        ) {

          return tag.closest(`[data-${match}]`).getAttribute(`data-${match}`)

        } else {

          if (match in window) {

            return (new Function(`return ${match}`))() || ''

          }

        }

      })

      const attr = selector.replace(/\W/g, '')

      tag.setAttribute(`data-variable-${attr}`, count)
      styles += `[data-variable-${attr}="${count}"] { ${evaluated} }\n`
      return styles

    }, '')

}
