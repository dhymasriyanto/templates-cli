'use strict'

import { service as sql } from '../sql/index.mjs'
import dotenv from 'dotenv'

dotenv.config()

const cs = {} // Reusable ColumnSet objects.

class ServiceRepository{
	constructor (db, pgp){
		this.db = db
		this.pgp = pgp

		// set-up all ColumnSet objects, if needed:
		createColumnSets(pgp)
	}

	// Creates the table;
	async create(){
		return this.db.none(sql.create)
	}

	// Drop table
	async drop(){
		return this.db.none(sql.drop)
	}

	// Seed column
	async seeder(){
		return this.db.map(sql.seeder, [], row => row.id)
	}

	// Empty column
	async empty(){
		return this.db.none(sql.empty)
	}

	// List all table data; 
	async all() {
		return this.db.any(sql.all)
	}

	// find specific id
	async findId(id){
		return this.db.any(sql.findId, id)
	}

	// find specific data
	async find(values){
		return this.db.any(sql.find, `%${values}%`)
	}

	// add new data
	async add(data){
		return this.db.map(sql.add, {
			// example: data.example,  (Your column here(use + for parsing integer (I guess)))
		},row => row.id)
	}

	// update a data
	async update(data, id){
		return this.db.map(sql.update, {
			id: +id, // + for parsing integer (I guess)
			// example: data.example,  (Your column here)
		}, row => row.id)
	}

	// delete a data
	async delete(id){
		return this.db.map(sql.delete, id, row => row.id)
	}
}

// Example of statically initializing ColumnSet objects:
function createColumnSets(pgp) {
	// create all ColumnSet objects only once:
	if (!cs.insert) {

		// Type TableName is useful when schema isn't default "public",
		// otherwise you can just pass in a string for the table name.
		const table = new pgp.helpers.TableName({table: process.env.SERVICE, schema: process.env.DB_SCHEMA})

		cs.insert = new pgp.helpers.ColumnSet(
			[
				// the column of ur service (use '')
			],
			{table})
		cs.update = cs.insert.extend(['?id'])
	}
	return cs
}

export {ServiceRepository as service}
