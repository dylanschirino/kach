/* Dylan/Kash
 *
 * /src/controller/system/ping.js - Ping.js
 *
 * coded by Dylan Schirino
 * started at 21/10/2016
 */

export default function ( oRequest, oResponse ) {
  oResponse.json( {
    "url": oRequest.url,
    "timestamp": Date.now(),
    "data": true,
    "error":false
  } );
}
