import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  fmt: {
    arrowParens: 'avoid',
    sortTailwindcss: true,
    experimentalOperatorPosition: 'end',
    bracketSameLine: false,
    bracketSpacing: true,
    embeddedLanguageFormatting: 'auto',
    endOfLine: 'lf',
    insertFinalNewline: true,
    jsxSingleQuote: false,
    objectWrap: 'preserve',
    printWidth: 100,
    proseWrap: 'preserve',
    quoteProps: 'as-needed',
    semi: true,
    singleAttributePerLine: true,
    singleQuote: true,
    sortImports: {
      internalPattern: ['@/', '~/'],
    },
    sortPackageJson: true,
    tabWidth: 2,
    trailingComma: 'all',
    useTabs: false,
    vueIndentScriptAndStyle: true,
    overrides: [
      {
        files: ['wrangler.jsonc'],
        options: { trailingComma: 'none' },
      },
    ],
  },
  lint: {
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: {
      'vite-plus/prefer-vite-plus-imports': 'error',
      'typescript/no-deprecated': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-template': 'error',
      'object-shorthand': 'error',
      'typescript/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-string-starts-ends-with': 'error',
      'unicorn/throw-new-error': 'error',
      'unicorn/error-message': 'error',
    },
    options: { typeAware: true, typeCheck: true },
    plugins: ['vue', 'import', 'oxc', 'promise', 'unicorn', 'typescript', 'eslint', 'vitest'],
    categories: {
      correctness: 'error',
      perf: 'error',
    },
    env: { node: true, es2024: true },
  },
  run: {
    cache: true,
  },
});
