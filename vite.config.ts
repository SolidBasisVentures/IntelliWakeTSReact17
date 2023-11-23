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
