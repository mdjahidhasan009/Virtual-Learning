import express from 'express';
import { processRequestBody } from "zod-express-middleware";
import { loginSchema } from "./auth.schema";
import { loginHandler } from "./auth.controller";

const router = express.Router();
router.post("/", processRequestBody(loginSchema.body), loginHandler);

export default router;
