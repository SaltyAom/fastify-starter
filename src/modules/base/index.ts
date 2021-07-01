import type { FastifyInstance } from 'fastify'

const base = (app: FastifyInstance) => {
    app.get("/", (req, res) => {
        res.send("Working")
    })

    return app
}

export default base