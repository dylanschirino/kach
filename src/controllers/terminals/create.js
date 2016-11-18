/* Dylan/Kash
 *
 * /src/controllers/terminals/create.js - Terminals Create.js
 *
 * Coded by Dylan Schirino
 * started at 18/11/2016
 */

 import Promise from "bluebird";

 import { ObjectID } from "mongodb";

 import getTerminals from "../../models/terminals.js";

 import getBanks from "../../models/banks.js";

 import { send, error } from "../../core/utils/api";

 import checkPosition from "../../core/utils/position";

 export default function( oRequest, oResponse ) {

     const POST = oRequest.body;

     let iLatitude = +POST.latitude,
         iLongitude = +POST.longitude,
         sBankID = ( POST.bank || "" ).trim(),
         sAddress = ( POST.address || "" ).trim(),
         oPosition = checkPosition( iLatitude, iLongitude ),
         oTerminal,
         fCheckBank,
         fCreateTerminal;

     if ( !oPosition ) {
         return error( oRequest, oResponse, "Invalid position", 400 );
     }

     oTerminal = {
         "latitude": oPosition.latitude,
         "longitude": oPosition.longitude,
         "created_at": new Date(),
         "updated_at": new Date(),

     };
     // Si on a une adresse on lui ajoute mais si on en a pas c'est optionnel
     sAddress && ( oTerminal.address = sAddress );

     fCheckBank = () => {
         let oBankID;

       // Si on a pas de bankid on considère qu'on peut passer a la suite
         if ( !sBankID ) {
             return Promise.resolve( false );
         }

         try {
             oBankID = new ObjectID( sBankID );

         } catch ( oError ) {

             return Promise.reject( new Error( "Invalid bankID!" ) );
         }

         return getBanks()
            .findOne( {
                "_id": oBankID,
            } )
            .then( ( oBank ) => {
                if ( oBank ) {

                    return Promise.resolve( true );
                }

                return Promise.reject( new Error( "Unknow Bank" ) );
            } );
     };

     fCreateTerminal = ( bHasBank ) => {
         if ( bHasBank ) {
             oTerminal.bank = new ObjectID( sBankID );
         }

         return getTerminals().insertOne( oTerminal );
     };

     fCheckBank()
        .then( fCreateTerminal )
        .then( () => {
          //  all is ok
            send( oRequest, oResponse, oTerminal, 201 );
        } )
        .catch( ( oError ) => {
            error( oRequest, oResponse, oError );
        } );
 }
