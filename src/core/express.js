/* Dylan/Kash
 *
 * /src/core/express.js - Express Configuration
 *
 * coded by Dylan Schirino
 * started at 21/10/2016
 */

 import express from "express";
 import bodyParser from "body-parser";
 import responseTime from "response-time";
 import mitanEko from "mitan-eko";
 import zouti from "zouti";
 import systemRoutes from "../routes/system";
 import BanksRoutes from "../routes/bank";
 import terminalsRoutes from "../routes/terminals";
 import pagesRoutes from "../routes/pages";

 let oApp,
     fInit;
 const APP_PORT = 8080;

 fInit = function( iAppPort = APP_PORT ) {

      if ( oApp ) {
          return oApp;
      }
     oApp = express();

  // Configure middlewares

     oApp.use( mitanEko( "kach" ) );
     oApp.use( responseTime() );
     oApp.use( bodyParser.json() );
     oApp.use( bodyParser.urlencoded( {
         "extended": true,
     } ) );
     oApp.use( express.static(`${__dirname}/../../static`));
     oApp.set( "views", `${__dirname}/../views` );
     oApp.set( "view engine", "pug" );
  // routes
     oApp.use( systemRoutes );
     oApp.use( BanksRoutes );
     oApp.use( terminalsRoutes );
     oApp.use( pagesRoutes );


  //listening
 oApp.listen( iAppPort, () => {
      zouti.success( `Server is listening on ${ iAppPort }.`, "kach" );
  } );
};
export{
  fInit as init,
  };
