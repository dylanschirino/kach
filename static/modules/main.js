/* Dylan/Kash
 *
 * /static/modules/main.js - Main Entry files
 *
 * Coded by Dylan Schirino
 * started at 09/12/2016
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use( VueRouter );

import TerminalsList from "./components/terminals-list";

import TerminalDetails from "./components/terminal-details";


let oRouter = new VueRouter( {
    "routes": [
    { "path": "/", "component": TerminalsList },
    { "path": "/:id", "component": TerminalDetails },
    ],
} );

let oApp = new Vue( {
  "template": `
      <div class="wrapper">
      <header>
      <h1>Kach</h1>
      <router-view></router-view>
      <footer>
      <a href="https://github.com/dylanschirino/kach">Github Kach</a>
      </footer>
      </div>
      `,
      "router": oRouter,
} );

oApp.$mount( "#app" );
