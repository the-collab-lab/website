import pluginAstro from 'eslint-plugin-astro';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...pluginAstro.configs.recommended,
	pluginPrettierRecommended,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
];
