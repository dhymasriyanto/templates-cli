'use strict'

// Import QueryFile using ESModule, but keep export it in defaults.
// Original way is : const {QueryFile} = require('pg-promise'); but it can't be import { QueryFile } from "pg-promise";
import pkg from 'pg-promise'
const { QueryFile } = pkg

// __dirname doesn't exist in ESModule, so make it compatible with import.meta.url, but it didn't same as __dirname, so need some modification at it, then it become:
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = fileURLToPath(dirname(import.meta.url))

// renaming import 
// Use this instead of const {join: joinPath} =  await import('path');
import { join as joinPath } from 'path'

///////////////////////////////////////////////////////////////////////////////////////////////
// Criteria for deciding whether to place a particular query into an external SQL file or to
// keep it in-line (hard-coded):
//
// - Size / complexity of the query, because having it in a separate file will let you develop
//   the query and see the immediate updates without having to restart your application.
//
// - The necessity to document your query, and possibly keeping its multiple versions commented
//   out in the query file.
//
// In fact, the only reason one might want to keep a query in-line within the code is to be able
// to easily see the relation between the query logic and its formatting parameters. However, this
// is very easy to overcome by using only Named Parameters for your query formatting.
////////////////////////////////////////////////////////////////////////////////////////////////

export const service= {
	create: sql('service/migrations/create.sql'),
	drop: sql('service/migrations/drop.sql'),
	seeder: sql('service/seeds/seeder.sql'),
	empty: sql('service/seeds/empty.sql'),
	all: sql('service/all.sql'),
	findId: sql('service/findId.sql'),
	find: sql('service/find.sql'),
	add: sql('service/add.sql'),
	update: sql('service/update.sql'),
	delete: sql('service/delete.sql')
}

///////////////////////////////////////////////
// Helper for linking to external query files;
function sql(file) {

	const fullPath = joinPath(__dirname, file) // generating full path;
	const options = {

		// minifying the SQL is always advised;
		// see also option 'compress' in the API;
		minify: true

		// See also property 'params' for two-step template formatting
	}

	const qf = new QueryFile(fullPath, options)

	if (qf.error) {

		// Something is wrong with our query file :(
		// Testing all files through queries can be cumbersome,
		// so we also report it here, while loading the module:
		console.error(qf.error)
	}

	return qf

	// See QueryFile API:
	// http://vitaly-t.github.io/pg-promise/QueryFile.html
}

///////////////////////////////////////////////////////////////////
// Possible alternative - enumerating all SQL files automatically:
// http://vitaly-t.github.io/pg-promise/utils.html#.enumSql
