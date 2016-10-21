/* Dylan/Kash
 *
 * /src/routes/banks.js - Banks.js
 *
 * coded by Dylan Schirino
 * started at 21/10/2016
 */

import { Router } from "express";

import listBanksControllers from "../controllers/banks/list";

let oRouter = new Router();

oRouter.get( "/banks/:country" );

export default oRouter;
