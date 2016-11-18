import { db } from "../core/mongodb";
import { ObjectID } from "mongodb";
import Promise from "bluebird";

let fCheckBank;

fCheckBank = function( sBankID ) {
    let oBankID;

  // Si on a pas de bankid on considère qu'on peut passer a la suite
    if ( !sBankID ) {
        return Promise.resolve( false );
    }

    try {
        oBankID = new ObjectID( sBankID );

    } catch ( oError ) {

        return Promise.reject( new Error( "Invalid bankID!" ) );
    }

    return db.collection( "banks" )
       .findOne( {
           "_id": oBankID,
       } )
       .then( ( oBank ) => {
           if ( oBank ) {

               return Promise.resolve( true );
           }

           return Promise.reject( new Error( "Unknow Bank" ) );
       } );
};

export default function() {
    return db.collection( "banks" );
}

export {
  fCheckBank as checkBank,
};
