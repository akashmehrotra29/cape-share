import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { FaImages, FaVideo } from "react-icons/fa";

import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Textarea } from "@chakra-ui/textarea";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";

import {
  uploadImage,
  uploadVideo,
  validateData,
  validateFileSize,
} from "./posts.utils";
import { addNewPost } from "./postsSlice";

export const NewPost = () => {
  const user = useSelector((state) => state.user);
  const [formValues, setFormValues] = useState({
    content: "",
    time: null,
    media: [],
  });
  const dispatch = useDispatch();
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [status, setStatus] = useState("idle");
  const toast = useToast();

  const handleFormInputChange = (event) => {
    setFormValues((formValues) => {
      formValues[event.target.name] = event.target.value;
      return { ...formValues };
    });
  };

  const handlePost = async () => {
    if (!validateData(formValues)) {
      toast({
        position: "bottom-right",
        title: "Empty Input",
        description: "Post can not be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (!validateFileSize(images) || !validateFileSize(videos)) {
      toast({
        position: "bottom-right",
        title: "Too Large file size",
        description: "Media file size should not exceed 5mb",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setStatus("loading");

    let imageUrlArray = await uploadImage(images);
    let videoUrlArray = await uploadVideo(videos);
    imageUrlArray = imageUrlArray.map((image) => ({
      mediaType: "IMAGE",
      image,
    }));
    videoUrlArray = videoUrlArray.map((video) => ({
      mediaType: "VIDEO",
      video,
    }));
    formValues.time = new Date();

    dispatch(
      addNewPost({ ...formValues, media: [...imageUrlArray, ...videoUrlArray] })
    );

    setStatus("idle");
    setFormValues({ content: "", time: null, media: [] });
    setImages([]);
    setVideos([]);
  };

  return (
    <>
      <Box width="full">
        <Flex>
          <Avatar
            size="md"
            name={user?.loggedInUser?.name}
            src={user?.loggedInUser?.photo}
          />
          <Textarea
            ml={4}
            name="content"
            value={formValues.content}
            onChange={handleFormInputChange}
            placeholder="type in to create post"
          />
        </Flex>

        <Flex justifyContent="flex-end" mt={4}>
          <Button
            ml={4}
            borderRadius="1.5rem"
            bg="#0EA5E9"
            color="white"
            onClick={() => imageRef.current.click()} // to avoid rerender on click
          >
            <FaImages />
            <Text ml={2}>Photo</Text>
          </Button>
          <Button
            ml={4}
            borderRadius="1.5rem"
            bg="#0EA5E9"
            color="white"
            // borderWidth="3px"
            // borderColor="#0EA5E9"
            onClick={() => videoRef.current.click()}
          >
            <FaVideo />
            <Text ml={2}>Video</Text>
          </Button>
          <Button
            ml={4}
            borderRadius="1.5rem"
            bg="#0EA5E9"
            color="white"
            isDisabled={status === "loading"}
            onClick={handlePost}
          >
            {status === "idle" && <Text>Post</Text>}
            {status === "loading" && <Text>Posting...</Text>}
          </Button>
        </Flex>

        <input
          ref={imageRef}
          type="file"
          id="file"
          name="images"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(event) => setImages(event.target.files)}
        />

        <input
          ref={videoRef}
          type="file"
          id="file"
          name="videos"
          accept="video/*"
          multiple
          style={{ display: "none" }}
          onChange={(event) => setVideos(event.target.files)}
        />
      </Box>
    </>
  );
};
