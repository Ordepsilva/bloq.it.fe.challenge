import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      ui: true,
      environment: 'jsdom',
      exclude: [
        ...configDefaults.exclude,
        'e2e/**',
        'src/components/ui/**',
        'dist/**',
        '**/*.config.ts',
      ],
      root: fileURLToPath(new URL('./', import.meta.url)),
      reporters: ['default', ['html', { outputFile: './test-report/index.html' }]],

      coverage: {
        provider: 'v8',
        enabled: true,
        reporter: ['text', 'html'],
        reportsDirectory: './test-report/coverage',
        exclude: [
          'src/components/ui/**',
          'dist/**',
          'node_modules/**',
          'test-report/**',
          'src/main.ts',
          '**/**.config.ts',
          'src/router/**',
        ],
      },
    },
  }),
);
