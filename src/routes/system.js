/* Dylan/Kash
 *
 * /src/routes/system.js - Routes.js
 *
 * coded by Dylan Schirino
 * started at 21/10/2016
 */

 import { Router } from "express";

 import sysPingController from "../controllers/system/ping";

 let oRouter = new Router();

 oRouter.get( "/sys/ping", sysPingController );
 //oRouter.get( "/sys/echo" );
 //oRouter.get( "/sys/error" );

 export default oRouter;
