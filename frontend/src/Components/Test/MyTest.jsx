import React, { useState } from "react";

const MyTest = () => {
  const [logoFile, setLogoFile] = useState(null);
  const [coverPhotoFile, setCoverPhotoFile] = useState(null);

  const handleLogoChange = (event) => {
    setLogoFile(event.target.files[0]);
  };

  const handleCoverPhotoChange = (event) => {
    setCoverPhotoFile(event.target.files[0]);
  };

  const uploadImages = async() => {
    if (!logoFile || !coverPhotoFile) {
      alert("Please select both logo and cover photo");
      return;
    }

    const formData = new FormData();

    formData.append("logo", logoFile);
    formData.append("coverPhoto", coverPhotoFile);

    fetch("http://127.0.0.1:3000/api/v1/companies/profile/media", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzA3NDkyMTI0LCJleHAiOjE3MTUyNjgxMjR9.tRbQQn85OUUeCVmfHfNGAqNoJD7sSHMdDSwwQpFDa0o`,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to upload images");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Images uploaded successfully:", data);
        // Handle the response from the server as needed
      })
      .catch((error) => {
        console.error("Error uploading images:", error.message);
      });
  };

  return (
    <div>
      <input
        type="file"
        id="logo"
        accept="image/*"
        onChange={handleLogoChange}
      />
      <input
        type="file"
        id="coverPhoto"
        accept="image/*"
        onChange={handleCoverPhotoChange}
      />
      <button onClick={uploadImages}>Upload Images</button>
    </div>
  );
};

export default MyTest;
