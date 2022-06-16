import 'dotenv/config'

import fastify from 'fastify'

import helmet from '@fastify/helmet'
import staticPlugin from '@fastify/static'

import { resolve } from 'path'

import { base } from '@modules'
import { run } from '@services'

const app = fastify()

const main = () =>
    app
        .register(helmet)
        .register(staticPlugin, {
            root: resolve('./public')
        })
        .register(base)
        .listen(
            {
                host: '0.0.0.0',
                port: 8080
            },
            (error, address) => {
                if (error) return console.error(error)

                console.log(`Running at ${address}`)
            }
        )

run(main)
