import { VStack, Center, Box, HStack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";

import { Post } from "./Post";
import { getUserFeed } from "./postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const PostsFeed = () => {
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.loggedInUser !== null) {
      dispatch(getUserFeed());
    }
  }, [user.loggedInUser]);

  return (
    <>
      <VStack width="full" spacing={8} mt={8}>
        {posts.posts.map((post) => {
          return <Post post={post} key={post._id} from="FEED" />;
        })}
      </VStack>

      <Center pb={4} mt={4}>
        {posts.hasMore && posts.status !== "loading" && (
          <Button
            borderRadius="1.5rem"
            border="1px"
            borderColor="#0EA5E9"
            onClick={() => dispatch(getUserFeed())}
          >
            Load More
          </Button>
        )}
        {!posts.hasMore && (
          <HStack mt={4}>
            <Text>You are all caught up.</Text>
          </HStack>
        )}
      </Center>

      {(posts.status === "loading" || user.status === "loading") && (
        <>
          <VStack width="full" spacing={8}>
            <Box width="full">
              <Skeleton height="200px" mt={4} />
              <SkeletonText mt="4" noOfLines={2} spacing="4" />
            </Box>
            <Box width="full">
              <Skeleton height="200px" mt={4} />
              <SkeletonText mt="4" noOfLines={2} spacing="4" />
            </Box>
          </VStack>
        </>
      )}
    </>
  );
};
