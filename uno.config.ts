import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'base-container':
      'flex flex-col gap-10px mx-2.5 mb-2.5 p-2.5 h-[calc(100%-20px)] bg-[var(--n-color)] border-rd-1 overflow-y-auto transition duration-300 ease-[var(--n-bezier)]',
    'left-tag-title':
      'inline-block relative text-xl font-bold z-0 after:content-[""] after:absolute after:left-0 after:h-full after:w-0.5rem after:bg-[var(--primary-color)] after:-z-1',
    'bottom-tag-title':
      'inline-block relative text-xl font-bold z-0 after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-2 after:w-full after:bg-[var(--primary-color)] after:-z-1',
  },
  presets: [presetIcons(), presetWind3(), presetAttributify()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
