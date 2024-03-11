const Sequelize = require('sequelize');

const db = require("../db");
// const { name } = require('ejs');

const Users = db.define('Users',{
    id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    phone:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    }
}) 
db.sync().then(() => {
    console.log("users table created");
}).catch((err) => {
    console.log(err);
});

module.exports = Users;