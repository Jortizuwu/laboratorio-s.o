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
exports.createProcessys = exports.getProcessys = void 0;
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const child_process_1 = require("child_process");
const discart = [
    "USER",
    "PID",
    "%CPU",
    "%MEM",
    "VSZ",
    "RSS",
    "TTY",
    "STAT",
    "START",
    "TIME",
    "COMMAND",
];
const getProcessys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        fs_1.default.readFile("./assets/tasklist.json", (err, uwu) => {
            if (err) {
                return res.status(400).json({
                    status: "bad request file not exits",
                });
            }
            const data = JSON.parse(uwu);
            return res.json({
                data,
                status: "ok",
            });
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "opps!!",
        });
    }
});
exports.getProcessys = getProcessys;
const createProcessys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, child_process_1.exec)("cd assets && ps aux cat > tasklist.txt ", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return res.status(400).json({
                    status: "bad request error",
                });
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return res.status(400).json({
                    status: "bad request error",
                });
            }
            console.log(`file created ${stdout}`);
            const obj = {};
            const arr = [];
            const lineReader = readline_1.default.createInterface({
                input: fs_1.default.createReadStream("./assets/tasklist.txt"),
            });
            lineReader.on("line", function (line) {
                const [USER, PID, CPU, MEM, VSZ, RSS, TTY, STAT, START, TIME, COMMAND] = line.split(" ").filter((el) => el !== "" && !discart.includes(el));
                const newProcess = (obj[Object.keys(obj).length || 0] = {
                    USER,
                    PID,
                    CPU,
                    MEM,
                    VSZ,
                    RSS,
                    TTY,
                    STAT,
                    START,
                    TIME,
                    COMMAND,
                });
                arr.push(newProcess);
            });
            lineReader.on("close", () => {
                fs_1.default.writeFile("./assets/tasklist.json", JSON.stringify(arr), function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Convertido a JSON");
                });
            });
            res.json({
                status: "ok",
            });
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "opps!!",
        });
    }
});
exports.createProcessys = createProcessys;
//# sourceMappingURL=processys.js.map