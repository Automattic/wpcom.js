/**
 * Module dependencies.
 */
import fs from 'fs';

export function createReadStream( filename ) {
	return fs.createReadStream( filename );
}
