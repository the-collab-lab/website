module.exports = {
	root: true,
	settings: {
		'import/resolver': {
			typescript: {},
		},
	},
	env: {
		browser: true,
		node: true,
	},
	plugins: ['@typescript-eslint', 'import', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:astro/recommended',
		'plugin:prettier/recommended',
	],
	overrides: [
		{
			// Define the configuration for `.astro` file.
			files: ['*.astro'],
			// Allow Astro components to be parsed.
			parser: 'astro-eslint-parser',
			// Parse the script in `.astro` as TypeScript.
			parserOptions: {
				extraFileExtensions: ['.astro'],
				parser: '@typescript-eslint/parser',
			},
		},
	],
};
