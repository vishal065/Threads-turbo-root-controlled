/* eslint-disable no-console */
import cluster from "cluster";
import cors from "cors";
import os from "os";
import cookieParser from "cookie-parser";
import express, { type Application } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql/index.js";
import helmet from "helmet";
import config from "./config/config.js";

if (cluster.isPrimary) {
  const cpu = os.cpus().length;
  cluster.fork();
  for (let i = 0; i < cpu; i++) {
    console.log("running worker", i);
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`
    );
    cluster.fork(); // Fork a new worker if one dies
  });
  cluster.on("disconnect", (worker) => {
    console.log(`Worker ${worker.process.pid} disconnected`);
  });
} else {
  // Fix: Add void operator to explicitly mark the promise as ignored
  void startServer();
}

async function startServer(): Promise<void> {
  const app: Application = express();

  if (config.ENV === "development") {
    app.use(
      helmet({
        contentSecurityPolicy: false, // 🚨 Only for dev!
      })
    );
  } else {
    app.use(helmet()); // secure default in prod
  }
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

  const server = app.listen(config.PORT, () => {
    console.log(`Server is running on ${config.PORT}`);
  });

  // Graceful shutdown on SIGTERM
  if (cluster.isWorker) {
    process.on("SIGTERM", () => {
      console.log("SIGTERM received: shutting down gracefully...");
      if (cluster.worker) {
        cluster.worker.disconnect(); // Disconnect the worker
      }

      server.close(() => {
        console.log("Closed out remaining connections");
        process.exit(0); // Exit the process once all connections are closed
      });

      // Force exit after a timeout in case connections don't close
      setTimeout(() => {
        console.error("Forcing shutdown due to timeout...");
        process.exit(1);
      }, 10000); // Force shutdown after 10 seconds
    });
  }
}
