/**
 * Module dependencies.
 */
import fs from 'fs';

// On Node.js, support converting a filename to a stream.
export function nodeFilenameToStream( filename ) {
	return fs.createReadStream( filename );
}
