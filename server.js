
// Require the core node modules.
var _ = require( "lodash" );
var http = require( "http" );
var url = require( "url" );
var querystring = require( "querystring" );
var Q = require( "q" );
var util = require( "util" );


var appError = require( "./lib/app-error" ).createAppError;
var controllers = {
	user : require( "./lib/controllers/user" )
}

var user = require( "./lib/services/user" );

var mongoGateway = require( "./lib/mongo-gateway" );
var requestBodyStream = require( "./lib/request-body-stream" );

var httpServer = http.createServer(
	function handleRequest( request, response ) {

		response.setHeader( "Access-Control-Allow-Origin", "*" );
		response.setHeader( "Access-Control-Allow-Methods", "OPTIONS, GET, POST, DELETE" );
		response.setHeader( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
		if ( request.method === "OPTIONS" ) {
			return( 
				response.writeHead( 200, "OK" ),
				response.end()
			);
			
		}

		var bodyWriteStream = requestBodyStream.createWriteStream()
			.on(
				"body",
				function haneleBodyEvent( body ) {

					var parsedUrl = url.parse( request.url );

					var search = querystring.parse( ( parsedUrl.search || "" ).slice( 1 ) );

					processRequest( _.assign( {}, search, body ) );

				}
			)
			.on( "error", processError )
		;
		
		request.pipe( bodyWriteStream );

		// (via the Controllers).
		function processRequest( requestCollection ) {

			var route = ( request.method + ":" + ( requestCollection.action || "" ) );

			console.log( "Processing route:", route );

			var statusCode = 200;
			var statusText = "OK";
			console.log("------");
			console.log(requestCollection);
			console.log("------");
			
			try {

				if(route === "GET:user/list") { //http://localhost:8080/?action=user/list
					var apiResponse = controllers.user.getUsers( requestCollection );
				}
				else if (route === "GET:user/get") { //http://localhost:8080/?action=user/get&id=5647a369817e86b411e01592
					var apiResponse = controllers.user.getUser( requestCollection );					
				}
				else if (route === "POST:user/add") { 
					var apiResponse = controllers.user.createUser( requestCollection )
						.tap(
							function handleControllerResolve() {
								statusCode = 201;
								statusText = "Created";								
							}
						)
					;				
				}
				else if ( route === "POST:user/update" ) {
					var apiResponse = controllers.user.updateUser( requestCollection );
				}
				else if ( route === "GET:user/play" ) {
					var apiResponse = controllers.user.playGame( requestCollection );
				}
				else if ( route === "DELETE:user/delete" ) {
					var apiResponse = controllers.user.deleteUser( requestCollection )
						.tap(
							function handleControllerResolve() {

								statusCode = 204;
								statusText = "No Content";

							}
						)
					;
				}
				
				else {

					throw(
						appError({
							type: "App.NotFound",
							message: "The requested route is not supported.",
							detail: util.format( "The route action [%s] is not supported.", route ),
							errorCode: "server.route.missing"
						})
					);
					
				}

				// Render the controller response. 
				// --
				// NOTE: If the API response is rejected, it will be routed to the error
				// processor as the fall-through reject-binding.
				apiResponse
					.then(
						function handleApiResolve( result ) {
							var serializedResponse = JSON.stringify( result );
							response.writeHead(
								statusCode,
								statusText,
								{
									"Content-Type": "application/json",
									"Content-Length": serializedResponse.length
								}
							);
							response.end( serializedResponse );
						}
					)
					.catch( processError )
				;

			// Catch any top-level controller and routing errors.
			} catch ( controllerError ) {
				processError( controllerError );
			}

		}
		
		function processError( error ) {

			console.error( error );
			console.log( error.stack );
			response.setHeader( "Content-Type", "application/json" );

			switch ( error.type ) {
				case "App.InvalidArgument":
					response.writeHead( 400, "Bad Request" );					
				break;
				case "App.NotFound":
					response.writeHead( 404, "Not Found" );
				break;
				default:
					response.writeHead( 500, "Server Error" );
				break;
			}
			response.end( 
				JSON.stringify({
					type: ( error.type || "" ),
					code: ( error.errorCode || "" )
				})
			);

		}

	}
);

mongoGateway.connect( "mongodb://127.0.0.1:27017/ERM" )
	.then(
		function handleConnectResolve( mongo ) {
			httpServer.listen( 8080 );
			console.log( "MongoDB connected, server now listening on port 8080." );

		},
		function handleConnectReject( error ) {
			console.log( "Connection to MongoDB failed." );
			console.log( error );

		}
	)
;
