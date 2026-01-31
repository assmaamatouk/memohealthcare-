"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const auth_routes_1 = __importDefault(require("./src/routes/auth-routes"));
const reminders_routes_1 = __importDefault(require("./src/routes/reminders-routes"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(auth_routes_1.default);
app.use(reminders_routes_1.default);
app.use((0, connect_history_api_fallback_1.default)());
app.use(express_1.default.static("public"));
app.use(express_1.default.static("dist-frontend"));
app.use((req, res) => {
    res.status(404).send("Ops... Pagina non trovata");
});
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
