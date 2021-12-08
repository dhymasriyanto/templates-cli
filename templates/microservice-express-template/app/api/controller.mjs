'use strict'

// avoiding error on vscode using when import properties from '../../package.json' assert {type: 'json'}, using this instead: (you know, red is bad)
const {default: properties} = await import('../../package.json', { assert: {type: 'json'}})
import { db } from '../../database/index.mjs'
import { response } from '../../helper/response.mjs'

export let controller = {
	all: (req, res, next) => {
		db.service.all()
			.then(rows=>{
				return response.ok(
					'success',
					'Retrieved all data',
					rows,
					res
				)
			})
			.catch((error)=> {
				return next(response.badRequest(error))
			})
	},
	add: (req, res, next)=>{
		db.service.add(req.body)
			.then(rows=>{
				return response.ok(
					'success',
					'Data inserted',
					rows,
					res
				)
			})
			.catch((error)=> {
				return next(response.badRequest(error))
			})
	},
	update: (req, res, next) => {
		db.service.update(req.body, req.params.id)
			.then(rows=>{
				return response.ok(
					'success',
					'Data updated',
					rows,
					res
				)
			})
			.catch((error)=> {
				return next(response.badRequest(error))
			})
	},
	delete: (req, res, next) => {
		db.service.delete(req.params.id)
			.then(rows=>{
				return response.ok(
					'success',
					'Data deleted',
					rows,
					res
				)
			})
			.catch((error)=> {
				return next(response.badRequest(error))
			})
	},
	findId: (req, res, next) => {
		db.service.findId(req.params.id)
			.then(rows=>{
				return response.ok(
					'success',
					'Retrieved one data',
					rows,
					res
				)
			})
			.catch((error)=> {
				return next(response.badRequest(error))
			})
	},
	find: (req, res, next) => {
		db.service.find(req.params.value)
			.then(rows=>{
				return response.ok(
					'success',
					'Retrieved similar data',
					rows,
					res
				)
			})
			.catch((error)=> {
				return next(response.badRequest(error))
			})
	},
	about: (req, res) => {
		let aboutInfo = {
			name: properties.name,
			version: properties.version,
		}
		res.json({
			status:'success',
			data: aboutInfo,
			message: 'Retrieved about info of the service'
		})
	},
}
