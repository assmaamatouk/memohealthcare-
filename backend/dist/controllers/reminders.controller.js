"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReminder = exports.updateReminder = exports.addReminder = exports.getReminders = void 0;
const db_1 = __importDefault(require("../db"));
// جلب كل الـ reminders لمستخدم
const getReminders = (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT * FROM reminders WHERE user_id = ?";
    db_1.default.query(sql, [userId], (err, results) => {
        if (err)
            return res.status(500).json({ error: "Errore lettura promemoria" });
        res.json(results);
    });
};
exports.getReminders = getReminders;
// إضافة reminder جديد
const addReminder = (req, res) => {
    const { user_id, farmaco, dosaggio, orario } = req.body;
    const sql = "INSERT INTO reminders (user_id, farmaco, dosaggio, orario) VALUES (?, ?, ?, ?)";
    db_1.default.query(sql, [user_id, farmaco, dosaggio, orario], (err) => {
        if (err)
            return res.status(500).json({ error: "Errore inserimento promemoria" });
        res.json({ success: true });
    });
};
exports.addReminder = addReminder;
// تحديث reminder
const updateReminder = (req, res) => {
    const id = req.params.id;
    const { farmaco, dosaggio, orario } = req.body;
    const sql = "UPDATE reminders SET farmaco = ?, dosaggio = ?, orario = ? WHERE id = ?";
    db_1.default.query(sql, [farmaco, dosaggio, orario, id], (err) => {
        if (err)
            return res.status(500).json({ error: "Errore aggiornamento" });
        res.json({ success: true });
    });
};
exports.updateReminder = updateReminder;
// حذف reminder
const deleteReminder = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM reminders WHERE id = ?";
    db_1.default.query(sql, [id], (err) => {
        if (err)
            return res.status(500).json({ error: "Errore eliminazione" });
        res.json({ success: true });
    });
};
exports.deleteReminder = deleteReminder;
