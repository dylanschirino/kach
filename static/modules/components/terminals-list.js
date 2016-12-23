/* Dylan/Kash
 *
 * /static/modules/components/terminals-list.js - Terminals list Vue components
 *
 * Coded by Dylan Schirino
 * started at 23/12/2016
 */

 import Vue from "vue";

 import reqwest from "reqwest";


 const GEO_OPTIONS = { "enableHighAccuracy":true };

 let oTerminalsList = Vue.component( "terminals-list", {
   "data": function() {
     return {
       "loaded":false,
       "terminals": [],
       "error":null,
       "banks": {},
     };
   },
   "template": `
      <div class="template-list">
      <div class="loading" v-if="!loaded">
          <p> Loading ...</p>
      </div>
      <div class="error" v-if="loaded && error">
      <p>
        <strong>Error:</strong>
        {{error.message}}
      </p>
      </div>
      <ul v-if="loaded">
        <li v-for="elt in terminals">
          <router-link :to="'/'+elt.id">
          <strong>{{ banks[ elt.bank ].name }}</strong>
          <address>{{ elt.address }}</address>
          <span class="distance">{{ elt.distance }} m</span>
          </router-link>
        </li>
      </ul>
      </div>
   `,
   mounted() {
     this.getAllBanks( this.updateTerminals );
     // 1. Get user position avec jeolok pour récuperer la position actuelle de l'user

   },
   "methods": {
     getAllBanks( fNext ) {
       reqwest( {
         "url": "/banks",
         "method": "get",
         "data": {
           "country": "BE",
         },
         "success": ( { data } ) => {
            for ( let oBank of data ) {
              this.banks[ oBank.id ] = oBank;
            }
            fNext();
         },
         "error": this.showError,
       } );
     },
     updateTerminals() {
       // 1. Get user position avec jeolok pour récuperer la position actuelle de l'user
       navigator.geolocation.getCurrentPosition( this.geoSucces, this.showError, GEO_OPTIONS );
     },
     geoSucces( { coords } ) {
       console.log( "position:", coords );
       // 2. Get terminals at position
       reqwest( {
         "url": "/terminals",
         "method": "get",
         "data": {
           "latitude": coords.latitude,
           "longitude": coords.longitude,
         },
         "success": this.ajaxSuccess,
         "error": this.showError,
       } );
     },
     ajaxSuccess( oResponse ) {
       console.log( "response:", oResponse );
       this.loaded = true;
       this.terminals = oResponse.data;
     },
     showError( oError ) {
       this.loaded = true;
       this.error = oError;
     },
   },

 } );

 export default oTerminalsList;
