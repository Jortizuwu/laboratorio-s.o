import { Router } from "express";
import {
  createCatalogue,
  deleteCatalogue,
  getCatalogs,
  getCatalogue,
  updateCatalogue,
  createCatalogueHasProcess,
} from "../controllers/Catalogue";

const router = Router();

router.get("/", getCatalogs);
router.get("/:id", getCatalogue);
router.post("/", createCatalogue);
router.post("/has", createCatalogueHasProcess);
router.put("/:id", updateCatalogue);
router.delete("/:id", deleteCatalogue);

export default router;
