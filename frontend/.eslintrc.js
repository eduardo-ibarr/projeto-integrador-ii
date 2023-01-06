module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'prettier'],
	rules: {
		'react/prop-types': ['off'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'prettier/prettier': ['warn'],
	},
};
