import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [vue()],
  define: {
    __MTCAPTCHA_SERVICE1_HOST__: JSON.stringify(
      process.env.MTCAPTCHA_SERVICE1_HOST || 'SERVICE2_HOST'
    ),
    __MTCAPTCHA_SERVICE2_HOST__: JSON.stringify(
      process.env.MTCAPTCHA_SERVICE2_HOST || 'SERVICE2_HOST'
    ),
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MTCaptchaVue',
      fileName: (format) => `vue-mtcaptcha.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
    },
  },
});
