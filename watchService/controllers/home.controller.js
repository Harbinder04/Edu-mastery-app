import prisma from '../../db/src/db.js'

const getAllVideos = async(req, res) => {
    try {
        const allData = await prisma.$queryRaw`SELECT * FROM "Courses"`;
        console.log(allData);
        return res.status(200).send(allData);
      } catch (error) {
        console.log('Error fetching data:', error);
        return res.status(400).send();
      }
}

export default getAllVideos;
