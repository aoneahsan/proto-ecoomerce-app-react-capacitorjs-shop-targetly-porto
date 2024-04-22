module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'standard-with-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  settings: {
    react: {
      version: 'detect' // Automatically detect the react version
    }
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  // overrides: [
  //   {
  //     env: {
  //       node: true,
  //     },
  //     files: [".eslintrc.{js,cjs}"],
  //     parserOptions: {
  //       sourceType: "script",
  //     },
  //   },
  // ],
  rules: {
    'no-unused-vars': 'error',
    // Rules set by ahsan which are meant to be like this until changed by ahsan due to some reason in future
    'no-console': 'warn',
    'no-debugger': 'warn',
    '@typescript-eslint/member-delimiter-style': 'off', // keep this off as it's useless
    'no-new': 'warn', // need this like this otherwise we can not use "new" keyword in our project, ahsan need to check this further to confirm.
    '@typescript-eslint/semi': 'off', // ahsan setup prettier like this so we need this thing off
    '@typescript-eslint/indent': 'off', // ahsan moved here, as we are using prettier and that formats the code in specific format which is showing error for this rule, so for now, commenting this but will need to think if this can be a problem or not in future.
    'react/prop-types': 'warn', // we are in type script and have proper types definitions
    'multiline-ternary': 'off', // ahsan need to verify this, talha commented this for now.
    '@typescript-eslint/promise-function-async': 'warn', // it's giving error on lazy components imports so need to debug that before we can enable this rule
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ]
  }
};
