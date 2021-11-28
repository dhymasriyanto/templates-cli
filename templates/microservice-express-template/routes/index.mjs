'use strict'

import express from 'express'
const router = express.Router()
import { service } from './service.mjs'

// middleware that is specific to this router
router.use((req, res, next)=> {
	console.log('Time: ', Date.now())
	next()
})

router.use('/service', service )

export {router}
