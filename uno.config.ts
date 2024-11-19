import { defineConfig, presetUno, transformerVariantGroup, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  shortcuts: {
    'base-container': 'flex flex-col gap-10px mx-10px mb-10px px-3 py-2 h-[calc(100%-20px)] bg-#fff border-rd-1',
    'left-tag-title': 'inline-block relative mb-4 text-2xl font-bold z-0 after:content-[""] after:absolute after:left-0 after:h-full after:w-0.5rem after:bg-green after:-z-1',
    'bottom-tag-title': 'inline-block relative mb-4 text-2xl font-bold z-0 after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-2 after:w-full after:bg-green after:-z-1',
  },
})