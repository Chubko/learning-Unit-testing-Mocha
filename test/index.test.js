const expect = require('chai').expect;
const should = require('chai').should();
_ = require('lodash');

const  { getPerson, Person, Armor, Weapon, getRandomNumber, rollDice, getNotARandomNumber, attack } = require('../src');

describe('#index initial conditions', () => {
    it('initial person is an object', () => {
        const person = getPerson();
        _.isObject(person).should.be.true;
    });
    it('armorBonus by default is 0 wearing leatherArmor ', () => {
        const person = getPerson();
        person.armorBonus.should.equal(0); //BUG. should be 2 by default using leatherArmor. Fix is to not reset armorBonus to 0
    });
});

describe('#Person', () => {
    describe('#rollDice', () => {
        it('should return a finite number (not NaN nor Infinity)',  () => {
            const number = Person.rollDice(1, 20);
            _.isFinite(number).should.be.true;
        });
        it('should not have 0 in a 1000 sample size',  () => {
            const sample = new Array(1000);
            _.fill(sample, 0);
            const rollDiceSamples = _.map(sample, item => Person.rollDice(1, 20));
            const anyZeros = _.filter(rollDiceSamples, item => item === 0);
            anyZeros.length.should.equal(0);
        });
    });

    describe('#attack', () => {
        let personA;
        let personB;
        let createPersonFixture = (name) =>{
            let leatherArmor = new Armor("Leather", 2);
            let shortSword = new Weapon("Short Sword", 0, 1, 6);
            return new Person(name, 2,4, 1, [leatherArmor, shortSword]);
        };
        beforeEach(() => {
            personA = createPersonFixture('personA');
            personB = createPersonFixture('personB');
        });
        afterEach(() => {
            personA = undefined;
            personB = undefined;
        });
        it("personA's hitpoints start at 11",  () => {
            personA.hitPoints.should.equal(11);
        });
        it("personB's hitpoints start at 11",  () => {
            personB.hitPoints.should.equal(11);
        });
        it("personA's armorBonus is 0",  () => {
            personA.armorBonus.should.equal(0);
        });
        it("personB's armorBonus is 0",  () => {
            personB.armorBonus.should.equal(0);
        });
        it("if I add boomstick to my equipment, it's in the equipment array", () => {
            const boomStick = new Weapon('Boom Stick', 0,1,12);
            personA.addEquipment(boomStick);
            personA.equipment.should.include(boomStick);
        });
        it("if I add hotpants to PersonA, he becomes awessauce...and has an armorBonus of 3", () => {
            const hotPants = new Armor('Hawt Pawwnts', 1);
            personA.addEquipment(hotPants);
            personA.armorBonus.should.equal(3);
        });
    });
});

describe("#getRandomNumber", () => {
    it('should return a finite number',  () => {
        const result = getRandomNumber();
        _.isFinite(result).should.be.true;
    });
});

describe("#rollDice", () => {
    it('should return a finite number',  () => {
        const result = rollDice(1, 20);
        _.isFinite(result).should.be.true;
    });
    it('should not be a random number if we use 1',  () => {
        const result = rollDice(1, 20, getNotARandomNumber);
        result.should.equal(20);
    });
});

describe("#getNotARandomNumber", () => {
    it('should return 1',  () => {
        const result = getNotARandomNumber();
        result.should.equal(1);
    });
});

describe("#attack", () => {
    it('should always be a hit if 20 is rolled',  () => {
        const rollDice = () => 20;
        const result = attack(rollDice, getNotARandomNumber, 0,0,0);
        result.hit.should.true;
    });
});
