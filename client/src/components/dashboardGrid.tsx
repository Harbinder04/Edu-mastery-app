"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import dynamic from 'next/dynamic'
import { SessionProvider } from "next-auth/react";
import Nav from "../components/nav";
import { useRouter } from "next/navigation";

const DashboardGrid = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

    useEffect(() => {
      const getVideos = async () => {
        try {
          const res = await axios.get("http://localhost:8082/watch/home");
          console.log(res);
          setVideos(res.data);
          setLoading(false); // Set loading to false when videos are fetched
        } catch (error) {
          console.log("Error in fetching videos : ", error);
          setLoading(false);
        }
      };
      getVideos();
    }, []);

    const handleVideoClick = (id: string) => {
      // const videoKey = id.split('/').slice(4).join('/'); 
      // router.push(`/watch?key=${videoKey}`);
      router.push(`/watch?key=${id}`);
    };
  return (
    <div>
      <SessionProvider>
      <Nav />
      </SessionProvider>
      {loading ? (
        <div className="container mx-auto flex justify-center items-center h-screen">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 my-10 mx-14">
      {videos.map((video: any) => (
        <div
          key={video.course_id}
          className="border rounded-md overflow-hidden bg-slate-300 cursor-pointer"
          onClick={() => handleVideoClick(video.course_id)}
        >
          <div>
            <img src={"Thumbnail.png"} alt="Thumbnail" className="w-full" height={180} />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">{video.course_title}</h2>
            <p className="text-gray-700">Author - {video.course_author}</p>
            <p className="line-clamp-2 text-gray-700">{video.course_description}</p>
          </div>
        </div>
      ))}
    </div>
      )}
    </div>
  );
};

export default DashboardGrid;
