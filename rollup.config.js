import typescript from 'rollup-plugin-typescript2'

import scss from 'rollup-plugin-scss'
import copy from 'rollup-plugin-copy'
import pkg from './package.json' assert {type: 'json'}

export default {
	input: ['src/main.ts'],
	output: [
		{
			file: pkg.main,
			format: 'cjs'
			// file: 'dist/main.js',
			// format: 'esm'
		}
	],
	plugins: [
		scss(),
		typescript({objectHashIgnoreUnknownHack: false}),
		copy({
			targets: [{src: 'src/IWake.scss', dest: 'dist'}, {
				src: 'src/IWake-table-sticky.scss',
				dest: 'dist'
			}, {src: 'src/IWakeNoRoot.scss', dest: 'dist'}]
		})
	],
	external: ['react', 'react-dom', 'path', 'fs', 'moment-timezone', 'readline', '@solidbasisventures/intelliwaketsfoundation', '@fortawesome/react-fontawesome', '@fortawesome/pro-regular-svg-icons', '@fortawesome/pro-solid-svg-icons', 'cleave.js/react', 'react-router-dom', 'react-switch', 'axios', '@fortawesome/pro-solid-svg-icons/faSpinnerThird']
}
