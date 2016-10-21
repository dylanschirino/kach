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
    gBabel = require( "gulp-babel" );

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

gulp.task( "watch", function() {
    gulp.watch( "src/**/*.js", [ "build" ] );
} );

gulp.task( "default", [ "build" ] );

gulp.task( "work", [ "build", "watch" ] );
