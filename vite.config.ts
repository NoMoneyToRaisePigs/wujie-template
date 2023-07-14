import path from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import ElementPlus from 'unplugin-element-plus/vite'
import AutoImport from 'unplugin-auto-import/vite'

const myPlugin = () => ({
  name: 'configure-server',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // custom handle request...
      console.log('my custom middleware  ----', req.method)
      console.log('---------------------------------------------------------------')

      if(req.method === 'OPTIONS') {
        res.removeHeader('Access-Control-Allow-Origin')
        res.removeHeader('access-control-allow-origin')
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9527')

        res.setHeader('X-Test','talentGF')
        res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers','X-Custom-Header, Upgrade-Insecure-Requests, Content-Type, X-Admincommon-Tenant, X-Csrf, X-Lang, X-Token')
        res.setHeader('Access-Control-Allow-Credentials','true')

        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2))
        res.end()
      } else {
        next()
      }

    })
  },
})

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.join(__dirname, './'), '')

  console.log(env.VITE_APP_API_URL)

  return {
    plugins: [
      vue(),
      myPlugin(),
      Components({
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
        directoryAsNamespace: true,
        resolvers: [
          ElementPlusResolver({
            // importStyle: 'sass',
          }),
        ],
        types: [
          {
            from: 'vue-router',
            names: ['RouterLink', 'RouterView'],
          },
        ],
        dts: 'src/components.d.ts',
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
        dirs: ['./composables/**'], // all nested modules
        dts: 'src/auto-imports.d.ts',
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
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {},

    server: {
      open: true,
      host: 'localhost',
      port: 5174,
      // origin: 'http://localhost:5174',
      proxy: {
        '/admin-api/': {
          target: env.VITE_APP_API_BASE_URL,
          changeOrigin: true,
          // selfHandleResponse: true,
          configure: (proxy, options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err)
            })

            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log(
                'Sending Request:',
                req.method,
                req.url,
                ' => TO THE TARGET =>  ',
                proxyReq.method,
                proxyReq.protocol,
                proxyReq.host,
                proxyReq.path,
                JSON.stringify(proxyReq.getHeaders()),
              )

              console.log('\n')
            })

            proxy.on('proxyRes', (proxyRes, req, res) => {

              if(req.method !== 'OPTIONS') {
                res.removeHeader('Access-Control-Allow-Origin')
                res.removeHeader('access-control-allow-origin')
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9527')

                res.setHeader('X-Test','talentGF')
                res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS')
                res.setHeader('Access-Control-Allow-Headers','*')
                res.setHeader('Access-Control-Allow-Credentials','true')
              }


              // res.setHeader('content-type','application/json')

              console.log(
                'Received Response from the Target:',
                proxyRes.statusCode,
                req.url,
                JSON.stringify(proxyRes.headers),
              )

              console.log('\n')

              // console.log('proxy response', res)

              // proxyRes.pipe(res)
            })

          },
        },
      },
      // headers: {
      //   'Access-Control-Allow-Origin': 'http://localhost:9527,http://localhost:5174',
      //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      //   'Access-Control-Allow-Headers': '*',
      //   'Access-Control-Allow-Credentials': 'true',
      //   'X-test': 'talentGF',
      // },
    },
  }
})
