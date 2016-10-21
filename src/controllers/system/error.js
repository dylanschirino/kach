/* Dylan/Kash
 *
 * /src/controller/system/Error.js -  Error.js
 *
 * coded by Dylan Schirino
 * started at 21/10/2016
 */
import { send } from "../../core/utils/api";
export default function ( oRequest, oResponse ) {
error( oRequest, oResponse, { "message": "Theres an error" } );
}
