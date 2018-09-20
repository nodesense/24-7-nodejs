// routes/product.js
const rp = require('request-promise');

module.exports = {
    getProducts: function(req, res) {
        rp('http://g3.nodesense.ai:7070/api/products')
        .then (function (jsonString) {
            res.json (JSON.parse(jsonString))
        })
        .catch(function (error) {
            res.status(500)
                .json({error: error})
        })
    },

    getProduct : function(req, res) {
        rp('http://g3.nodesense.ai:7070/api/products/' + req.params.id)
        .then (function (jsonString) {
            res.json (JSON.parse(jsonString))
        })
        .catch(function (error) {
            res.status(500)
                .json({error: error})
        })
    }
}

