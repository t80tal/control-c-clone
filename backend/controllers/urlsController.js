import { StatusCodes } from 'http-status-codes'
import { Types } from 'mongoose'

import Url from '../models/Url.js'

import BadRequestError from '../errors/bad-request.js'
import ForbiddenError from '../errors/forbidden.js'
import UnAuthenticatedError from '../errors/unauthenticated-error.js'
import NotFoundError from '../errors/not-found.js'

export const createUrl = async (req, res) => {
  const { title, password, content } = req.body

  if (!title || !content) throw new BadRequestError('Title and content are required values.')

  const isContentValid = content.blocks && content.blocks.length > 0 && !!content.entityMap

  if (!isContentValid) throw new BadRequestError('Please provide valid content.')

  const url = await Url.create({ title, password, content })

  res.status(StatusCodes.CREATED).json(url)
}

export const getUrl = async (req, res) => {
  const { id: urlId } = req.params

  if (!Types.ObjectId.isValid(urlId)) throw new BadRequestError(`Id is not valid`)

  const url = await Url.findOne({ _id: urlId }).select('+password')

  if (!url) throw new NotFoundError(`No url with id :${urlId}`)

  if (url.password) throw new ForbiddenError('This data is locked with a password')

  res.status(StatusCodes.OK).json(url)
}

export const loginUrl = async (req, res) => {
  const { id: urlId, password } = req.body

  if (!urlId || !password) throw new BadRequestError('Id and password are required values.')

  const url = await Url.findOne({ _id: urlId }).select('+password')

  if (!url) throw new NotFoundError(`No url with id :${urlId}`)

  const isPasswordCorrect = await url.comparePassword(password)

  if (!isPasswordCorrect) throw new UnAuthenticatedError('Invalid password.')

  url.password = undefined

  res.status(StatusCodes.OK).json(url)
}
