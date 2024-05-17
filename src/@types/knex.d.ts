import { Knex } from 'knex'
import { boolean } from 'zod'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
      password_hash: string
      created_at: Date
    },
    meals: {
      id: string
      user_id: string
      name: string
      description: string
      diet_meal: boolean
      meal_time: Date
      created_at: Date
      updated_at: Date
    }
  }
}