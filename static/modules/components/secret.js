import Vue from "vue";

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
