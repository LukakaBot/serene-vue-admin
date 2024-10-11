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
    'base-container': 'flex flex-col mx-10px mb-10px px-3 py-2 h-[calc(100%-20px)] bg-#fff border-rd-1',
    'left-tag-title':
      'before:content-[""] before:inline-block before:mr-10px before-w-5px before:h-1rem before:bg-blue-500 before:rounded flex items-center my-10px text-20px font-600',
    'bottom-tag-title': 'inline-block relative mb-4 text-2xl font-bold z-0 after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-2 after:w-full after:bg-green after:-z-1',
  },
})