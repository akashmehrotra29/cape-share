import { NewPost } from "../../features/posts/NewPost";
import { FollowSuggestions } from "./FollowSuggestions";
import { PostsFeed } from "../../features/posts/PostsFeed";

import { Container } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";

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
    // <>
    //   <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(3, 1fr)">
    //     <Container maxW="container.lg" centerContent>
    //       <GridItem rowSpan={1} colSpan={1}>
    //         side nav
    //       </GridItem>
    //       <GridItem rowSpan={1} colSpan={1}>
    //         <NewPost />

    //         <PostsFeed />
    //       </GridItem>
    //       <GridItem rowSpan={1} colSpan={1}>
    //         <FollowSuggestions />
    //       </GridItem>
    //     </Container>
    //   </Grid>
    // </>

    <Container maxW="container.md" centerContent>
      <NewPost />
      <FollowSuggestions />
      <PostsFeed />
    </Container>
  );
};
