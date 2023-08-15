import "reflect-metadata";

import "dotenv/config";

import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import express from "express";
import { Server } from "socket.io";

import { disconnectFromDatabase } from "./database/connection";
import EnvironmentVars from "@/constants/env-vars";
import commentsRouter from "@/modules/comments";

const app = express();

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use morgan middleware only in development

// Rate limiting middleware

// modules router handler middlewares
app.use(EnvironmentVars.API_ROOT + "/comments", commentsRouter);

// Error middleware

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {});

const io = new Server(server);
console.log(io);

// Gracefully shutdown server and database
const shutdownSignals = ["SIGTERM", "SIGINT"];
function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    // close database connection
    disconnectFromDatabase();

    server.close((error) => {
      console.log("Server wasnot open!", error?.message);
    });

    // release resources if any or need be.

    process.exit(0);
  });
}
for (let counter = 0; counter < shutdownSignals.length; counter++) {
  gracefulShutdown(shutdownSignals[counter]);
}
