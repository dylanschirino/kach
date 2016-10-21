/* Dylan/Kash
 *
 * /src/controller/system/Echo.js -  Echo.js
 *
 * coded by Dylan Schirino
 * started at 21/10/2016
 */
import { send } from "../../core/utils/api";
export default function ( oRequest, oResponse ) {
send( oRequest, oResponse, true );
}
