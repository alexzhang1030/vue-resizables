import { resolve } from 'node:path'
import JSX from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue Resizables',
  description: 'The resize utilities of Vue.',
  vite: {
    // @ts-expect-error plugin type
    plugins: [JSX(), UnoCSS()],
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../src'),
      },
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Directives', link: '/directives/' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Get started', link: '/get-started/' },
        ],
      },
      {
        text: 'Directives',
        items: [
          { text: 'vResizable', link: '/directives/' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/alexzhang1030/vue-resizables' },
    ],
  },
})
