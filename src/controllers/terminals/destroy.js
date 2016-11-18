/* Dylan/Kash
 *
 * /src/controllers/terminals/Destroy.js - Terminals Destroy.js
 *
 * Coded by Dylan Schirino
 * started at 18/11/2016
 */
import { send, error } from "../../core/utils/api";

import { ObjectID } from "mongodb";

import getTerminals from "../../models/terminals";

export default function( oRequest, oResponse ) {

    let oTerminalID;

    try {
        oTerminalID = new ObjectID( oRequest.params.id );
    } catch ( oError ) {
        return error( oRequest, oResponse, new Error( "Invalid ID!" ), 400 );
    }

    getTerminals()
        .deleteOne( {
            "_id": oTerminalID,
        } )
        .then( ( { deletedCount } ) => {
            if ( deletedCount === 1 ) {
                return send( oRequest, oResponse, "", 204 );
            }

            return error( oRequest, oResponse,"Unknow deletion error", 500 );
        } )
        .catch( ( oError ) => {
            error( oRequest, oResponse, oError );
        } );
    // 1.Verify id

    // Delete
}
