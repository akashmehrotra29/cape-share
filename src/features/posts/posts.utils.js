export const validateData = (formValues) => formValues.content !== "";

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
    formData.append("upload_preset", "p3bqcvv5");
    let response = await fetch(
      "https://api.cloudinary.com/v1_1/akash29/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    response = await response.json();
    imageUrlArray.push(response.url);
  }
  return imageUrlArray;
};

export const uploadVideo = async (videos) => {
  let videoUrlArray = [];
  for (let i = 0; i < videos.length; i++) {
    const formData = new FormData();
    formData.append("file", videos[i]);
    formData.append("upload_preset", "p3bqcvv5");
    let response = await fetch(
      "https://api.cloudinary.com/v1_1/akash29/video/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    response = await response.json();
    videoUrlArray.push(response.url);
  }
  return videoUrlArray;
};

export const likedPost = (post, loggedInUser) => {
  return post.likes.findIndex((user) => user._id === loggedInUser._id) !== -1;
};
