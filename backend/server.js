import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import xss from 'xss-clean'
import cors from 'cors'
import 'express-async-errors'

import connectDB from './db/connect.js'

import urlsRouter from './routes/urlsRoutes.js'

import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

const app = express()

dotenv.config()

if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'))

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(xss())

app.use('/urls', urlsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
