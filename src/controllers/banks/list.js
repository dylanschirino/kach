/* Dylan/Kash
 *
 * /src/controllers/banks/list.js - Banks List.js
 *
 * Coded by Dylan Schirino
 * started at 21/10/2016
 */

import getBanks from "../../models/banks";
import { send, error } from "../../core/utils/api";

export default function( oRequest, oResponse ) {

    let sCountryCode = ( oRequest.query.country || "" ).toUpperCase();

    if ( !sCountryCode ) {
        error( oRequest, oResponse, "Country query params not found!", 400 );

    }
    getBanks()
      .find( {
          "country": sCountryCode,
      } )
    .toArray()
    .then( ( aBanks ) => {
        let aParsedBanks;

        aParsedBanks = aBanks.filter( ( { deleted_at } ) => !deleted_at );
        aParsedBanks = aParsedBanks.map( ( oBank ) => {
            return {
                "id": oBank._id,
	              "country": oBank.country,
			          "color": oBank.color,
			          "name": oBank.name,
			          "icon": oBank.icon,
			          "url": oBank.url,
          };
        } );

        send( oRequest, oResponse, aParsedBanks );

    } )
    .catch( ( oError ) => {
        error( oRequest, oResponse, oError );
    } );

}
