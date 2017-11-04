
// Require our core node modules.
var ObjectID = require( "mongodb" ).ObjectID;
var Q = require( "q" );
var util = require( "util" );

// Require our core application modules.
var appError = require( "../app-error" ).createAppError;
var mongoGateway = require( "../mongo-gateway" );
var bowling= require("../bowlingGame").BowlingGame;

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


// I create a new User with the given properties. Returns a promise that will resolve
// to the newly inserted User ID.
function createUser( name ) {

	// Test inputs (will throw error if any of them invalid).
	testUserName( name );

	var promise = getDatabase()
		.then(
			function handleDatabaseResolve( mongo ) {

				var deferred = Q.defer();

				mongo.collection( "user" ).insertOne(
					{
						name: name,
					},
					deferred.makeNodeResolver()
				);

				return( deferred.promise );

			}
		)		
		.get( "insertedId" )
	;

	return( promise );

};


// I delete the User with the given ID. Returns a promise.
// --
// CAUTION: If the given User does not exist, promise will be rejected.
function deleteUser( id ) {

	// Test inputs (will throw error if any of them invalid).
	testId( id );

	var promise = getDatabase()
		.then(
			function handleDatabaseResolve( db ) {

				var deferred = Q.defer();

				db.collection( "user" ).deleteOne(
					{
						_id: ObjectID( id )
					},
					deferred.makeNodeResolver()
				);

				return( deferred.promise );

			}
		)	
		.then(
			function handleResultResolve( result ) {

				// If the document was successfully deleted, just echo the ID.
				if ( result.deletedCount ) {
					return( id );
				}
				throw(
					appError({
						type: "App.NotFound", 
						message: "User could not be deleted.",
						detail: util.format( "The User with id [%s] could not be deleted.", id ),
						extendedInfo: util.inspect( result.result )
					})
				);

			}
		)
	;

	return( promise );

};


// I get the User with the given id. Returns a promise.
function getUser( id ) {

	// Test inputs (will throw error if any of them invalid).
	testId( id );

	var promise = getDatabase()
		.then(
			function handleDatabaseResolve( mongo ) {

				var deferred = Q.defer();

				mongo.collection( "user" ).findOne(
					{
						_id: ObjectID( id )
					},
					deferred.makeNodeResolver()
				);

				return( deferred.promise );

			}
		)		
		.then(
			function handleResultResolve( result ) {

				if ( result ) {
					return( result );
				}

				throw( 
					appError({
						type: "App.NotFound", 
						message: "User could not be found.",
						detail: util.format( "The User with id [%s] could not be found.", id )
					})
				);

			}
		)
	;

	return( promise );

};


// I get all the Users. Returns a promise.
function getUsers() {

	var promise = getDatabase().then(
		function handleDatabaseResolve( mongo ) {

			var deferred = Q.defer();

			mongo.collection( "user" )
				.find({})
				.toArray( deferred.makeNodeResolver() )
			;

			return( deferred.promise );

		}
	);

	return( promise );

};


// I update the given User, assigning the given properties.
// --
// CAUTION: If the given User does not exist, promise will be rejected.
function updateUser( id, name) {

	// Test inputs (will throw error if any of them invalid).
	testId( id );
	testUserName( name );

	var promise = getDatabase()
		.then(
			function handleDatabaseResolve( mongo ) {

				var deferred = Q.defer();

				mongo.collection( "user" ).updateOne(
					{
						_id: ObjectID( id )
					},
					{
						$set: {
							name: name,
						}
					},
					deferred.makeNodeResolver()
				);

				return( deferred.promise );

			}
		)	
		.then(
			function handleResultResolve( result ) {
			
				if ( result.result.n ) {
					return( id );
				}

				throw(
					appError({
						type: "App.NotFound", 
						message: "User could not be updated.",
						detail: util.format( "The User with id [%s] could not be updated.", id ),
						extendedInfo: util.inspect( result.result )
					})
				);

			}
		)
	;

	return( promise );

};

function playGame(id, str) {

	var promise = getDatabase()
		.then(
			function handleDatabaseResolve( mongo ) {

				var deferred = Q.defer();

				mongo.collection( "user" ).findOne(
					{
						_id: ObjectID( id )
					},
					deferred.makeNodeResolver()
				);

				return( deferred.promise );

			}
		)		
		.then(
			function handleResultResolve( result ) {

				if ( result ) {
					var score = bowling(str);
					return( {score: score, "player -"  : result.name,} );
				}

				throw( 
					appError({
						type: "App.NotFound", 
						message: "User could not be found.",
						detail: util.format( "The User with id [%s] could not be found.", id )
					})
				);

			}
		)
	;

	return( promise );
}
function play(str) {
	console.log("userID--",id);
	console.log("str--",str);
	var user = getUser(id);
	var score = bowling(str);
	return {name : user.name, score: score};	
	
};

// ---
// PRIVATE METHODS.
// ---


// I get a MongoDB connection from the resource pool. Returns a promise.
function getDatabase() {
	return( mongoGateway.getResource() );
}


// I test the given ID for validity.
function testId( newId ) {

	if ( ! ObjectID.isValid( newId ) ) {

		throw(
			appError({
				type: "App.InvalidArgument",
				message: "Id is not valid.",
				detail: util.format( "The id [%s] is not a valid BSON ObjectID.", newId ),
				errorCode: "User.id"
			})
		);

	}

}


// I test the given name for validity.
function testUserName( firstname ) {

	if ( ! firstname ) {

		throw(
			appError({
				type: "App.InvalidArgument",
				message: "First name must be a non-zero length.",
				errorCode: "User.name.short"
			})
		);

	}
}