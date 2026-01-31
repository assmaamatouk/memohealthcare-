"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const db_1 = __importDefault(require("../db"));
const register = (req, res) => {
    const { nome, cognome, data_nascita, codice_fiscale, pin } = req.body;
    const sql = "INSERT INTO users (nome, cognome, data_nascita, codice_fiscale, pin) VALUES (?, ?, ?, ?, ?)";
    db_1.default.query(sql, [nome, cognome, data_nascita, codice_fiscale, pin], (err, results) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .json({ error: "User already exists or DB error" });
        }
        res.json({
            success: true,
            user: {
                id: results.insertId,
                nome,
                cognome,
                data_nascita,
                codice_fiscale,
            },
        });
    });
};
exports.register = register;
const login = (req, res) => {
    const { codice_fiscale, pin } = req.body;
    const sql = "SELECT * FROM users WHERE codice_fiscale = ? AND pin = ?";
    db_1.default.query(sql, [codice_fiscale, pin], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        if (results.length > 0) {
            res.json({ success: true, user: results[0] });
        }
        else {
            res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        }
    });
};
exports.login = login;
