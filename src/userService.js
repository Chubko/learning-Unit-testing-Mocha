const models = require("./models");

module.exports = {
    getUserCardNumber: async (cardNumber) => {
            return models.getUserCardNumber(cardNumber);
    }
};

