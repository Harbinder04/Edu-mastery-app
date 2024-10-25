import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

async function generateSignedUrl(videoKey) {
  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: videoKey,
    Expires: 3600,
  };

  const command = new GetObjectCommand(params);
  console.log("command is ", await getSignedUrl(s3, command, { expiresIn: 3600 }));
  return getSignedUrl(s3, command, { expiresIn: 3600 });
}

const watchVideo = async (req, res) => {
  try {
    const videoKey = req.query.key; // Key of the video file in S3
    console.log("video key is ", videoKey);
    const signedUrl = await generateSignedUrl(videoKey);
    res.json({ signedUrl });
    // console.log(signedUrl);
  } catch (err) {
    console.error("Error generating pre-signed URL:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default watchVideo;
