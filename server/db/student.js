const Sequelize = require('sequelize');
const db = require('./database');

module.exports = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    imgUrl: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    gpa: {
        type: Sequelize.FLOAT,
        validate: {
            min: 1.0,
            max: 4.0
        }
    },
    campusId: {
        type: Sequelize.INTEGER,
    }
})