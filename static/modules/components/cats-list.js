
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
