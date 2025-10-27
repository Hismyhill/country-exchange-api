// src/models/country.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const Country = sequelize.define(
  "Country",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true },
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    population: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: { min: 0 },
    },
    currency_code: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    exchange_rate: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    estimated_gdp: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    flag_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_refreshed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "countries",
    timestamps: true,
  }
);

export default Country;
