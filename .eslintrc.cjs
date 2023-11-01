module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },
  ignorePatterns: ['*.cjs', '*.config.ts', '**/*.css', '**/*.scss'],
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    './eslint-rules/typescript-rules.yaml',
    './eslint-rules/consistent-typeimports.yaml',
    './eslint-rules/functional-rules.yaml',
    './eslint-rules/import-rules.yaml',
    './eslint-rules/no-console.yaml',
    './eslint-rules/no-restricted-syntax.yaml',
    './eslint-rules/sort-imports.yaml',
    './eslint-rules/unused-vars.yaml',
    './eslint-rules/prefer-arrows.yaml'
  ],
  rules: {
    'no-unexpected-multiline': 2,
    'no-case-declarations': 0,
    'no-restricted-globals': 'error',
    eqeqeq: 'off',
    'prefer-const': 'error',
    'no-param-reassign': 'warn',
    'no-var': 'error',
    'arrow-body-style': ['warn', 'as-needed']
  },
  settings: {
    'import/extensions': ['.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    }
  }
}
