import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { knexClient } from '../database'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'

interface Params {
  userId: string
}

export async function mealsRoutes(app: FastifyInstance) {
  const createMealCheckInSchema = z.object({
    name: z.string(),
    description: z.string(),
    mealTime: z.string(),
    isMealOnDiet: z.boolean(),
    userId: z.string()
  })

  app.get('/meals/:userId', async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
    const userId = request.params.userId

    const isUserRegistered = await knexClient('users').where('id', userId).first()

    if (!isUserRegistered) {
      return reply.status(400).send({
        message: 'User not registered'
      })
    }

    const meals = await knexClient('meals').where('user_id', userId)

    return meals
  })

  app.post('/meals', async (request: FastifyRequest, reply: FastifyReply) => {
    const {
      name,
      description,
      mealTime,
      isMealOnDiet,
      userId
    } = createMealCheckInSchema.parse(request.body)

    const id = randomUUID()

    const isUserRegistered = await knexClient('users').where('id', userId).first()

    if (!isUserRegistered) {
      return reply.status(400).send({
        message: 'User not registered'
      })
    }

    await knexClient('meals')
      .insert({
        id,
        name,
        description,
        meal_time: new Date(mealTime),
        diet_meal: isMealOnDiet,
        user_id: userId,
      })

    return reply.status(201).send({
      id,
      name,
    })
  })
}