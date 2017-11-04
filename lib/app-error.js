
// Require our core node modules.
var util = require( "util" );

// Export the constructor function.
exports.AppError = AppError;

exports.createAppError = createAppError;

function createAppError( settings ) {
	return( new AppError( settings, createAppError ) );
}

function AppError( settings, implementationContext ) {

	settings = ( settings || {} );

	this.name = "AppError";

	this.type = ( settings.type || "Application" );
	this.message = ( settings.message || "An error occurred." );
	this.detail = ( settings.detail || "" );
	this.extendedInfo = ( settings.extendedInfo || "" );
	this.errorCode = ( settings.errorCode || "" );
	
	this.isAppError = true;

	// Rad More: https://code.google.com/p/v8-wiki/wiki/JavaScriptStackTraceApi#Stack_trace_collection_for_custom_exceptions
	Error.captureStackTrace( this, ( implementationContext || AppError ) );

}

util.inherits( AppError, Error );