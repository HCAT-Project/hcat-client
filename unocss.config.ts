import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: { DEFAULT: '#4050B5', light: '#5D63BE' },
      important: { DEFAULT: '#CE5457' },
      warning: { DEFAULT: '#FFC05B' },
      safe: { DEFAULT: '#00C9A7' },
      input: { DEFAULT: '#FFFFFF' },
      link: '#0086D1',
      text: { DEFAULT: '#000000', light: '#FFFFFF', secondary: '#828387' },
      back: { DEFAULT: '#131313', gray: '#212328', light: '#2E343D' },
    },
  },
  shortcuts: [
    ['border-base', 'border border-gray-600 border-op-40'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    // presetWebFonts({
    //   fonts: {
    //     sans: 'DM Sans',
    //     serif: 'DM Serif Display',
    //     mono: 'DM Mono',
    //   },
    // }),
  ],
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
})
