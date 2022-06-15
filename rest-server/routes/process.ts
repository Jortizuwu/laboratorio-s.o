import { Router } from "express";
import {
  createProcess,
  deleteProcess,
  getProcess,
  getProcesses,
  updateProcess,
} from "../controllers/process";

const router = Router();

router.get("/", getProcesses);
router.get("/:id", getProcess);
router.post("/", createProcess);
router.put("/:id", updateProcess);
router.delete("/:id", deleteProcess);

export default router;
