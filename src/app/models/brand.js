// models/brand.js
const uuidv1 = require('uuid/v1');
const cassandraClient = require('../config/cassandra');

const Brand = {
    getAll: function() {
        return new Promise(function(resolve, reject){

            cassandraClient
            .execute('SELECT * from workshop247.brands', 
                    [], // parameter
        
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            return reject(err); // .catch
                        }
        
                        // else we have results
                        return resolve(result.rows); // .then 
                    }
                )

        })
    },

    // return one product matching id
    get: function(id) {
        return  cassandraClient
                .execute('SELECT * from workshop247.brands WHERE id=?',
                         [id])

                .then (function(result) {
                    // if then method returns a value
                    // then returns a promise automatically
                    if (result.rows.length > 0) {
                        return result.rows[0];
                    }

                    // if record not found
                    //resolve promise with null
                    return null;
                })
                
    },

    // save/insert record
    save: function(brand) {
        const uid = uuidv1()
        return cassandraClient.execute("INSERT INTO workshop247.brands (id, name, email, phone) VALUES (?, ?, ?, ?)",
                               [uid, brand.name,brand.email,  brand.phone])
                               .then (function(result){
                                   return {id: uid}
                               })
     
    },

    // use update
    update: function(brand) {

    },

    // delete a brand
    delete: function(id) {
        return    cassandraClient
        .execute('DELETE from workshop247.brands WHERE id=?',
                 [id])

    }
}

module.exports = Brand;