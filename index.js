export default (selector, rule) => {

  let styles = ''
  let count = 0

  document.querySelectorAll(selector).forEach(tag => {

    rule.replace(/--([^;]+):(.+)[;}]*/gm, (string, property, value) => {

      tag.setAttribute(`data-${property}`, value)

    })

    const attr = selector.replace(/\W+/g, '')
    const evaluated = rule.replace(/var\(--([^)]+)\)/g, (string, match) => {

      if (tag.getAttribute(`data-${match}`) !== null) {

        return tag.getAttribute(`data-${match}`)

      } else if (tag.closest(`[data-${match}]`) && tag.closest(`[data-${match}]`).getAttribute(`data-${match}`) !== null) {

        return tag.closest(`[data-${match}]`).getAttribute(`data-${match}`)

      } else {

        if (match in window) {

          return (new Function(`return ${match}`))() || ''

        }

      }

    })

    tag.setAttribute(`data-variable-${attr}`, count)
    styles += `[data-variable-${attr}="${count}"] { ${evaluated} }\n`
    count++

  })

  return styles

}