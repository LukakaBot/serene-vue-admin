import { defineConfig } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  // ...UnoCSS options
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  shortcuts: {
    'base-container': 'm-10px border-rd-1 h-[calc(100%-20px)] px-3 py-2 flex flex-col',
    'title-tag': 'flex items-center before:content-[""] before:inline-block before:mr-5px before:my-10px before:pr-5px before:h-1rem before:bg-blue-500 before:border-rd-4px text-16px font-400',
  },
})