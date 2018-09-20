// routes/brand.js
const express = require('express');

const router = express.Router();
 
const cassandraClient = require('../config/cassandra')
 
const Brand = require('../models/brand');

const logger = require('../config/logger');

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

router.get('/brands/:id', function(req, res){
    console.log('user agent ', req.header('user-agent'))
    const id = req.params.id; // use req.params to get url data
    Brand.get(id)
        .then (function(result) {
            if (result) { // if we found data in db
                return res.json(result)
            }

            logger.warn(' Brand ' + id + ' is not found')

            return res.status(404) // if data not available
                      .json({
                          error: true,
                          message: 'brand not found'
                      })
        })
        .catch (function(error) {
            res.status(500).json({error: error})
        })
})

router.delete('/brands/:id', function(req, res) {
    Brand.delete(req.params.id)
        .then (function(result) {
           return res.json(result)
        })
        .catch (function(error) {
            res.status(500).json({error: error})
        })
})
  

// export router
module.exports = router;