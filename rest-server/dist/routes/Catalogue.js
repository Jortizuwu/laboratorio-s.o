"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Catalogue_1 = require("../controllers/Catalogue");
const router = (0, express_1.Router)();
router.get("/", Catalogue_1.getCatalogs);
router.get("/:id", Catalogue_1.getCatalogue);
router.post("/", Catalogue_1.createCatalogue);
router.post("/has", Catalogue_1.createCatalogueHasProcess);
router.put("/:id", Catalogue_1.updateCatalogue);
router.delete("/:id", Catalogue_1.deleteCatalogue);
exports.default = router;
//# sourceMappingURL=Catalogue.js.map