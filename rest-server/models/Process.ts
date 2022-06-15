import { DataTypes } from "sequelize";
import db from "../db/connection";

const Process = db.define("Process", {
  idProcess: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  PID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  time: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timeStart: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  priority: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cpu: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  quantum: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  mem: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Process;
