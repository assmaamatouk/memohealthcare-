import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express, { Express } from "express";
import cors from "cors";
import history from "connect-history-api-fallback";

import authRouter from "./src/routes/auth-routes";
import remindersRouter from "./src/routes/reminders-routes";
import appointmentsRouter from "./src/routes/appointments-routes";
import esamiRouter from "./src/routes/esami-routes";
import usersRouter from "./src/routes/users-routes";

const app: Express = express();
const port: number = 3000;

// CORS configurato per cookie
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/reminders", remindersRouter);
app.use("/api/appointments", appointmentsRouter);
app.use("/api/esami", esamiRouter);
app.use("/api/users", usersRouter);

app.use(express.static("public"));
app.use(express.static("dist-frontend"));

app.use(
  history({
    rewrites: [
      { from: /^\/api\/.*$/, to: (context) => context.parsedUrl.path },
    ],
  }) as any
);

app.use((req, res) => {
  res.status(404).send("Ops... Pagina non trovata");
});

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});