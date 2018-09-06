const cassandraClient = require('../config/cassandra')

const Brand = {
    getBrands: function() {
        return new Promise( function(resolve, reject) {
            cassandraClient.execute('SELECT * FROM workshop247.brands',[], function(err, result){
                if(err){
                    console.log('brands: list err:', err);
                    reject(err);
                } else {
                    console.log('brands: list succ:', result.rows);
                    resolve(result.rows)
                }
            });
        })
    },

    getBrand: function(id) {
        return new Promise( function(resolve, reject) {
            cassandraClient.execute('SELECT * FROM workshop247.brands where id=?',[id], function(err, result){
                if(err){
                    console.log('brands: list err:', err);
                    reject(err);
                } else {
                    console.log('brands: list succ:', result.rows);
                    if ( result.rows.length > 0 ) {
                        resolve(result.rows[0])
                    } else {
                        resolve (null);
                    }
                    //resolve(result.rows)
                }
            });
        })
    }
}

module.exports = Brand;