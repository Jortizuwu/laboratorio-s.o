"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Process = connection_1.default.define("Process", {
    idProcess: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    PID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    user: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    time: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    timeStart: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    priority: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    cpu: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    quantum: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    mem: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
});
exports.default = Process;
//# sourceMappingURL=Process.js.map