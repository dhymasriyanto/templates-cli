'use strict'

// avoiding error on vscode using when import properties from '../../package.json' assert {type: 'json'}, using this instead: (you know, red is bad)
const {default: properties} = await import('../../package.json', { assert: {type: 'json'}})
import { db } from '../../database/index.mjs'

export let controller = {
	all: (req, res, next) => {
		db.service.all()
			.then(rows=>{
				res.json({
					status: 'success',
					data: rows,
					message: 'Retrieved ALL data'
				})
			})
			.catch(function (err) {
				return next(err)
			})
	},
	add: (req, res, next)=>{
		db.service.add(req.body)
			.then(rows=>{
				res.json({
					status:'success',
					data: rows,
					message: 'Data inserted'
				})
			})
			.catch(function (err) {
				return next(err)
			})
	},
	update: (req, res, next) => {
		db.service.update(req.body, req.params.id)
			.then(rows=>{
				res.json({
					status: 'success',
					data: rows,
					message: 'Data updated'
				})
			})
			.catch(function(error){
				return next(error)
			})
	},
	delete: (req, res, next) => {
		db.service.delete(req.params.id)
			.then(rows=>{
				res.json({
					status: 'success',
					data: rows,
					message: 'Data deleted'
				})
			})
			.catch(function (error) {
				return next(error)
			})
	},
	findId: (req, res, next) => {
		db.service.findId(req.params.id)
			.then(rows=>{
				res.json({
					status: 'success',
					data: rows,
					message: 'Retrieved ONE data'
				})
			})
			.catch(function (err) {
				return next(err)
			})
	},
	find: (req, res, next) => {
		db.service.find(req.params.value)
			.then(rows=>{
				res.json({
					status: 'success',
					data: rows,
					message: 'Retrieved similar data'
				})
			})
			.catch(function (err) {
				return next(err)
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
