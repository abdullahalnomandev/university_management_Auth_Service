import mongoose from 'mongoose'
import { IGenericErrorResponse } from '../interfaces/common'
import { IGenericErrorMessage } from '../interfaces/error'

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    ({ path, message }) => ({
      path,
      message,
    })
  )

  const statusCode = 400
  return {
    statusCode,
    message: 'Validation error',
    errorMessages: errors,
  }
}

export default handleValidationError
