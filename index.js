import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import session from "express-session";
import db from "./Kambaz/Database/index.js";

const CONNECTION_STRING =
  process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);
import UserRoutes from "./Kambaz/users/routes.js";
import CourseRoutes from "./Kambaz/courses/routes.js";
import ModulesRoutes from "./Kambaz/modules/routes.js";
import AssignmentsRoutes from "./Kambaz/assignments/routes.js";
import EnrollmentsRoutes from "./Kambaz/enrollments/routes.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
// Cross-origin browser clients (e.g. Vercel → Render) need SameSite=None; Secure.
// Render sets NODE_ENV=production even if SERVER_ENV was copied as "development" by mistake.
const useCrossSiteSessionCookies =
  process.env.NODE_ENV === "production" ||
  process.env.SERVER_ENV === "production";
if (useCrossSiteSessionCookies) {
  app.set("trust proxy", 1);
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app);
EnrollmentsRoutes(app, db);
Lab5(app);
Hello(app);
const port = process.env.PORT || 3001;
app.listen(port);
