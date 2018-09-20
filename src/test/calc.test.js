const assertion = require('assert');

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should()

function add(a, b) { return a + b; }

describe("math test suite", function() {
    it("add test case", function() {
        assertion.equal(add(10, 20), 
                        30);

        expect(add(10, 20)).to.eq(30);
        expect(add(10, 30)).not.to.equal(20);
        
        const user = {
            name: 'karthick'
        }

        user.should.have.property('name');
    })
})