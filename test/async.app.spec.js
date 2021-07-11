const expect = require('chai').expect;
const axios = require('axios');

describe('async test case', function () {
    it('promise based way',  () => {
        this.timeout(200)
        return axios.get('https://reqres.in/api/users/2').then(res => {
            expect(res.data.data.email).to.be.equal('janet.weaver@reqres.in')
        })
    });

    it('done based way',  function (done) {
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

describe.only('2 async test case', function () {
    it('promise based way',  () => {
        this.timeout(200)
        return axios.get('https://reqres.in/api/users/2').then(res => {
            expect(res.data.data.email).to.be.equal('janet.weaver@reqres.in')
        })
    });
})
