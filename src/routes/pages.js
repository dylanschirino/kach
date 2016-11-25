/* Dylan/Kash
 *
 * /src/routes/pages.js - Pages.js
 *
 * coded by Dylan Schirino
 * started at 25/10/2016
 */
 import { Router } from "express";

 import homePageController from "../controllers/pages/home";

 let oRouter = new Router();

 oRouter.get( "/", homePageController );

 export default oRouter;
