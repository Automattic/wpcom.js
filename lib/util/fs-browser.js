// In browser environments, this function is a no-op.
export function createReadStream() {
	throw new Error( 'Cannot call fs functions within the browser' );
}
