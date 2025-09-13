import antfu from '@antfu/eslint-config'
import vueMacros from '@vue-macros/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  vue: true,
},
{
  rules:{
    ...vueMacros.rules,
  }
})
