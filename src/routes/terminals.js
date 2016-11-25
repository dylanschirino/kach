/* Dylan/Kash
 *
 * /src/routes/terminals.js - Terminals.js
 *
 * coded by Dylan Schirino
 * started at 28/10/2016
 */
 import { Router } from "express";

 import list from "../controllers/terminals/list";
 import details from "../controllers/terminals/details";
 import create from "../controllers/terminals/create";
 import update from "../controllers/terminals/update";
 import destroy from "../controllers/terminals/destroy";

 let oRouter = new Router();

 oRouter.get( "/terminals", list );
 oRouter.get( "/terminals/:id", details );
 oRouter.post( "/terminals", create );
 oRouter.patch( "/terminals/:id", update );
 oRouter.delete( "/terminals/:id", destroy );

 export default oRouter;
