const Sequelize = require('sequelize');
const db = require('./database');


//Student definition
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
            isEmail: true,
        },
    },
    imgUrl: {
        type: Sequelize.STRING,
        defaultValue: 'default'
    },
    gpa: {
        type: Sequelize.FLOAT,
        validate: {
            min: 0.0,
            max: 4.0
        }
    },
    campusId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
})