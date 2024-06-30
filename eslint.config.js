import pluginAstro from 'eslint-plugin-astro';
import pluginImport from 'eslint-plugin-import';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { fixupPluginRules } from '@eslint/compat';
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
		plugins: {
			import: fixupPluginRules(pluginImport),
		},

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
];
