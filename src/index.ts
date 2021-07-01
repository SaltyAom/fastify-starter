import fastify from 'fastify'

import helmet from 'fastify-helmet'
import compress from 'fastify-compress'
import staticPlugin from 'fastify-static'

import dotenv from 'dotenv'
import { resolve } from 'path'

import base from '@modules/base'
import run from '@services/cluster'

dotenv.config()

const app = fastify()

const main = () => 
    app
        .register(helmet)
        .register(compress)
        .register(staticPlugin, {
            root: resolve('../public')
        })
        .register(base)
        .listen(3000, '0.0.0.0', (error, address) => {
            if (error) return console.error(error)

            console.log(`Running at ${address}`)
        })

run(main)
