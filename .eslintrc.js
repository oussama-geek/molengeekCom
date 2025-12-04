/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
    rules: {
        // on passe en "warn" (ou "off") pour débloquer
        '@typescript-eslint/no-explicit-any': 'off',
        'react/no-unescaped-entities': 'off',
        '@next/next/no-img-element': 'warn',
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        'prefer-const': 'warn',
    },
};
