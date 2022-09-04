const Sequelize = require('sequelize');
const db = require('./database');

//Campus definition
module.exports = db.define('campus', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    imgUrl: {
        type: Sequelize.TEXT,
        defaultValue: 'https://cityclub.imgix.net/files/blog/page/campus.jpg'
    }
})