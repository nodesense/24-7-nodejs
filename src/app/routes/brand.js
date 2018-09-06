// routes/brand.js
const express = require('express');

const router = express.Router();
 
const cassandraClient = require('../config/cassandra')
 
const Brand = require('../models/brand');

//api/brands/list
 
//router.use('/brands', appKeyMiddleware)

router.get('/brands/all', function(req, res){
    Brand.getAll()
         .then (function(brands) {
            res.json(brands);
         })
         .catch(function(err) {
            res.status(500)
                .json({
                    error: true,
                    message: err.message
                })
         })
}) 

router.get('/brands/list', function(req, res) {
     
    cassandraClient
    .execute('SELECT * from workshop247.brands', 
            [], // parameter

            function (err, result) {
                if (err) {
                    console.log(err);
                    return res.status(500)
                            .json({
                                error: 'db error' + err.message
                            })
                }

                // else we have results
                return res.json(result.rows);
            }
        )
})



// POST /brands
router.post('/brands', function(req, res){
    
    //res.json(req.body)
    const brand = req.body;

    Brand.save(brand)
         .then (function(result) {
            res.json(result)
         })
         .catch (function(err) {
             console.log(err)
            res.status(500)
            .json({
                error: true,
                message: err.message
            })
         })

})
  

// export router
module.exports = router;