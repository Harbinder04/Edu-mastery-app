import express from 'express';
import {sendMessageToKafka} from '../controllers/kafkapublisher.controller.js';
// import uploadFileToS3 from '../controllers/upload.controller';
// import multipartUploadFileToS3 from '../controllers/multipartupload.controller';
import multer from 'multer';

const upload = multer();

// router.post('/', upload.fields([{ name: 'chunk' }, {name: 'totalChunks'}, {name: 'chunkIndex'}]), uploadFileToS3);

// router.post('/', multipartUploadFileToS3);


const router = express.Router();
router.post('/', sendMessageToKafka);

export default router;