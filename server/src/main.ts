import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import helmet from 'helmet';

import logger from './utils/logger';
import { connectToDatabase, disconnectFromDatabase } from "./utils/database";
import {CORS_ORIGIN} from "./constants";
import authRoute from './modules/auth/auth.route';
import deserializeUser from "./middleware/deserializeUser";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));
app.use(helmet());
app.use(deserializeUser);

app.use('/api/auth', authRoute);

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`Server listening at http://localhost:${PORT}`);
});

const signals = ["SIGTERM", "SIGINT"];

function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    logger.info("Goodbye, got signal", signal);
    server.close();
    //disconnect from the db
    await disconnectFromDatabase();

    logger.info("My work is done.");
    process.exit(0);
  })
}

for(let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}
