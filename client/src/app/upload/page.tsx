"use client";
import React, { useState, ChangeEvent} from "react";
import axios from "axios";
import { useSession } from 'next-auth/react';
import { toast } from "sonner";


interface FileUploadResponse {
  uploadId: string;
}

const UploadForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const user = useSession().data; // This is the user object from the session
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!title || !author) {
      alert("Title and Author are required fields.");
      return;
    }

    if (!selectedFile) {
      // Add toast notification
      alert("No file selected.");
      return;
    }

    try {
      toast.loading("Uploading file...", {position: "top-right"});
      ////////////////////////////////////////////////////
      const formData = new FormData();
      formData.append("filename", selectedFile.name);
      const initializeRes = await axios.post<FileUploadResponse>(
        "http://localhost:8080/api/upload/initialize",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { uploadId }: { uploadId: string } = initializeRes.data;
      console.log("Upload id is ", uploadId);

      ////////////////////////////////////////////////////

      const chunkSize = 5 * 1024 * 1024; // 5 MB chunks
      const totalChunks = Math.ceil(selectedFile.size / chunkSize);

      let start = 0;
      const uploadPromises: Promise<any>[] = [];

      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const chunk = selectedFile.slice(start, start + chunkSize);
        start += chunkSize;
        const chunkFormData = new FormData();
        chunkFormData.append("filename", selectedFile.name);
        chunkFormData.append("chunk", chunk);
        chunkFormData.append("totalChunks", totalChunks.toString());
        chunkFormData.append("chunkIndex", chunkIndex.toString());
        chunkFormData.append("uploadId", uploadId);

        const uploadPromise = axios.post(
          "http://localhost:8080/api/upload",
          chunkFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        uploadPromises.push(uploadPromise);
      }

      await Promise.all(uploadPromises);

      ////////////////////////////////////////////////////

      const userId = user?.user?.user_id?.toString();

      if (!userId) {
        throw new Error("User ID is not available in the session.");
      }
      const completeRes = await axios.post(
        "http://localhost:8080/api/upload/complete",
        {
          filename: selectedFile.name,
          totalChunks: totalChunks,
          uploadId: uploadId,
          title: title,
          description: description,
          author: author,
          user_id: userId,
        }
      );
      if(completeRes.status === 200){
        toast.success("File uploaded successfully",{position: "top-right", duration: 5000});
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-lg p-10">
      <form encType="multipart/form-data">
        <div className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            required
            className="px-3 py-2 w-full border rounded-md text-black focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            className="px-3 py-2 w-full border rounded-md text-black focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={author}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAuthor(e.target.value)
            }
            required
            className="px-3 py-2 w-full border rounded-md text-black font-black focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className="px-3 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={handleUpload}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
