import { Router } from "express";
// Import dei controller che gestiscono i promemoria
import {
  getRemindersByUser,
  addReminder,
  updateReminder,
  deleteReminder,
} from "../controllers/reminders-controller";

import { requireAuth } from "../middleware/auth-middleware";

const router = Router();

router.get("/user", requireAuth, getRemindersByUser);
router.post("/", requireAuth, addReminder);
router.put("/:id", requireAuth, updateReminder);
router.delete("/:id", requireAuth, deleteReminder);

export default router;