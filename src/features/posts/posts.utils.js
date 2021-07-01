import axios from "axios";

export const validateData = (formValues) =>
  formValues.content !== "" && formValues.media.length !== 0;

export const validateFileSize = (files) => {
  for (let i = 0; i < files.length; i++) {
    if (files[i].size / 1024 / 1024 > 5) {
      return false;
    }
  }
  return true;
};

export const uploadImage = async (images) => {
  let imageUrlArray = [];
  for (let i = 0; i < images.length; i++) {
    const formData = new FormData();
    formData.append("file", images[i]);
    formData.append("upload_preset", "image upload");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/akash29/image/upload",
      formData
    );
    // console.log({ response });
    imageUrlArray.push(response.url);
  }
  return imageUrlArray;
};

export const uploadVideo = async (videos) => {
  let videoUrlArray = [];
  for (let i = 0; i < videos.length; i++) {
    const formData = new FormData();
    formData.append("file", videos[i]);
    formData.append("upload_preset", "video upload");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/akash29/video/upload",
      formData
    );
    console.log({ response });
    videoUrlArray.push(response.url);
  }
  return videoUrlArray;
};
