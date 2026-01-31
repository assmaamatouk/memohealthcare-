"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql2_1 = __importDefault(require("mysql2"));
const router = (0, express_1.Router)();
const db = mysql2_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "memohealthcare",
});
router.get("/reminders/:userId", (req, res) => {
    const userId = req.params.userId;
    db.query("SELECT * FROM reminders WHERE user_id = ?", [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "DB error" });
        }
        res.json(results);
    });
});
exports.default = router;
