import { PutObjectCommand, S3Client, GetObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({ region: process.env.AWS_REGION ,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

async function GetObject() {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: "uploads/content-videos/WIN_20240307_13_35_59_Pro.mp4",
    });

    try {
        const url = await getSignedUrl(s3Client, command);
        return url;
    } catch (err) {
        console.log("Error", err);
    }
}

GetObject().then((url) => {
    console.log("URL: ", url);
}
);
// async function uploadFile(file) {
//     const command = new PutObjectCommand({
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: `uploads/content-videos/${file.originalname}`,
//         Body: file.buffer, // Ensure the file content is correctly passed
//         ContentType: file.mimetype, // Ensure the correct MIME type
//         ContentLength: file.size // Explicitly set the content length
//     });

//     try {
//         const response = await s3Client.send(command);
//         if (!response) {
//             throw new Error("Error uploading file");
//         }
//         return response;
//     } catch (err) {
//         console.log("Error", err);
//     }
// }

// export async function uploaderService(req, res) {
//     console.log("Request: ", req.file);
//     if (!req.file) {
//         return res.status(400).send("No file uploaded");
//     }
//     const file = req.file;
//     const result = await uploadFile(file);
//     if (!result) {
//         return res.status(500).send("Internal server error");
//     }
//     return res.status(200).json({ result: result, message: "File uploaded successfully" });
// }
// async function init(){
//     console.log("URL: ", await GetObject("uploads/content-videos/undefined"));
//     // console.log("URL: ", await uploadFile(`video-${Date.now()}.mp4`));
// }

// init();
