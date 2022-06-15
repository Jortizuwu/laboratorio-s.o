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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProcess = exports.updateProcess = exports.createProcess = exports.getProcess = exports.getProcesses = void 0;
const models_1 = require("../models");
const fs_1 = __importDefault(require("fs"));
const getProcesses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const process = yield models_1.Process.findAll({ include: { model: models_1.Catalogue } });
        res.json({
            process,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "opps!!",
        });
    }
});
exports.getProcesses = getProcesses;
const getProcess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const process = yield models_1.Process.findByPk(id);
        if (!process) {
            return res.status(404).json({
                msg: `The Process with id ${id} not found`,
            });
        }
        res.json({
            process,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "opps!!",
        });
    }
});
exports.getProcess = getProcess;
const createProcess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const processes = [];
        yield Promise.all(body.map((val) => __awaiter(void 0, void 0, void 0, function* () {
            const process = new models_1.Process({
                name: val === null || val === void 0 ? void 0 : val.name,
                PID: val.pid,
                user: val.user,
                status: val.stat,
                time: val.time,
                timeStart: val.start,
                cpu: val === null || val === void 0 ? void 0 : val.cpu,
                mem: val === null || val === void 0 ? void 0 : val.mem,
                quantum: (val === null || val === void 0 ? void 0 : val.name.length) || 0,
                priority: (val === null || val === void 0 ? void 0 : val.user) === "root" ? 0 : 1,
            });
            fs_1.default.writeFile(`./assets/processFiles/${val.name}.txt`, val.name, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("file created");
            });
            const data = yield process.save();
            processes.push(data);
        })));
        const data = processes.map((value) => {
            return value.dataValues;
        });
        res.status(200).json({
            status: "ok",
            data,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "opps!!",
        });
    }
});
exports.createProcess = createProcess;
const updateProcess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const process = yield models_1.Process.findByPk(id);
        if (!process) {
            return res.status(400).json({
                msg: `The Process with email ${body.email} arealy exists`,
            });
        }
        yield process.update(body);
        res.json({
            process,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "opps!!",
        });
    }
});
exports.updateProcess = updateProcess;
const deleteProcess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const process = yield models_1.Process.findByPk(id);
        if (!process) {
            return res.status(400).json({
                msg: `The Process with id ${id} not found`,
            });
        }
        yield process.update({ state: false });
        res.json({
            process,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "opps!!",
        });
    }
});
exports.deleteProcess = deleteProcess;
//# sourceMappingURL=process.js.map