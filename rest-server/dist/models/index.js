"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Process_has_Catalogue = exports.Process = exports.Catalogue = void 0;
const catalogue_1 = __importDefault(require("./catalogue"));
exports.Catalogue = catalogue_1.default;
const Process_1 = __importDefault(require("./Process"));
exports.Process = Process_1.default;
const Process_has_Catalogue_1 = __importDefault(require("./Process_has_Catalogue"));
exports.Process_has_Catalogue = Process_has_Catalogue_1.default;
Process_1.default.belongsToMany(catalogue_1.default, { through: Process_has_Catalogue_1.default });
catalogue_1.default.belongsToMany(Process_1.default, { through: Process_has_Catalogue_1.default });
//# sourceMappingURL=index.js.map