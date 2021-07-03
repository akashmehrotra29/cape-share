import {
  Avatar,
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const Followers = () => {
  const [followers, setFollowers] = useState([]);
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();
  const {
    state: { userId },
  } = useLocation();

  useEffect(() => {
    (async function () {
      setStatus("loading");
      const response = await axios.get(
        `/user-links?userId=${userId}&&type=follower`
      );
      setFollowers(response.data.followers);
      setStatus("idle");
    })();
  }, []);

  return (
    <>
      {status === "loading" && (
        <Center>
          <Spinner />
        </Center>
      )}
      {status === "idle" && (
        <Container maxW="container.sm">
          <Heading as="h3" size="lg" mt={8} align="center">
            Followers
          </Heading>
          <VStack>
            {followers.map((follower) => {
              return (
                <Box key={follower._id} width="full">
                  <Flex
                    width="full"
                    cursor="pointer"
                    mb={2}
                    onClick={() =>
                      navigate("/profile", {
                        state: { userId: follower.user._id },
                      })
                    }
                  >
                    <Avatar
                      size="md"
                      name={follower.user.name}
                      src={follower.user.photo}
                    />
                    <Stack ml={4} direction="column" spacing={1}>
                      <Text fontSize={18} fontWeight="medium">
                        {follower.user.name}
                      </Text>
                      <Text>@{follower.user.username}</Text>
                    </Stack>
                  </Flex>
                  <Divider />
                </Box>
              );
            })}
          </VStack>
        </Container>
      )}
    </>
  );
};
