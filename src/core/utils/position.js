/* Dylan/Kash
 *
 * /src/core/utils/position.js - position.js
 *
 * Coded by Dylan Schirino
 * started at 28/10/2016
 */

 export default function( iLatitude, iLongitude ) {

    let oPosition;

     if ( isNaN( iLatitude ) || isNaN( iLongitude ) ) {
         return false;
     }

     if ( iLatitude < -90 || iLatitude > 90 ) {
         return false;
     }

     if ( iLongitude < -180 || iLongitude > 180 ) {
         return false;
     }

     return {
         "latitude": iLatitude,
         "longitude": iLongitude,
     };

 }
