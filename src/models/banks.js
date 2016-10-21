import { db } from "../core/mongodb";

let oBanks = db.collection( "banks" );

export default oBanks;
