import { RequestHandler } from 'express'
import { z } from 'zod'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const createUserZodSchema = z.object({
      body: z.object({
        role: z.string({ required_error: 'role is required' }),
      }),
      password: z.string().optional(),
    })
    await createUserZodSchema.parseAsync(req)

    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(200).json({
      status: 'success',
      message: 'User created successfully.',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserController = {
  createUser,
}
