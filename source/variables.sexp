mixin('variables', ['selector', 'rule'],
  returnValue('Array.from(document.querySelectorAll(selector))',
    reduceFunc(
      prelude('      rule.replace(/--([^;]+):(.+)[;}]*/gm, (string, property, value) => {\n\n\
        tag.setAttribute(`data-${property}`, value)\n\n\
      })\n\n\
      const evaluated = rule.replace(/var\\(--([^)]+)\\)/g, (string, match) => {\n\n\
        if (tag.getAttribute(`data-${match}`) !== null) {\n\n\
          return tag.getAttribute(`data-${match}`)\n\n\
        } else if (\n\
          tag.closest(`[data-${match}]`)\n\
          && tag.closest(`[data-${match}]`).getAttribute(`data-${match}`) !== null\n\
        ) {\n\n\
          return tag.closest(`[data-${match}]`).getAttribute(`data-${match}`)\n\n\
        } else {\n\n\
          if (match in window) {\n\n\
            return (new Function(`return ${match}`))() || \'\'\n\n\
          }\n\n\
        }\n\n\
      })\n\n',
        createAttribute(['selector'],
          addAttribute('tag', 'variable',
            addRule('', '', 'variable', '${evaluated}')))))))
