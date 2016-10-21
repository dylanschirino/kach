/* Dylan/Kash
 *
 * /src/core/utils/api.js -  Api Utils
 *
 * coded by Dylan Schirino
 * started at 21/10/2016
 */

let fSend, fError;

fSend = function( oRequest, oResponse, oData = {}, iStatus = 200) {
  oResponse.status( iStatus ).json( {
    "url": `[ ${ oRequest.method }] ${ oRequest.url }`,
    "timestamp":Date.now(),
    "data": oData,
    "error":null,
  } );
};

fError = function( oRequest, oResponse, oData = {}, iStatus = 500 ) {
  oResponse.status( iStatus ).json( {
  "url": `[ ${ oRequest.method }] ${ oRequest.url }`,
  "timestamp":Date.now(),
  "data": null,
  "error":oError,
} );
};

export {
  fSend as send,
  fError as error,
}
