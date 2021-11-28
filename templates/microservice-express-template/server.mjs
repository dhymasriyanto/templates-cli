'use strict'

import express from 'express'
import dotenv from 'dotenv'
import { router } from './routes/index.mjs'

const app = express()
dotenv.config()
const port = process.env.PORT

app.use(express.json()) // for parsing application/json

app.use(
	express.urlencoded({
		extended: true
	})
) // for parsing application/x-www-form-urlencoded

app.use('/', router)

app.listen(port, () => console.log(`Server started on port : ${port}`))
