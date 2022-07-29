import express from 'express';
import {findVideosHandler, streamVideoHandler, updateVideoHandler, uploadVideoHandler} from "./video.controller";
import requireUser from "../../middleware/requireUser";
const router = express.Router();

router.get("/", findVideosHandler);
router.post("/", requireUser, uploadVideoHandler);
router.get('/:videoId', streamVideoHandler);
router.patch("/:videoId", requireUser, updateVideoHandler);

export default router;
