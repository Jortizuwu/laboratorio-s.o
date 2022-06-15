import { Router } from "express";
import { getProcessys, createProcessys } from "../controllers/processys";

const router = Router();

router.get("/", getProcessys);
router.post("/", createProcessys);

export default router;
