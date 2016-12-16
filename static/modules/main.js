/* Dylan/Kash
 *
 * /static/modules/main.js - Main Entry files
 *
 * Coded by Dylan Schirino
 * started at 09/12/2016
 */
import Vue from "vue";

import "./components/cats-list";

import "./components/secret";

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
        "secret": "Je n'aime pas jimmy",
        "cats":[
          {"name":"Skitty", "age":6},
          {"name":"Jimmy", "age":4},
        ],
    },
} );

oApp.$mount( "#app" );
