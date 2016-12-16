/* Dylan/Kash
 *
 * /static/modules/main.js - Main Entry files
 *
 * Coded by Dylan Schirino
 * started at 09/12/2016
 */
import Vue from "vue";

let oApp = new Vue( {
    "template": `
    <div class="box">
    <p>{{message}}</p>
    <ul>
      <li v-for="cat in cats">
        <strong>{{cat.name}}</strong>
        <strong> ({{cat.age}})</strong>
      </li>
    </ul>
    <p v-if="secret">I don't like Jimmy!</p>
    <button v-on:click="revealSecret">{{reveal.value}}</button>
    </div>
    `,
    "data": {
        "message": "Hey from Vue",
        "secret":false,
        "cats":[
          {"name":"Skitty", "age":6},
          {"name":"Jimmy", "age":4},
        ],
        "reveal": {
          "show": "Reveal my secret!",
          "hide": "Hide my secret!",
          "value": "Reveal my secret!",
        },
    },
    "methods": {
      "revealSecret": function(){
        this.secret = !this.secret;
        this.reveal.value = this.secret ? this.reveal.hide : this.reveal.show;
      },
    },
} );

oApp.$mount( "#app" );
