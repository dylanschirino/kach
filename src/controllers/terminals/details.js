/* Dylan/Kash
 *
 * /src/controllers/terminals/details.js - Terminals details.js
 *
 * Coded by Dylan Schirino
 * started at 28/10/2016
 */

 import getTerminals from "../../models/terminals";
 import { send, error } from "../../core/utils/api";
 import { ObjectID } from "mongodb";
 import distance from "jeyo-distans";

 import checkPosition from "../../core/utils/position";

 export default function( oRequest, oResponse ) {

     let sTerminalsID = ( oRequest.params.id || "" ).trim(),
         iLatitude = +oRequest.query.latitude, // le + c'est pour convertir en chiffre( ParseInt(10) = équivalent )
         iLongitude = +oRequest.query.longitude,
         oCurrentPosition;

     if ( !sTerminalsID ) {
         error( oRequest, oResponse, "Invalid ID!!", 400 );
     }

     oCurrentPosition = checkPosition( iLatitude, iLongitude );

     getTerminals()
      .findOne( {
          "_id": new ObjectID( sTerminalsID ),
          "deleted_at": null,
      } )
      .then( ( oTerminal ) => {

          let oCleanTerminal;

          if ( !oTerminal ) {

              return error( oRequest, oResponse, "Unknow terminal", 404 );

          }

          oCleanTerminal = {

              "id": oTerminal._id,
              "bank": oTerminal.bank,
              "latitude": oTerminal.latitude,
              "longitude": oTerminal.longitude,
              "address": oTerminal.address,
              "empty": !!oTerminal.empty,

          };
          if ( oCurrentPosition ) {

            // TODO: compute distance
              oCleanTerminal.distance = distance( oCurrentPosition, oCleanTerminal ) * 1000;

          }
          send( oRequest, oResponse, oCleanTerminal );

      } )
      .catch( ( oError ) => {
          error( oRequest, oResponse, oError );
      } );

 }
