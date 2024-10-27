import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import prismaModule from '../../db/src/db.js';
const prisma = prismaModule.default;

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
  return getSignedUrl(s3, command, { expiresIn: 3600 });
}

const watchVideo = async (req, res) => {
  try {
    const videoKey = req.query.key; // Key of the video file in S3
    const courseData = await prisma.courses.findUnique({
      where: {
        course_id: videoKey.toString(),
      },
      select: {
        course_title: true,
        course_description: true,
        created_at: true,
        course_author: true,
        course_url: true,
      },
    });

    if (!courseData) {
      return res.status(404).json({ error: "Course not found" });
    }

    const videoUrl = courseData.course_url;
    const videoKeyFromUrl = decodeURIComponent(videoUrl.split('/').slice(4).join('/').replace(/\+/g, ' '));
    console.log(videoKeyFromUrl);
    const signedUrl = await generateSignedUrl(videoKeyFromUrl);

    return res.json({ signedUrl, courseData });
  } catch (err) {
    console.error("Error generating pre-signed URL:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default watchVideo;