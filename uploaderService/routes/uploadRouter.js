import express from "express";
// import { multipartUploadFileToS3 } from "../controllers/multipartupload.controller.js";
import multer from "multer";
import { initializeUpload, uploadChunk, completeUpload } from "../controllers/multipartupload.controller.js";

const router = express.Router();
const upload = multer();

// uploading video in chunks : In one go. 
// router.post('/', upload.single(), multipartUploadFileToS3);

// TODO: make these routes. : Uploading video in chunks using 3 different route.
console.log("check - 1")
router.post('/initialize', upload.none(), initializeUpload);

// Route for uploading individual chunks
router.post('/', upload.single('chunk'), uploadChunk);

// Route for completing the upload
router.post('/complete', completeUpload);

export default router;