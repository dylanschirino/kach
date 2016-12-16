/* Dylan/Kash
 *
 * /static/modules/main.js - Main Entry files
 *
 * Coded by Dylan Schirino
 * started at 09/12/2016
 */
import Vue from "vue";

Vue.component( "cats-list", {
  "props": [ "elements" ],
  "template": `
  <ul>
  <li v-for="elt in elements">
    <strong>{{elt.name}}</strong>
    <strong> ({{elt.age}})</strong>
  </li>
  </ul>
  `
} );

Vue.component( "secret", {
  "props": [ "content" ],
  "data": function() {
    return {
      "reveal": {
        "show": "Reveal my secret!",
        "hide": "Hide my secret!",
        "value": "Reveal my secret!",
      },
      "state":false,
    };
  },
  "template":`
    <div>
    <p v-if="state">{{ content }}</p>
    <button v-on:click="revealSecret">{{reveal.value}}</button>
    </div>
  `,
  "methods":{
    "revealSecret": function(){
      this.secret = !this.secret;
      this.reveal.value = this.secret ? this.reveal.hide : this.reveal.show;
    },
  },
} );

let oApp = new Vue( {
    "template": `
    <div class="box">
    <p>{{message}}</p>
    <cats-list v-bind:elements="cats"></cats-list>
    <secret v-bind:content="secret"></secret>
    </div>
    `,
    "data": {
        "message": "Hey from Vue",
        "secret":"Je n'aime pas jimmy",
        "cats":[
          {"name":"Skitty", "age":6},
          {"name":"Jimmy", "age":4},
        ],
    },
} );

oApp.$mount( "#app" );
