import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    ignores: ['.next/**', 'node_modules/**', 'ref/**'],
    settings: {
      next: {
        rootDir: __dirname,
      },
    },
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
];

export default eslintConfig;
