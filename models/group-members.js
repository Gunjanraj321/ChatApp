const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Groupmember = sequelize.define('groupMembers',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    }},
    {
        timestamps: false
    });

module.exports=Groupmember;