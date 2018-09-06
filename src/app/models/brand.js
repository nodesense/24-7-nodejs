// models/brand.js

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

    },

    // save/insert record
    save: function(brand) {
        return cassandraClient.execute("INSERT INTO workshop247.brands (id, name, email, phone) VALUES (now(), ?, ?, ?)",
                               [brand.name,brand.email,  brand.phone])
     
    },

    // use update
    update: function(brand) {

    },

    // delete a brand
    delete: function(id) {

    }
}

module.exports = Brand;