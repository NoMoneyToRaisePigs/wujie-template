// import path from 'path'

// import { defineConfig, loadEnv } from 'vite'
// import vue from '@vitejs/plugin-vue'

// import ElementPlus from 'unplugin-element-plus/vite'

// // import Components from 'unplugin-vue-components/vite'
// // import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) =>{
//   const env = loadEnv(mode, path.join(__dirname, '../'), '')
//   console.log(env.VITE_APP_API_URL)

//   return {
//     plugins: [
//       vue(),
//       //NOTE: this elementPlus plugin would impact the source map, so comment it out for now
//       // ElementPlus({

//       // }),

//       // NOTE: This wouldn't resolve the element-plus components outsie the current src folder, so still tyring the best way ...
//       // Components({
//       //   globs: ['./src/components/*.{vue}', '../src/components/*.{vue}'],
//       //   extensions: ['vue'],
//       //   include: [/\.vue$/, /\.vue\?vue/],
//       //   exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/],
//       //   resolvers: [
//       //     ElementPlusResolver({
//       //       importStyle: 'sass',
//       //     }),
//       //   ],
//       //   types: [{
//       //     from: 'vue-router',
//       //     names: ['RouterLink', 'RouterView'],
//       //   }],
//       //   dts: '../src/components.d.ts',
//       // }),
//     ],
//     resolve: {
//       alias: {
//         // note the alias below here would be the opposite as tsconfig.local.json
//         '~': path.join(__dirname, 'src'),
//         '@': path.join(__dirname, '../src'),
//       },
//     },
//     css: {},
//     server: {
//       open: true,
//       port: 5174,
//       proxy: {
//         '/admin-api/': {
//           target: env.VITE_APP_API_URL,
//           changeOrigin: true,
//         },
//       },
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
//         'Access-Control-Allow-Headers': '*',
//       },
//     },
//   }
// })
