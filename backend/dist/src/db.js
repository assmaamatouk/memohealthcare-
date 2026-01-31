"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const db = mysql2_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "", // ضع كلمة المرور تاع MySQL
    database: "memohealthcare",
});
db.connect((err) => {
    if (err)
        throw err;
    console.log("Connected to MySQL");
});
exports.default = db;
