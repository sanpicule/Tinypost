import {
  defineConfig,
  minimal2023Preset as preset,
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  preset: {
    ...preset,
    assetName: (type, size) => {
      if (type === 'transparent') return `pwa-${size.width}x${size.height}.png`
      if (type === 'maskable')
        return `maskable-icon-${size.width}x${size.height}.png`
      if (type === 'apple')
        return `apple-touch-icon-${size.width}x${size.height}.png`
      return `pwa-${size.width}x${size.height}.png`
    },
  },
  images: ['public/images/favion.ico'],
})
