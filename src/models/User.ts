import Sequelize from "sequelize";
import { sequelize } from "../config/database";

export default sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    created_at: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: false,
  }
);
