/* Dylan/Kash
 *
 * /src/routes/system.js - Routes.js
 *
 * coded by Dylan Schirino
 * started at 21/10/2016
 */

 import { Router } from "express";

 import sysPingController from "../controllers/system/ping";
 import sysEchoController from "../controllers/system/echo";
 import sysErrorController from "../controllers/system/error";

 let oRouter = new Router();

 oRouter.get( "/sys/ping", sysPingController );
 oRouter.get( "/sys/echo", sysEchoController );
 oRouter.get( "/sys/error", sysErrorController );

 export default oRouter;
