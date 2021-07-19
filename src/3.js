let _ = require('lodash');

let getRandomNumber = ()=> Math.random();
let getNotARandomNumber = ()=> 1;
let rollDice = (howMany, type, randomNumberFunction=getRandomNumber)=>
{
    let total = 0;
    for(let i=0;i<howMany;i++)
    {
        total += Math.round(randomNumberFunction() * type);
    }
    return total;
};
let attack = (rollDice,
              randomNumberGenerator,
              attackersStrength,
              targetArmorBonus,
              targetDexterity)=>
{
    let roll = rollDice(1, 20, randomNumberGenerator);
    roll += attackersStrength;
    roll = _.clamp(roll, 1, 20);
    let toHit = 10 + targetArmorBonus + targetDexterity;
    let hit = roll >= toHit;
    return {
        roll,
        hit,
        toHit
    };
};

class Person
{
    constructor(name, strength, dexterity, constitution, equipment)
    {
        this.name = name;
        this.strength = strength;
        this.dexterity = dexterity;
        this.constitution = constitution;
        this.hitPoints = 10 + constitution;
        this.equipment = equipment;
        this.calculateEquipment();
        this.armorBonus = 0;
    }

    static rollDice(howMany, type)
    {
        let total = 0;
        for(let i=0;i<howMany;i++)
        {
            total += Math.round(Math.random() * type);
        }
        return total;
    }

    attack(target)
    {
        let roll = Person.rollDice(1, 20);
        roll += this.strength;
        roll = _.clamp(roll, 1, 20);
        let toHit = 10 + target.armorBonus + target.dexterity;
        return roll >= toHit;
    }

    addEquipment(item)
    {
        this.equipment.push(item);
        if(item instanceof Armor)
        {
            this.calculateEquipment();
        }
    }

    removeEquipment(item)
    {
        for(let i=0; i<this.equipment.length; i++)
        {
            let e = this.equipment[i];
            if(e === item)
            {
                this.equipment.splice(i, 1);
            }
        }
        if(item instanceof Armor)
        {
            this.calculateEquipment();
        }
    }

    calculateEquipment()
    {
        this.armorBonus = 0;
        for(let i=0; i<this.equipment.length; i++)
        {
            let item = this.equipment[i];
            if(item instanceof Armor)
            {
                this.armorBonus += item.bonus;
            }
        }
    }
}

class Armor
{
    constructor(name, bonus)
    {
        this.name = name;
        this.bonus = bonus;
    }
}

class Weapon
{
    constructor(name, bonsu, damageDieAmount, damageDieType)
    {
        this.name = name;
        this.bonsu = bonsu;
        this.damageDieAmount = damageDieAmount;
        this.damageDieType = damageDieType;
    }
}

let person;

function setupPerson()
{
    let leatherArmor = new Armor("Leather", 2);
    let shortSword = new Weapon("Short Sword", 0, 1, 6)
    person = new Person('McFly Bojo', 2, 4, 1, [leatherArmor, shortSword]);
}

setupPerson();

getPerson = ()=> person;
module.exports = {
    getPerson,
    Person,
    Armor,
    Weapon,
    rollDice,
    getRandomNumber,
    getNotARandomNumber,
    attack
}
