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
		{
			// Define the configuration for `<script>` tag.
			// Script in `<script>` is assigned a virtual file name with the `.js` extension.
			files: ['**/*.astro/*.js', '*.astro/*.js'],
			env: {
				browser: true,
				es2020: true,
			},
			parserOptions: {
				sourceType: 'module',
			},
			rules: {
				// override/add rules settings here, such as:
				// "no-unused-vars": "error"

				// If you are using "prettier/prettier" rule,
				// you don't need to format inside <script> as it will be formatted as a `.astro` file.
				'prettier/prettier': 'off',
			},
		},
	],
};
