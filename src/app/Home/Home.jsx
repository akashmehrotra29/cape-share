import { NewPost } from "../../features/posts/NewPost";
import { FollowSuggestions } from "./FollowSuggestions";
import { PostsFeed } from "../../features/posts/PostsFeed";

import { Container } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/react";

export const Home = () => {
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  return isMobile ? (
    <>
      <Container maxW="container.lg" centerContent>
        <NewPost />
        <FollowSuggestions />
        <PostsFeed />
      </Container>
    </>
  ) : (
    <Container maxW="container.md" centerContent>
      <NewPost />
      <FollowSuggestions />
      <PostsFeed />
    </Container>
  );
};
