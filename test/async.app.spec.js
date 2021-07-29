const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should();
const axios = require('axios');
const _ = require('lodash');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const { readCow } = require('../src/async.app');

describe('#async.app', () => {
    describe('#readCow', () => {
        it('should work', (done) => {
            readCow((err, data) => {
                data.should.equal('hello');
                done();
            })
        });
        it('should not have an error', (done) => {
            readCow((err, data) => {
                expect(err).to.not.exist;
                done();
            })
        })


    })
});

describe('#Promises', () => {
    let maybe;
    beforeEach(() => {
        maybe = () => Promise.resolve('yo')
    });
    it('should be an object',  () => {
        const result = maybe();
        _.isObject(result).should.be.true;
    });
    it('should work',  (done) => {
        const result = maybe();
        result
            .then(data => done())
            .catch(done)
    });
    it('should work',  () => maybe());//short form
    it('should work and return data',  (done) => {
        const result = maybe();
        result
            .then(data => {
                data.should.equal('yo');
                done();
            })
            .catch(done)
    });
    it('should work and return data',  () => { //short form
       return  maybe()
      .then(data => data.should.equal('yo'))
    });
});
const promiseShouldFail = (p) => {
    return new Promise((success, failure) => {
        p
            .then(() => {
                failure(new Error('Failed'));
            })
            .catch(() => {
                success();
            })
    })
};
describe('#Maybe not', () => {
    it('should work',  () => {
        return Promise.resolve();
    });
    it('should fail',  (done) => {
        const result = Promise.reject();
        result
            .then(() => {
                done(new Error('Should failed!!!'));
            })
            .catch(() => done());
    });
    it('should fail predicate',  () => {
        return promiseShouldFail(Promise.reject());
    });
});

describe('#as promised', () => {
    it('should work', () => {
        return Promise.resolve().should.be.fulfilled;
    });
    it('should work', () => {
        return Promise.all([
            Promise.resolve(),
            Promise.resolve(),
            Promise.resolve()
        ]).should.be.fulfilled;
    });
    it('should fail', () => {
        return Promise.reject().should.be.rejected;
    });
})

describe('async test case', function () {
    it('promise based way',  () => {
        this.timeout(200)
        return axios.get('https://reqres.in/api/users/2').then(res => {
            expect(res.data.data.email).to.be.equal('janet.weaver@reqres.in')
        })
    });

    it('done based way', function (done) {
        // this.retries(5)

        axios.get('https://reqres.in/api/users/2')
            .then(res => {
            expect(res.data.data.email).to.be.equal('janet.weaver@reqres.in');
            done();
        })
            .catch(err => {
                done(err);
            })
    });

    it('async await based way',  async () => {
        const res = await axios.get('https://reqres.in/api/users/2');
        expect(res.data.data.email).to.be.equal('janet.weaver@reqres.inr');
    });
})

describe.skip('1 async test case', function () {
    it('promise based way',  () => {
        this.timeout(200)
        return axios.get('https://reqres.in/api/users/2').then(res => {
            expect(res.data.data.email).to.be.equal('janet.weaver@reqres.in')
        })
    });
})

describe('2 async test case', function () {
    it('promise based way',  () => {
        this.timeout(200)
        return axios.get('https://reqres.in/api/users/2').then(res => {
            expect(res.data.data.email).to.be.equal('janet.weaver@reqres.in')
        })
    });
});


