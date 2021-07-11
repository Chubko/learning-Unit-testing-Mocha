const { assert, expect, should } = require('chai');

describe('Chai assertion', () => {
    const a = 20,
        arr = [30, 40, 50],
        obj = {name: 'Luda'},
        func = (a,b) => a + b,
        isTrue = true,
        nan = NaN,
        und = undefined;

    it('Assert style', () => {
        assert.ok(true);
        assert.typeOf(arr, 'array');
        assert.include(arr, 31, '30 isnt there in the array');
        assert.lengthOf(arr, 3, 'Length isnt 3');
        assert.deepEqual(arr, [30, 40, 50]);
        assert.equal(arr, [30, 40, 50]);
        assert.sameOrderedMembers(arr, [30, 40, 50]);
    });

    it('Expect style', () => {
        expect(true).to.be.true;
        expect(arr).to.be.a('array');
        expect(arr).to.have.length(3);
        expect(arr).to.eql([30, 40, 50]);
        expect(obj).to.have.keys(['name']);
        expect(obj).to.not.have.keys(['age']);
    });

    it('Should style', () => {
        true.should.be.true;
        arr.should.include(30);
    })
})
