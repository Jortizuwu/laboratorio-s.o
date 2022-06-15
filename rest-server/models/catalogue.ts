import { DataTypes } from "sequelize";
import db from "../db/connection";

const Catalogue = db.define("Catalogue", {
  idCatalogue: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Catalogue;
