'use strict'

import express from 'express'
const router = express.Router()
import { controller } from '../app/api/controller.mjs'
import multer from 'multer'
const upload = multer() // for parsing multipart/form-data

// define the home page route
// insert one data
router.route('/')
	.get(controller.all)
	.post(upload.array(), controller.add)

// find data by id
// update one data
// delete one data
router.route(':id').get(controller.findId)
	.put(upload.array(), controller.update)
	.delete(controller.delete)

// find specific data
router.route('/find/:value').get(controller.find)

// define the about route
router.route('/about').get(controller.about)

export {router as service}
