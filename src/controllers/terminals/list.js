/* Dylan/Kash
 *
 * /src/controllers/terminals/lists.js - Terminals lists.js
 *
 * Coded by Dylan Schirino
 * started at 28/10/2016
 */

 import getTerminals from "../../models/terminals";
 import { send, error } from "../../core/utils/api";
 import distance from "jeyo-distans";
 import checkPosition from "../../core/utils/position";

 const ARC_KILOMETER = 0.009259, // 1 décimal de lat/long vaut X km
     DEFAULT_RADIUS = 1,
     MAX_RADIUS = 10;

 export default function( oRequest, oResponse ) {

     let oCurrentPosition = checkPosition( +oRequest.query.latitude, +oRequest.query.longitude ),
         iSearchRadius = +oRequest.query.radius;

     if ( !oCurrentPosition ) {
         return error( oRequest, oResponse, "Invalid position!", 400 );
     }
     if ( isNaN( iSearchRadius ) ) {
         iSearchRadius = DEFAULT_RADIUS;
     }
     if ( iSearchRadius < DEFAULT_RADIUS ) {
         iSearchRadius = DEFAULT_RADIUS;
     }
     if ( iSearchRadius > MAX_RADIUS ) {
         iSearchRadius = MAX_RADIUS;
     }

     iSearchRadius *= ARC_KILOMETER; // convert radius from kilometer to arc
     getTerminals()
     .find( {
         "latitude": {
             "$gt": oCurrentPosition.latitude - iSearchRadius, // $gt = greaterThan $lt = LesserThan
             "$lt": oCurrentPosition.latitude + iSearchRadius,
         },
         "longitude": {
             "$gt": oCurrentPosition.longitude - iSearchRadius,
             "$lt": oCurrentPosition.longitude + iSearchRadius,
         },
         "deleted_at": null,
     } )
     .toArray()
     .then( ( aTerminals = [] ) => {
         let aCleanTerminals,
             aTerminalToReset = [];

       // 1. Compute distances
       // 3. Clean useless properties
         aCleanTerminals = aTerminals.map( ( { _id, bank, latitude, longitude, address, empty, updated_at } ) => {
             let bEmptyState = empty;
             
             if ( Date.now() - ( new Date( updated_at ) ).getTime() > 24 * 3600 * 1000 && empty ) {
                 bEmptyState = false;
                 aTerminalToReset.push( _id );
             }

             return {
                 "id": _id,
                 "empty": !!empty,
                 "distance": distance( oCurrentPosition, { latitude, longitude } ) * 1000,
                 bank, latitude, longitude, address,
             };
         } );
       // 2. Sort by distances
         aCleanTerminals.sort( ( oTerminalOne, oTerminalTwo ) => oTerminalOne.distance - oTerminalTwo.distance );

         send( oRequest, oResponse, aCleanTerminals );
     } )
     .catch( ( oError ) => {
         error( oRequest, oResponse, oError );
     } );
 }
