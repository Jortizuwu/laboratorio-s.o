"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const processys_1 = require("../controllers/processys");
const router = (0, express_1.Router)();
router.get("/", processys_1.getProcessys);
router.post("/", processys_1.createProcessys);
exports.default = router;
//# sourceMappingURL=processys.js.map