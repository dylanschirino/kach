/* Dylan/Kash
 *
 * /src/controllers/banks/list.js - Banks List.js
 *
 * coded by Dylan Schirino
 * started at 21/10/2016
 */
import getBanks from "../../models/banks";
import { send, error } from "../../core/utils/api";
export default function( oRequest, oResponse ) {

    let sCountryCode = ( oRequest.params.country || "" ).toUpperCase();
    getBanks();
    Banks.find( {
      "country": sCountryCode,
    } ).toArray()
    .then( ( aBanks ) => {
      send( oRequest, oResponse, aBanks )
    } )
    .catch( ( oError ) => {
      error( oRequest, oResponse, oError );
    } );

}
