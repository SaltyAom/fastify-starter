import fastify from 'fastify'

import helmet from 'fastify-helmet'
import compress from 'fastify-compress'
import staticPlugin from 'fastify-static'

import { resolve } from 'path'

import base from '@modules/base'
import run from '@services/cluster'

const app = fastify()

const main = () => 
    app
        .register(helmet)
        .register(compress)
        .register(staticPlugin, {
            root: resolve('./public')
        })
        .register(base)
        .listen(8080, '0.0.0.0', (error, address) => {
            if (error) return console.error(error)

            console.log(`Running at ${address}`)
        })

run(main)
