import { db } from "../core/mongodb";

let oTerminals = db.collection( "terminals" );

export default oTerminals;
