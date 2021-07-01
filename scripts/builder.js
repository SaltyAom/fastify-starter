import esbuild from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'
import alias from 'esbuild-plugin-alias'

import { resolve } from 'path'

esbuild.build({
    entryPoints: ['src/index.ts'],
    platform: 'node',
    format: 'esm',
    target: 'node14',
    outdir: 'build',
    bundle: true,
    minify: true,
    plugins: [
        nodeExternalsPlugin(),
        alias({
            '@modules': resolve('./src/modules'),
            '@modules': resolve('./src/services')
        })
    ]
})
