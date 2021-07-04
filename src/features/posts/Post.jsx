import { Box, HStack, Text, Heading, Flex } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { FaRegThumbsUp, FaThumbsUp, FaRegComment } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/modal";
import { Textarea } from "@chakra-ui/textarea";
import { useToast } from "@chakra-ui/toast";

import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { likedPost } from "./posts.utils";
import { PostMedia } from "./PostMedia";
import { CreationTimeStamp } from "./CreationTimeStamp";
import { useState } from "react";
import {
  commentProfilePost,
  likeProfilePost,
  unlikeProfilePost,
} from "../profile/profileSlice";

import { likeFeedPost, unlikeFeedPost, commentFeedPost } from "./postsSlice";

export const Post = ({ post, from }) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const isLikedPost = likedPost(post, loggedInUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const likePost = async () => {
    if (from === "PROFILE") {
      //to rerender both profile and feed post likes
      dispatch(likeProfilePost(post._id));
    } else if (from === "FEED") {
      dispatch(likeFeedPost(post._id));
    }
  };
  const unlikePost = async () => {
    if (from === "PROFILE") {
      dispatch(unlikeProfilePost(post._id));
    } else if (from === "FEED") {
      dispatch(unlikeFeedPost(post._id));
    }
  };
  const createPostComment = async (commentData) => {
    if (from === "PROFILE") {
      dispatch(commentProfilePost(commentData));
    } else if (from === "FEED") {
      dispatch(commentFeedPost(post._id));
    }
  };

  const commentPost = () => {
    if (content === "") {
      toast({
        position: "bottom-right",
        title: `Can't post empty comment`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    createPostComment({
      postId: post._id,
      comment: { content, time: new Date() },
    });
    setContent("");
  };

  return (
    <>
      <Box
        width="full"
        boxShadow="2xl"
        padding={3}
        borderRadius="2xl"
        borderWidth="1px"
      >
        <HStack spacing={3}>
          <Avatar
            cursor="pointer"
            name={post.user.name}
            src={post.user.photo}
            onClick={() =>
              navigate("/profile", {
                state: {
                  userId: post.user._id,
                },
              })
            }
          />
          <Box
            cursor="pointer"
            onClick={() =>
              navigate("/profile", {
                state: {
                  userId: post.user._id,
                },
              })
            }
          >
            <HStack>
              <Text fontWeight="medium" fontSize={20}>
                {post.user.name}
              </Text>
            </HStack>
            <CreationTimeStamp timestamp={post.time} />
          </Box>
        </HStack>
        {post?.media?.length > 0 && <PostMedia media={post.media} />}
        <Text mt={2} mb={3}>
          {post.content}
        </Text>

        <Flex justify="space-between">
          <Text mb={2} ml={1}>
            {post.likes.length} Likes
          </Text>
          <Text mb={2} mr={1}>
            {post.comments.length} Comments
          </Text>
        </Flex>

        <HStack>
          {!isLikedPost ? (
            <Button
              variant="solid"
              colorScheme="gray"
              borderRadius="1.5rem"
              width="full"
              onClick={likePost}
            >
              <FaRegThumbsUp />
            </Button>
          ) : (
            <Button
              width="full"
              borderRadius="1.5rem"
              color="#0EA5E9"
              onClick={unlikePost}
            >
              <FaThumbsUp />
            </Button>
          )}
          <Button
            onClick={onOpen}
            colorScheme="gray"
            borderRadius="1.5rem"
            width="full"
          >
            <FaRegComment />
          </Button>
        </HStack>

        <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="full">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Comments</DrawerHeader>
            <DrawerBody maxHeight="70vh">
              <Textarea
                value={content}
                onChange={(event) => setContent(() => event.target.value)}
                name="content"
                placeholder="Comment"
              />

              <Flex justifyContent="space-between" mt={4}>
                <Button
                  borderRadius="1.5rem"
                  border="2px"
                  borderColor="#0EA5E9"
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button
                  borderRadius="1.5rem"
                  bg="#0EA5E9"
                  color="white"
                  onClick={commentPost}
                >
                  Comment
                </Button>
              </Flex>

              <Box width="full" mt={4}>
                {post?.comments.map((comment) => {
                  return (
                    <Flex mb={8} key={comment._id}>
                      <Avatar
                        size="md"
                        name={comment.user.name}
                        src={comment.user.photo}
                      />
                      <Box
                        ml={4}
                        p={2}
                        width="full"
                        borderRadius="md"
                        boxShadow="md"
                      >
                        <HStack>
                          <Heading as="h4" size="sm">
                            {comment.user.username}{" "}
                          </Heading>
                        </HStack>
                        <CreationTimeStamp timestamp={comment.time} />
                        <Box mt={1}>{comment.content}</Box>
                      </Box>
                    </Flex>
                  );
                })}
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};
