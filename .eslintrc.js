module.exports = {
	plugins: ['react'],
	parserOptions: {
		ecmaVersion: 2018, // Allows modern ECMAScript features
		sourceType: 'module', // Allows using import/export
		ecmaFeatures: {
			jsx: true, // Allows parsing of JSX
		},
	},
	rules: {
		'react/jsx-key': 'error', // Warns if .map() elements do not have a key attribute
	},
	settings: {
		react: {
			version: 'detect', // React version auto-detection
		},
	},
};
