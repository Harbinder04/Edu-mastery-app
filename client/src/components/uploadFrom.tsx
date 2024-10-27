import React, { useState } from "react";
import axios from "axios";

function uploadFrom() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      handleFileUpload(selectedFile);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = async (selectedFsile: File | any) => {
    try {
      if (!selectedFile) {
        return;
      }

      const chunkSize = 100 * 1024 * 1024;
      const totalChunks = Math.ceil(selectedFile.size / chunkSize);
      console.log(selectedFile.size);
      console.log(totalChunks);
      console.log(selectedFile);

      let start = 0;

      for (let i = 0; i < totalChunks; i++) {
        const chunk = selectedFile.slice(start, start + chunkSize);
        start += chunkSize;

        const formData = new FormData();
        formData.append("filename", selectedFile.name);
        formData.append("chunk", chunk);
        formData.append("totalChunks", totalChunks.toString());
        formData.append("currentChunk", (i + 1).toString());

        console.log("Uploading chunk: ", i + 1, " of ", totalChunks);

        const response = await axios.post(
          "http://localhost:8080/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={handleFileChange}
          />
          <button type="submit" className='text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg text-center m-2 p-2 ring-2 ring-blue-500'>Upload</button>
        </form>
  </>;
}

export default uploadFrom;
