import { Router } from "express";
// Import dei controller che gestiscono login, registrazione, logout e recupero profilo
import { login, register, logout, getProfile } from "../controllers/auth-controllers";

import { requireAuth } from "../middleware/auth-middleware";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", requireAuth, logout);
router.get("/profile", requireAuth, getProfile);

export default router;