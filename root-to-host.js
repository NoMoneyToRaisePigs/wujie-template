const postcss = require('postcss')
const parser  = require('postcss-selector-parser')

// TODO: publish this as a post css plugin
module.exports = postcss.plugin('postcss-root-to-host', function() {
  // const pseudoIndex = 0
  const PESUDO_ROOT = ':root'
  const PESUDO_HOST = ':host'

  const transform = selectors => {
    selectors.walkPseudos((pseudo) => {
      // console.log(`pseudo${pseudoIndex++}`, pseudo)
      if (pseudo.value === PESUDO_ROOT) {
        pseudo.value = PESUDO_HOST
      }
    })
  }

  return function(css) {
    css.walkRules(function(rule) {
      if (rule.selector.indexOf(PESUDO_ROOT) !== -1) {
        rule.selector = parser(transform).processSync(rule.selector)
      }
    })
  }
})