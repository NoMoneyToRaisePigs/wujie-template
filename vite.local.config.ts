import path from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import ElementPlus from 'unplugin-element-plus/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.join(__dirname, './'), '')

  console.log('-------------------------------------------')
  console.log(env.VITE_APP_API_URL)
  console.log(process.env.NODE_ENV)

  return {
    root: './local',
    plugins: [
      vue(),
      Components({
        dirs: ['../src/components'],
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
        directoryAsNamespace: true,
        resolvers: [
          // NOTE: Do not put icon resolver here: Icon would be manually imported
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
        types: [
          {
            from: 'vue-router',
            names: ['RouterLink', 'RouterView'],
          },
        ],
        dts: '../src/components.d.ts',
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/,
          /\.vue$/, /\.vue\?vue/,
        ],
        imports: [
          'vue',
          'vue-router',
          {
            '@vueuse/core': [],
          },
        ],
        defaultExportByFilename: false,
        dirs: ['./composables/**'],
        dts: '../src/auto-imports.d.ts',
        vueTemplate: false,
        resolvers: [ElementPlusResolver()],
        // Generate corresponding .eslintrc-auto-import.json file.
        // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
        eslintrc: {
          enabled: false, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
      // ElementPlus({

      // }),
    ],
    resolve: {
      alias: {
        // note the alias below here would be the opposite as tsconfig.local.json
        '~': path.join(__dirname, './local/src'),
        '@': path.join(__dirname, './src'),
      },
    },
    build: {
      sourcemap: 'inline',
    },
    css: {},
    server: {
      open: true,
      host: 'localhost',
      port: 5174,
      proxy: {
        '/admin-api/': {
          target: env.VITE_APP_API_URL,
          changeOrigin: true,
        },
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    },
  }
})
