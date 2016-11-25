/* Dylan/Kash
 *
 * /src/controllers/terminals/update.js - Terminals Update.js
 *
 * Coded by Dylan Schirino
 * started at 25/11/2016
 */
 import { ObjectID } from "mongodb";

 import getTerminals from "../../models/terminals.js";

 import { checkBank } from "../../models/banks.js";

 import { send, error } from "../../core/utils/api";

 import distance from "jeyo-distans";

 import checkPosition from "../../core/utils/position";

 const MAX_MOVE_DISTANCE = 0.1; // 1km

 export default function( oRequest, oResponse ) {
     // 1. Get values
     const POST = oRequest.body;

     let oTerminalID,
         sAddress = ( POST.address || "" ).trim(),
         bEmpty = !!POST.empty,
         iLatitude = POST.latitude,
         iLongitude = POST.longitude,
         sBankID = ( POST.bank || "" ).trim(),
         oPosition,
         aModification = [];

     try {
         oTerminalID = new ObjectID( oRequest.params.id );
     } catch ( oError ) {
         return error( oRequest, oResponse, new Error( "Invalid ID!" ), 400 );
     }
     // 2. Check if terminals exist
     getTerminals()
        .findOne( {
            "_id": oTerminalID,
        } )
          .then( ( oTerminal ) => {
              if ( !oTerminal ) {
                  return error( oRequest, oResponse, new Error( "Unknow terminal" ), 400 );
              }
              // 3. Check values
              if ( iLatitude != null && iLongitude != null ) {
                  oPosition = checkPosition( +iLatitude, +iLongitude );
                  if ( !oPosition ) {
                      return error( oRequest, oResponse, new Error( "Invalid position" ), 400 );
                  }
                  // 3b. if position not = old positionn check move distance
                  if ( oTerminal.latitude !== oPosition.latitude || oTerminal.longitude !== oPosition.longitude ) {
                      if ( distance( oPosition, oTerminal ) > MAX_MOVE_DISTANCE ) {
                          return error( oRequest, oResponse, new Error( "Movement is too big" ), 400 );
                      }
                      oTerminal.latitude = oPosition.latitude;
                      oTerminal.longitude = oPosition.longitude;
                      aModification.push( "latitude", "longitude" );
                  }
              }
              // 3b. Check address
              if ( sAddress ) {
                  oTerminal.address = sAddress;
                  aModification.push( "address" );
              }
              // Check empty
              if ( bEmpty ) {
                  oTerminal.empty = true;
                  aModification.push( "empty" );
              }
              // 3c. if bank changes, check bank

              return checkBank( sBankID ).then( ( bHasBank ) => {

                  let oModificationToApply = {};

                  if ( bHasBank ) {
                      oTerminal.bank = new ObjectID( sBankID );
                      aModification.push( "bank" );
                  }
                  if ( aModification.length === 0 ) {
                      return error( oRequest, oResponse, new Error( "No changes" ), 400 );

                  }
                  aModification.forEach( ( sPropertyName ) => {
                      oModificationToApply[ sPropertyName ] = oTerminal[ sPropertyName ];
                  } );

                  oModificationToApply.updated_at = new Date();

                  return getTerminals()
                  .updateOne( {
                      "_id": oTerminal._id,
                  },
                      {
                          "$set": oModificationToApply,
                      } )
                  .then( ( { matchedCount, modifiedCount } ) => {
                      if ( matchedCount !== 1 || modifiedCount !== 1 ) {
                          return error( oRequest, oResponse, new Error( "Unknown save error" ), 500 );
                      }

                      return send( oRequest, oResponse, null, 204 );
                  } );
              } );
          } )
          .catch( ( oError ) => {
              error( oRequest, oResponse, oError );
          } );
     // 4. Apply modifications
 }
