
// Require our core node modules.
var Q = require( "q" );

// Require our core application modules.
var userService = require( "../services/user" );


// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //


// Export the public methods.
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.getUser = getUser;
exports.getUsers = getUsers;
exports.updateUser = updateUser;
exports.playGame = playGame;

// ---
// PUBLIC METHODS.
// ---


// I create a new User.
function createUser( requestCollection ) {

	
	var name = requestCollection.name;
	

	return( userService.createUser( name ) );

}


// I delete the given User.
function deleteUser( requestCollection ) {

	var id = requestCollection.id;

	return( userService.deleteUser( id ) );

}


// I return the given User.
function getUser( requestCollection ) {

	var id = requestCollection.id;

	return( userService.getUser( id ) );

}


// I return all of the Users.
function getUsers( requestCollection ) {

	return( userService.getUsers() );

}


// I update the given User.
function updateUser( requestCollection ) {

	var id = requestCollection.id;
	var name = requestCollection.name;
	return( userService.updateUser( id, name) );
}

function playGame(requestCollection) {
	var id = requestCollection.id;
	var str = requestCollection.str;	
	return( userService.playGame( id, str) );
}