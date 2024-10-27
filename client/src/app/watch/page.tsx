"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Video from 'next-video';
import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const [videoData, setVideoData] = useState({
    course_title: "",
    course_description: "",
    created_at: "",
    course_author: "",
    course_url: ""
  });
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:8082/watch?key=${key}`);
        if (res.headers['content-type']?.includes('application/json')) {
          const courseData = res.data.courseData;
          console.log(courseData);
          // console.log(res.data.signedUrl);
          // setVideoUrl(res.data.signedUrl);
          setVideoData({
            course_title: courseData.course_title,
            course_description: courseData.course_description,
            created_at: courseData.created_at,
            course_author: courseData.course_author,
            course_url: courseData.course_url
          });
        } else {
          console.error("Unexpected response format:", res.data);
        }
        setLoading(false);
      } catch (error) {
        console.log("Error in fetching video: ", error);
        setLoading(false);
      }
    };

    if (key) {
      fetchVideo();
    }
  }, [key]);

  return (
    <div>
      {loading ? (
        <div className="container mx-auto flex justify-center items-center h-screen">
          Loading...
        </div>
      ) : (
        <div className="container mx-auto my-10">
          <Video src={videoUrl} />
          <div className="mt-4">
            <h1 className="text-white text-3xl font-bold">{videoData.course_title}</h1>
            <p className="text-white mt-2">Author - {videoData.course_author}</p>
            <p className="text-white mt-2">{videoData.course_description}</p>
            <p className="text-white mt-2">Created at: {new Date(videoData.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;