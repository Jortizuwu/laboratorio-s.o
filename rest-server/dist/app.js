"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("./db/connection");
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
//db connection
(0, connection_1.dbConnection)();
// Middlewares
//cors
app.use((0, cors_1.default)());
//body reading
app.use(express_1.default.json());
//Routes
app.use("/catalogue", routes_1.catalogue);
app.use("/process", routes_1.process);
app.use("/processys", routes_1.processys);
//listen
app.listen("8080", () => console.log("server running in the port", 8080));
exports.default = app;
//# sourceMappingURL=app.js.map