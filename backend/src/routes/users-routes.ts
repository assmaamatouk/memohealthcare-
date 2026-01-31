import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile
} from "../controllers/users-controller";
import { requireAuth } from "../middleware/auth-middleware";

const router = Router();

// Recupera il profilo dell'utente autenticato
router.get("/me", requireAuth, getUserProfile);

// Aggiorna il profilo dell'utente autenticato
router.put("/me", requireAuth, updateUserProfile);

export default router;
