//routes/brand.js
const express = require('express');

const router = express.Router();

const appKeyMiddleware = 
        require('../lib/auth/appKeyMiddleware');

const cassandraClient = require('../config/cassandra')
const Brand = require('../models/brand');

//api/brands/list
const data = [
    {id: 1, name: 'Google', country: 'USA'}
]

//router.use('/brands', appKeyMiddleware)

router.get('/brands/list', function(req, res) {
    //res.json(data);

    cassandraClient.execute('SELECT * FROM workshop247.brands',[], function(err, result){
		if(err){
			console.log('customers: list err:', err);
			res.status(404).send({msg: err});
		} else {
			console.log('customers: list succ:', result.rows);
            //res.render('customers', {page_title:"Customers - Node.js", data: result.rows})
            res.json(result.rows)
		}
    });
    
})


router.get('/brands/all', function(req, res) {
    //res.json(data);

     Brand.getBrands()
          .then ( function (brands) {
            res.json(brands)
          })
          .catch( function(err) {
            res.status(500).json({error: 'could not get data'})
          })
})


router.get('/brands/get/:id', function(req, res) {
    //res.json(data);

     Brand.getBrand(req.params.id)
          .then ( function (brand) {
              if (brand) {
                    return res.json(brand)
              } else {
                  return res.status(404).json({error: 'Brand not found'})
              }
          })
          .catch( function(err) {
            res.status(500).json({error: 'could not get data'})
          })
})


// POST /brands
router.post('/brands', function(req, res){
    
    //res.json(req.body)
    const brand = req.body;

    cassandraClient.execute("INSERT INTO workshop247.brands (id, name, email, phone) VALUES (now(), '" + brand.name +  "', '" + brand.email + "', '" + brand.phone + "')",[], function(err, result){
        console.log('got response')
        if(err){
			console.log('customers: add err:', err);
			res.status(404).send({msg: err});
		} else {
			console.log('customers: add succ:');
            console.log('BODY ', req.body)
            res.json(result.rows.length)
		}
    });
})


// POST /brands/3432423432423423423432
router.put('/brands/:id', function(req, res){
    
    //res.json(req.body)
    const brand = req.body;
    const id = req.params.id;

    console.log('PUT ', brand);
    console.log('id is ', id)

    cassandraClient.execute("UPDATE workshop247.brands set name = '" + brand.name  + "', email = '" + brand.email + "', phone = '" + brand.phone + "' WHERE id = " + id,[], function(err, result){
		if(err){
			console.log('customers: save_edit err:', err);
			res.status(404).send({msg: err});
		} else {
			console.log('customers: save_edit succ:');
			res.json({
                updated: true
            })
		}
    });
     
})

// DELETE /brands/:id

router.delete('/brands/:id', function(req, res){
    const id = req.params.id;

    console.log('id is ', id)

    cassandraClient.execute("DELETE FROM workshop247.brands WHERE id = " + id,[], function(err, result){
		if(err){
			console.log('customers: delete err:', err);
			res.status(404).send({msg: err});
		} else {
			console.log('customers: delete succ:');
			res.json({
                delete: true
            })
		}
	});
 
})


// export router
module.exports = router;