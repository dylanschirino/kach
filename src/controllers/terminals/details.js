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

 export default function( oRequest, oResponse ) {

     let sTerminalsID = ( oRequest.params.id || "" ).trim();

     if ( !sTerminalsID ) {
         error( oRequest, oResponse, "Invalid ID!!", 400 );
     }
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

          send( oRequest, oResponse, oCleanTerminal );

      } )
      .catch( ( oError ) => {
          error( oRequest, oResponse, oError );
      } );

 }
