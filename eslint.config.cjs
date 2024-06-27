module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/essential',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'./.eslintrc-auto-import.json',
	],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
	plugins: ['@typescript-eslint', 'vue'],
	rules: {
		'no-console': 'off',
		'prettier/prettier': 1,
		// Vue: Recommended rules to be closed or modify
		'vue/require-default-prop': 0,
		'vue/singleline-html-element-content-newline': 0,
		'vue/max-attributes-per-line': 0,
		// Vue: Add extra rules
		'vue/custom-event-name-casing': [2, 'camelCase'],
		'vue/no-v-text': 1,
		'vue/padding-line-between-blocks': 1,
		'vue/require-direct-export': 1,
		'vue/multi-word-component-names': 0,
		// Allow @ts-ignore comment
		'@typescript-eslint/ban-ts-comment': 0,
		'@typescript-eslint/no-unused-vars': 1,
		'@typescript-eslint/no-empty-function': 1,
		'@typescript-eslint/no-explicit-any': 'error',
		'import/extensions': [
			2,
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'no-param-reassign': 0,
		'prefer-regex-literals': 0,
		'import/no-extraneous-dependencies': 0,
	},
};
