/* Dylan/Kash
 *
 * /src/controller/system/ping.js - Ping.js
 *
 * coded by Dylan Schirino
 * started at 21/10/2016
 */

import { send } from "../../core/utils/api";

export default function ( oRequest, oResponse ) {

send( oRequest, oResponse, true);
}
