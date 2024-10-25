import { S3Client, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand, ListPartsCommand } from '@aws-sdk/client-s3';
import  {pushVideoForEncodingToKafka} from './kafkapublisher.controller.js';
import prismaModule from '../../db/src/db.js';
const prisma = prismaModule.default;
// export const multipartUploadFileToS3 = async (req, res) => {
//     console.log("Uploading req received");
//     const file = req.file;
//     console.log("file", file);
//     if (!file) {
//         return res.status(400).send("No file uploaded");
//     }

//     const s3Client = new S3Client({
//         region: process.env.AWS_REGION,
//         credentials: {
//             accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//             secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//         }
//     });

//     const uploadParams = {
//          Bucket: process.env.AWS_BUCKET_NAME,
//         Key: `uploads/content-videos/${file.originalname}`,
//         ContentType: file.mimetype,
//     };

//     try {
//         console.log("Creating multipart upload");

//         const multipartParams = await s3Client.send(new CreateMultipartUploadCommand(uploadParams));
//         const fileSize = file.size;
//         const chunkSize = 1024 * 1024 * 5; // 5MB
//         const numofParts = Math.ceil(fileSize / chunkSize);
//         const uploadedETags = [];

//         for (let i = 1; i <= numofParts; i++) {
//             const start = (i - 1) * chunkSize;
//             const end = Math.min(start + chunkSize, fileSize);

//             const partParams = {
//                 Bucket: uploadParams.Bucket,
//                 Key: uploadParams.Key,
//                 PartNumber: i,
//                 UploadId: multipartParams.UploadId,
//                 Body: file.buffer.slice(start, end),
//                 ContentLength: end - start,
//             };

//             const data = await s3Client.send(new UploadPartCommand(partParams));
//             console.log("Uploaded part: ", data.ETag);

//             uploadedETags.push({ PartNumber: i, ETag: data.ETag });
//         }

//         const completeParams = {
//             Bucket: uploadParams.Bucket,
//             Key: uploadParams.Key,
//             UploadId: multipartParams.UploadId,
//             MultipartUpload: {
//                 Parts: uploadedETags
//             }
//         };

//         console.log('Completing upload');
//         const uploadedData = await s3Client.send(new CompleteMultipartUploadCommand(completeParams));
//         console.log('Upload completed', uploadedData);

//         return res.status(200).json({ message: "File uploaded successfully" });
//     } catch (error) {
//         console.log("Error", error);
//         return res.status(500).send("Internal server error");
//     }
// }

export const initializeUpload = async (req, res) => {
    const { filename} = req.body;
    // const { id } = req.query;

    try {
        const s3 = new S3Client({
            region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
        });

        const uploadParams = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: `uploads/content-videos/${filename}`,
                    ContentType: 'video/mp4',
                };

        const multipartParams = await s3.send(new CreateMultipartUploadCommand(uploadParams));
        console.log("Multipart upload initialized", multipartParams);
        const uploadId = await multipartParams.UploadId;

        res.status(200).json({ uploadId });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).send("Internal server error");
    }
}

export const uploadChunk = async (req, res) => {
    try {
        console.log('Uploading chunk');
        const { filename, chunkIndex, uploadId, totalChunks } = req.body;
        console.log(typeof uploadId, uploadId);
        const s3 = new S3Client({
            region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
        });

        const uploadParams = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: `uploads/content-videos/${filename}`,
                    UploadId: uploadId,
                    PartNumber: parseInt(chunkIndex) + 1,
                    Body: req.file.buffer,
                };

        const data = await s3.send(new UploadPartCommand(uploadParams));
        console.log("data", data);
        res.status(200).json({ message: "Chunk uploaded successfully" });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).send("Internal server error");
    }
}

export const completeUpload = async (req, res) => {
    try {
        console.log('Completing Upload');
        const { filename, totalChunks, uploadId, title, description, author, user_id } = req.body;

        const uploadedParts = [];

        // Build uploadedParts array from request body
        for (let i = 0; i < totalChunks; i++) {
            uploadedParts.push({ PartNumber: i + 1, ETag: req.body[`part${i + 1}`] });
        }

        const s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            }
        });

        const listParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `uploads/content-videos/${filename}`,
            UploadId: uploadId,
        };

        // Listing parts using ListPartsCommand
        const data = await s3.send(new ListPartsCommand(listParams));

        const parts = data.Parts.map(part => ({
            PartNumber: part.PartNumber,
            ETag: part.ETag,
        }));

        const completeParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `uploads/content-videos/${filename}`,
            UploadId: uploadId,
            MultipartUpload: {
                Parts: parts,
            }
        };

        // Completing multipart upload using CompleteMultipartUploadCommand
        const uploadResult = await s3.send(new CompleteMultipartUploadCommand(completeParams));

        // console.log("Upload Result: ", uploadResult);

        // console.log('Prisma object:', prisma);
        // console.log('Prisma course:', prisma.courses);
        const course = await prisma.courses.create({
            data: {
                course_title: title,
                course_description: description,
                course_author: author,
                course_url: uploadResult.Location,
                userId: user_id
            }
        });

        // pushVideoForEncodingToKafka({ title, description, author, videoUrl: uploadResult.Location });
        return res.status(200).json({ message: "Uploaded successfully!!!", course: course.course_id });
    } catch (error) {
        console.error('Error completing upload:', error);
        if (error instanceof Error) {
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }
        return res.status(500).json({ error: error.message });
    }
};