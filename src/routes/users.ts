import { FastifyInstance } from 'fastify'
import { knexClient } from '../database'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { hash } from 'bcryptjs'

export async function usersRoutes(app: FastifyInstance) {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8)
  })

  app.post('/register', async (request, reply) => {
    const { name, email, password } = createUserSchema.parse(
      request.body,
    )

    const password_hash = await hash(password, 6)

    const isEmailAlreadyRegistered = await knexClient('users').where('email', email).first()

    if (isEmailAlreadyRegistered) {
      return reply.status(400).send({
        message: 'Email already registered'
      })
    }

    const id = randomUUID()

    await knexClient('users')
      .insert({
        id,
        name,
        email,
        password_hash,
      })

    return reply.status(201).send({
      id,
      name,
      email
    })
  })
}