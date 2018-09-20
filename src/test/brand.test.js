const request = require('supertest')

const app = require('../app'); //index.js is default

const cassandraClient = require('../app/config/cassandra');

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should()


describe('integration test', function() {

    before(function(done) {
        cassandraClient
            .execute('truncate workshop247.brands')
            .then (function() {
                done()
            })
            .catch(function() {
                done()
            })
    })


    it("info test", function(done) {
        request(app)
            .get('/info?city=BLR&state=KA&APP_KEY=ABCDEF')
            .expect(200)
            .end(done)
    })

    it('post brand data ', function(done) {
        request(app)
        .post('/api/brands')
        .send({name: 'Test Brand', 
               email: 'test@example.com',
               phone: '+919999999999'})
        .set('Content-Type', 'application/json')
        .expect(200)
        .expect(function(res) {
            //res.body.id = 'some fixed id';
            res.body.should.have.property('id')

            const id = res.body.id;

            return cassandraClient
            .execute('select * from  workshop247.brands where id=?', [id])
            .then (function(result){
                expect(result.rows.length).to.eq(2)
                let dbBrand = result.rows[0]
                expect(id).to.eq(dbBrand.id)
                

                expect('Test Brand').to.eq(dbBrand.name)
                assert.deepEqual(dbBrand, {
                    id: id,
                    name: 'Test Brand', 
                    email: 'test@example.com',
                    phone: '+919999999999'
                })

                done()
            } )

          })
        .end(done)
    })
})