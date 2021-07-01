import esbuild from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'
import alias from 'esbuild-plugin-alias'

import { resolve } from 'path'

esbuild.build({
    entryPoints: ['src/index.ts'],
    platform: 'node',
    format: 'esm',
    target: 'node14',
    outdir: '.dev',
    logLevel: 'error',
    bundle: true,
    plugins: [
        nodeExternalsPlugin(),
        alias({
            '@modules': resolve('./src/modules'),
            '@services': resolve('./src/services'),
        })
    ]
})
