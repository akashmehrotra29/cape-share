import { useToast } from "@chakra-ui/react";
import { Container, Heading, Center, VStack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { ProfileInfo } from "./ProfileInfo";
import { unwrapResult } from "@reduxjs/toolkit";
import { getProfilePosts, getUser } from "./profileSlice";
import { resetProfile } from "./profileSlice";
import { Post } from "../posts/Post";

export const Profile = () => {
  const [status, setStatus] = useState("");
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  const {
    state: { userId },
  } = useLocation();
  const { posts, user, following } = useSelector((state) => state.profile);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      (async () => {
        try {
          setStatus("loading");
          unwrapResult(await dispatch(getProfilePosts(userId)));
          unwrapResult(await dispatch(getUser(userId)));
          setStatus("idle");
        } catch (error) {
          console.log(error);
          toast({
            position: "bottom-right",
            title: error.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      })();
    }
    return () => dispatch(resetProfile());
  }, [loggedInUser]);

  return (
    <>
      {status === "loading" && (
        <Container maxW="container.sm" centerContent mt={4}>
          <Spinner />
        </Container>
      )}

      {status === "idle" && (
        <Container maxW="container.sm">
          <ProfileInfo user={user} following={following} />
          <Heading as="h3" size="lg" mt={10}>
            Posts
          </Heading>
          {posts.length !== 0 ? (
            <VStack width="full" spacing={8} pt={8} pb={8}>
              {posts.map((post) => {
                return <Post key={post._id} post={post} from="PROFILE" />;
              })}
            </VStack>
          ) : (
            <Center fontSize={25} mt={20} onClick={() => navigate("/")}>
              Create a Post
            </Center>
          )}
        </Container>
      )}
    </>
  );
};
