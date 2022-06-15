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
exports.deleteCatalogue = exports.updateCatalogue = exports.createCatalogueHasProcess = exports.createCatalogue = exports.getCatalogue = exports.getCatalogs = void 0;
const models_1 = require("../models");
const getCatalogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Catalogs = yield models_1.Catalogue.findAll({ include: { model: models_1.Process } });
        res.json({
            Catalogs,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "opps!!",
        });
    }
});
exports.getCatalogs = getCatalogs;
const getCatalogue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const catalogue = yield models_1.Catalogue.findByPk(id, {
            include: { model: models_1.Process },
        });
        if (!catalogue) {
            return res.status(404).json({
                msg: `The catalogue with id ${id} not found`,
            });
        }
        res.json({
            catalogue,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "opps!!",
        });
    }
});
exports.getCatalogue = getCatalogue;
const createCatalogue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const catalogue = new models_1.Catalogue(body);
        const data = yield catalogue.save();
        res.json({
            data: data.dataValues,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "opps!!",
        });
    }
});
exports.createCatalogue = createCatalogue;
const createCatalogueHasProcess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idCatalogue, processIdArr } = req.body;
        const catalogue = yield models_1.Catalogue.findByPk(idCatalogue);
        if (!catalogue) {
            return res.status(400).json({
                msg: `El id ${idCatalogue} not exist in catalog`,
            });
        }
        yield Promise.all(processIdArr.map((val) => __awaiter(void 0, void 0, void 0, function* () {
            const process = yield models_1.Process.findByPk(val);
            if (!process) {
                return res.status(400).json({
                    msg: `El id ${val} not exist in process`,
                });
            }
            const rocess_has_Catalogue = models_1.Process_has_Catalogue.build({
                CatalogueIdCatalogue: idCatalogue,
                ProcessIdProcess: val,
            });
            yield rocess_has_Catalogue.save();
        })));
        return res.status(201).json({
            status: "ok",
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createCatalogueHasProcess = createCatalogueHasProcess;
const updateCatalogue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const catalogue = yield models_1.Catalogue.findByPk(id);
        if (!catalogue) {
            return res.status(400).json({
                msg: `The catalogue with email ${body.email} arealy exists`,
            });
        }
        yield catalogue.update(body);
        res.json({
            catalogue,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "opps!!",
        });
    }
});
exports.updateCatalogue = updateCatalogue;
const deleteCatalogue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const catalogue = yield models_1.Catalogue.findByPk(id);
        if (!catalogue) {
            return res.status(400).json({
                msg: `The catalogue with id ${id} not found`,
            });
        }
        yield catalogue.update({ state: false });
        res.json({
            catalogue,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "opps!!",
        });
    }
});
exports.deleteCatalogue = deleteCatalogue;
//# sourceMappingURL=Catalogue.js.map