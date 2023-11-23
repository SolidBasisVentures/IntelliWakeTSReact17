import {resolve} from 'path'
import {defineConfig} from 'vitest/config'
import dts from 'vite-plugin-dts'
import {viteStaticCopy} from 'vite-plugin-static-copy'

export default defineConfig({
	test: {},
	build: {
		target: 'es2015',
		lib: {
			entry: resolve(__dirname, 'src/main.ts'),
			name: 'main',
			fileName: 'main'
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'path', 'fs', 'moment-timezone', 'readline', '@solidbasisventures/intelliwaketsfoundation', '@fortawesome/react-fontawesome', '@fortawesome/pro-regular-svg-icons', '@fortawesome/pro-solid-svg-icons', 'cleave.js/react', 'react-router-dom', 'react-switch', 'axios', '@fortawesome/pro-solid-svg-icons/faSpinnerThird']
		}
	},
	plugins: [
		dts(),
		viteStaticCopy({
			targets: [
				{src: 'src/IWake.scss', dest: '.'},
				{
					src: 'src/IWake-table-sticky.scss',
					dest: '.'
				},
				{src: 'src/IWakeNoRoot.scss', dest: '.'}
			]
		})
	]
})
