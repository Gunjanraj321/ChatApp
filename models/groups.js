const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Group = sequelize.define(
  "Groups",
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(50),
      unique:true,
      notEmpty: true,
    },
    membersNo: {
      type: Sequelize.INTEGER,
      defaultValue: false,
    },
    date_time: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Group;
