/* Dylan/Kash
 *
 * /static/modules/components/terminals-details.js - Terminals details Vue components
 *
 * Coded by Dylan Schirino
 * started at 23/12/2016
 */
 import Vue from "vue";
 import reqwest from "reqwest";

 let TerminalDetails = Vue.component( "terminals-list", {
   "data": function() {
     return {
       "loaded":false,
       "terminal": {},
       "error":null,
     };
   },
   "template": `
   <div class="terminals-details">
   <div class="loading" v-if="!loaded">
       <p> Loading ...</p>
   </div>
   <div class="error" v-if="loaded && error">
   <p>
     <strong>Error:</strong>
     {{error.message}}
   </p>
   </div>
   <div class="result" v-if="loaded">
   <h2> Details du terminal : {{ $route.params.id }}</h2>
   <p>Ici on devrait afficher le nom de la banque</p>
   <address>{{terminal.address}}</address>
   </div>
   <router-link to="/">Retour</router-link>
   </div>
   `,
   mounted() {
     console.log( "Details d'un terminal:", this.$route.params.id );
     reqwest( {
       "url": `/terminals/${ this.$route.params.id}`,
       "method": "get",
       "data": {},
       "error":( oError ) => {
         this.loaded = true;
         this.error = oError.message;
       },
       "success":( oResponse ) =>{
         this.loaded = true;
         this.terminal = oResponse.data;
       }
     } );
   }
 } );

export default TerminalDetails;
