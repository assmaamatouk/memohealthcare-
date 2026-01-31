import { Router } from "express";
// Import dei controller che gestiscono gli esami: lettura, creazione, aggiornamento ed eliminazione
import {
  getEsamiByUser,
  createEsame,
  updateEsame,
  deleteEsame
} from "../controllers/esami-controller";
import { requireAuth } from "../middleware/auth-middleware";

const router = Router();

router.get("/esami", requireAuth, getEsamiByUser);
router.post("/", requireAuth, createEsame);
router.put("/:id", requireAuth, updateEsame);
router.delete("/:id", requireAuth, deleteEsame);

export default router;