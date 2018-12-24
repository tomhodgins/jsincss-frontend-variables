export default (selector, rule) => {
  const attr = selector.replace(/\W/g, '')
  const result = Array.from(document.querySelectorAll(selector))
    .reduce((output, tag, count) => {
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
      output.add.push({tag: tag, count: count})
      output.styles.push(`[data-variable-${attr}="${count}"] { ${evaluated} }`)
      return output
    }, {add: [], remove: [], styles: []})
  result.add.forEach(tag => tag.tag.setAttribute(`data-variable-${attr}`, tag.count))
  result.remove.forEach(tag => tag.setAttribute(`data-variable-${attr}`, ''))
  return result.styles.join('\n')
}
