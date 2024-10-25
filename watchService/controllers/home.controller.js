import prismaModule from '../../db/src/db.js'
const prisma = prismaModule.default;

const getAllVideos = async(req, res) => {
    try {
        console.log('Fetching all videos' + prisma);
        const allData = await prisma.courses.findMany({
            select: {
              course_id: true,
              course_title: true,
              course_description: true,
              course_url: true,
              course_author: true,
              created_at: true,
              userId: true,
            }
        });
        console.log(allData);
        if(!allData) {
          return res.status(404).send('No videos found');
        }
        return res.status(200).send(allData);
      } catch (error) {
        console.log('Error fetching data:', error);
        return res.status(400).send();
      }
}

export default getAllVideos;
