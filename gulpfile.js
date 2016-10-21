/* Dylan/Kash
 *
 * /gulpfile - gulp tasks
 *
 * coded by Dylan Schirino
 * started at 21/10/2016
 */

/* eslint-disable */

"use strict";

var gulp = require( "gulp" ),
    gESLint = require( "gulp-eslint" ),
    gBabel = require( "gulp-babel" ),
    gUtil = require ( "gulp-util" ),
    Mongo = require ( "mongodb" ),
    ObjectID = Mongo.ObjectID,
    MongoClient = Mongo.MongoClient;

gulp.task( "lint", function() {
    return gulp
        .src( "src/**/*.js" )
        .pipe( gESLint() )
        .pipe( gESLint.format() );
} );

gulp.task( "build", function() {
    return gulp
        .src( "src/**/*.js" )
        .pipe( gBabel() )
        .pipe( gulp.dest( "bin" ) )
} );

gulp.task( "reset-db", function( fNext ){

  // 1. Verify that we are INSIDE the vagrant donc si le nom d'utilisateur est différent de vagrant c'est qu'on est hors de la vagrant.

  if ( process.env.USER !== "vagrant" ) {
    gUtil.beep();
    gUtil.log ( gUtil.colors.red( "This task must be runned from INSIDE the vagrant box") );
    return fNext();
  }
  // Connect to mongodb
  MongoClient.connect("mongodb://127.0.0.1:27017/kach", function( oError, oDB ){

    var fDataParser;

    if( oError ){
      gUtil.beep();
      return fNext( oError );
    }

    fDataParser = function( oElt ){
      oElt._id = new ObjectID( oElt._id.$oid );

      if ( oElt.bank && oElt.bank.$oid ) {
        oElt.bank = new ObjectID( oElt.bank.$oid );
      }

      oElt.created_at = new Date( oElt.created_at );
      oElt.updated_at = new Date( oElt.updated_at );
      if ( oElt.deleted_at ) {
        oElt.deleted_at = new Date( oElt.deleted_at );
      }
      return oElt;
    };
    // 2. Drop Databases

    oDB.dropDatabase()
      .then( function(){
        // 3. Parse & Fill Banks
        var aBanks = require( __dirname + "/_dev/banks.json" );
        //Map : ca prend chaque élément dessus, on fait le traitement et ca nous retourne un nouveau tableau avec les valeurs modifié
        return oDB.collection( "banks" ).insertMany( aBanks.map( fDataParser ) );

      } )
      .then( function(){
        // 4. Parse & Fill terminals
        var aTerminals = require( __dirname + "/_dev/terminals.json" );
        return oDB.collection( "terminals" ).insertMany( aTerminals.map( fDataParser ) );

      } )
      .then( function() {
        oDB.close();
        gUtil.log( gUtil.colors.green( "DB has been reset ") );
        fNext();
      } )
      .catch( function( oError ){

        oDB.close();
        fNext( oError );

      } );
  } );

} );

gulp.task( "watch", function() {
    gulp.watch( "src/**/*.js", [ "build" ] );
} );

gulp.task( "default", [ "build" ] );

gulp.task( "work", [ "build", "watch" ] );
