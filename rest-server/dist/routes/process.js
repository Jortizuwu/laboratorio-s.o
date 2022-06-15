"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const process_1 = require("../controllers/process");
const router = (0, express_1.Router)();
router.get("/", process_1.getProcesses);
router.get("/:id", process_1.getProcess);
router.post("/", process_1.createProcess);
router.put("/:id", process_1.updateProcess);
router.delete("/:id", process_1.deleteProcess);
exports.default = router;
//# sourceMappingURL=process.js.map