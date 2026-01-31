import { Router } from "express";
// Import dei controller che contengono la logica per gli appuntamenti
import {
  getAppointmentsByUser,
  addAppointment,
  deleteAppointment,
  updateAppointment,

} from "../controllers/appointments-controller";

import { requireAuth } from "../middleware/auth-middleware";

const router = Router();

router.get("/", requireAuth, getAppointmentsByUser);
router.post("/", requireAuth, addAppointment);
router.delete("/:id", requireAuth, deleteAppointment);
router.put("/:id", requireAuth, updateAppointment);


export default router;