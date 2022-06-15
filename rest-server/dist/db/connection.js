"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("lab", "root", "", {
    host: "localhost",
    dialect: "mysql",
    //   logging: false,
});
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.authenticate();
        db.sync();
        console.log("Connection has been established succesfully");
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.dbConnection = dbConnection;
exports.default = db;
//# sourceMappingURL=connection.js.map